// Use calendar months and the lab's time zone; month-only dates mean day 1.
export function isRecentNews(date, today = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())) {
  if(!/^\d{4}-\d{2}(?:-\d{2})?$/.test(date)) return false;
  const [year,month,day]=today.split('-').map(Number);
  const cutoff=new Date(Date.UTC(year,month-1-6,1));
  const lastDay=new Date(Date.UTC(cutoff.getUTCFullYear(),cutoff.getUTCMonth()+1,0)).getUTCDate();
  cutoff.setUTCDate(Math.min(day,lastDay));
  const item=date.length===7?date+'-01':date;
  return item>=cutoff.toISOString().slice(0,10)&&item<=today;
}

if(typeof document!=='undefined') {
  const section=document.querySelector('[data-recent-news]');
  if(section) {
    let visible=0;
    for(const item of section.querySelectorAll('[data-news-date]')) {
      item.hidden=!isRecentNews(item.dataset.newsDate);
      if(!item.hidden) visible++;
    }
    const empty=section.querySelector('[data-news-empty]');
    if(empty) empty.hidden=visible!==0;
  }
}
