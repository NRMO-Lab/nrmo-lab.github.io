[CmdletBinding()]
param(
    [string]$Message = ('Update lab website - ' + (Get-Date -Format 'yyyy-MM-dd HH:mm'))
)

$ErrorActionPreference = 'Stop'

function Invoke-Checked {
    param([string]$Executable, [string[]]$Arguments)
    & $Executable @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed (exit $LASTEXITCODE): $Executable $($Arguments -join ' ')"
    }
}

function Find-WebsiteTool {
    param([string]$Name, [string]$BundledPath)
    $command = Get-Command $Name -ErrorAction SilentlyContinue
    if ($command) { return $command.Source }
    if (Test-Path -LiteralPath $BundledPath) { return $BundledPath }
    throw "$Name was not found. Install it or run this script from the Codex terminal."
}

$originalLocation = Get-Location
try {
    Set-Location -LiteralPath $PSScriptRoot
    $runtimePath = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies'
    $gitPath = Find-WebsiteTool 'git.exe' (Join-Path $runtimePath 'native\git\cmd\git.exe')
    $nodePath = Find-WebsiteTool 'node.exe' (Join-Path $runtimePath 'node\bin\node.exe')

    Invoke-Checked $gitPath @('rev-parse', '--is-inside-work-tree')
    $branch = & $gitPath branch --show-current
    if ($LASTEXITCODE -ne 0 -or $branch.Trim() -ne 'main') {
        throw 'Switch to the main branch before publishing this website.'
    }
    $remote = & $gitPath remote get-url origin
    if ($LASTEXITCODE -ne 0) { throw 'The origin remote is missing.' }
    if ($remote.Trim() -notmatch '^(https://github\.com/NRMO-Lab/nrmo-lab\.github\.io(?:\.git)?/?|git@github\.com:NRMO-Lab/nrmo-lab\.github\.io(?:\.git)?)$') {
        throw "Unexpected origin remote: $remote. Expected NRMO-Lab/nrmo-lab.github.io."
    }

    Write-Host "`nBuilding website..." -ForegroundColor Cyan
    Invoke-Checked $nodePath @('build.mjs')
    Write-Host "`nChecking website..." -ForegroundColor Cyan
    Invoke-Checked $nodePath @('check.mjs')

    $changes = & $gitPath status --porcelain
    if ($LASTEXITCODE -ne 0) { throw 'Could not read Git status.' }
    if ($changes) {
        Write-Host "`nCommitting local changes..." -ForegroundColor Cyan
        Invoke-Checked $gitPath @('add', '--all')
        Invoke-Checked $gitPath @('commit', '-m', $Message)
    } else {
        Write-Host "`nNo new local changes to commit. Checking for commits to upload."
    }

    Write-Host "`nPushing to GitHub (complete browser sign-in if requested)..." -ForegroundColor Cyan
    Invoke-Checked $gitPath @('push', '-u', 'origin', 'main')
    Write-Host "`nUpload successful. GitHub Pages publishes automatically." -ForegroundColor Green
    Write-Host 'Website: https://nrmo-lab.github.io/'
    Write-Host 'Allow a few minutes, then refresh your browser with Ctrl+F5.'
} catch {
    Write-Host "`nUpdate stopped: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host 'Your local work is preserved. Resolve the error and run this script again.'
    exit 1
} finally {
    Set-Location -LiteralPath $originalLocation
}
