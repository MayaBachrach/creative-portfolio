// Local-only load history. No requests, cookies, or third-party analytics.
(() => {
 const key="maya-portfolio-load-history",limit=100;
 function history(){try{const rows=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(rows)?rows:[];}catch{return[];}}
 window.portfolioLoadHistory={read:history,toJSON:()=>JSON.stringify(history(),null,2),record(details){
  const navigation=performance.getEntriesByType("navigation")[0];
  const entries=performance.getEntriesByType("resource");
  const row={at:new Date().toISOString(),navigation:navigation?.type||"navigate",...details,
   domReadyMs:Math.round(navigation?.domContentLoadedEventEnd||0),
   transferredBytes:entries.reduce((sum,item)=>sum+(item.transferSize||0),0)};
  const rows=history();rows.push(row);try{localStorage.setItem(key,JSON.stringify(rows.slice(-limit)));}catch{}
  window.dispatchEvent(new CustomEvent("portfolio-load-measured",{detail:row}));
 }};
})();
