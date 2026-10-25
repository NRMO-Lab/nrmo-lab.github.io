Add-Type -AssemblyName System.Drawing
$bitmap = [System.Drawing.Bitmap]::new('D:\LabWeb\assets\logo.png')
$canvas = [System.Drawing.Graphics]::FromImage($bitmap)
$canvas.SmoothingMode = 'AntiAlias'
$canvas.TextRenderingHint = 'AntiAliasGridFit'
$brush = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#244E43'))
$format = [System.Drawing.StringFormat]::GenericTypographic.Clone()
$format.FormatFlags = $format.FormatFlags -bor [System.Drawing.StringFormatFlags]::MeasureTrailingSpaces
function Draw-CircularText($label, $size, $radius, $bottom, $spacing) {
 $font = [System.Drawing.Font]::new('Arial', [single]$size, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
 $widths = @(); $total=0
 foreach($letter in $label.ToCharArray()) { $width=$canvas.MeasureString([string]$letter,$font,1000,$format).Width+$spacing; $widths+= $width; $total+=$width }
 $distance=-$total/2
 for($i=0;$i -lt $label.Length;$i++) {
  $offset=($distance+$widths[$i]/2)/$radius
  if($bottom){$angle=[Math]::PI/2-$offset;$rotation=$angle*180/[Math]::PI-90} else {$angle=-[Math]::PI/2+$offset;$rotation=$angle*180/[Math]::PI+90}
  $state=$canvas.Save();$canvas.TranslateTransform([single](600+$radius*[Math]::Cos($angle)),[single](600+$radius*[Math]::Sin($angle)));$canvas.RotateTransform([single]$rotation)
  $canvas.DrawString([string]$label[$i],$font,$brush,[single](-($widths[$i]-$spacing)/2),[single](-$size*.83),$format)
  $canvas.Restore($state);$distance+=$widths[$i]
 }
 $font.Dispose()
}
Draw-CircularText 'NATURAL RESOURCE MODELING AND OBSERVATION LAB' 53.33 494.44 $false 2.22
Draw-CircularText 'OKLAHOMA STATE UNIVERSITY' 54.44 544.44 $true 4.44
$canvas.Dispose()
$bitmap.Save('D:\LabWeb\assets\logo-fixed.png',[System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose()
Move-Item -LiteralPath 'D:\LabWeb\assets\logo-fixed.png' -Destination 'D:\LabWeb\assets\logo.png' -Force
