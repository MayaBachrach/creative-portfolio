(() => {
 const strings={
 he:{gallery:"גלריה",contact:"יצירת קשר",appearance:"תצוגה",subtitle:"אני אוהבת פרויקטים מהממים מדוייקים ומרגשים (וצללית כחולה)",title:"DJ והפקה מוזיקלית",description:"מיקס, רמיקסים והפקה מוזיקלית.",star:"DJ והפקת סאונד",footer:"בואו ניצור משהו יפה ביחד (:"},
 en:{gallery:"Gallery",contact:"Contact",appearance:"Appearance / sound",subtitle:"I love gorgeous, precise, moving projects (and blue eyeshadow).",title:"DJ AND MUSIC PRODUCTION",description:"Mixes, remixes, and music production.",star:"DJ AND SOUND PRODUCTION",footer:"LET'S MAKE SOMETHING BEAUTIFUL TOGETHER :)"}
 };
 const original={title:projects[0].title,description:projects[0].description};
 function apply(language){
  const s=strings[language];document.documentElement.lang=language;document.documentElement.dir=language==="he"?"rtl":"ltr";
  try{localStorage.setItem("maya-language",language);}catch{}
  const url=new URL(location.href);url.searchParams.set("lang",language);history.replaceState(null,"",url);
  document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=s[e.dataset.i18n]);
  document.querySelector(".hero-intro > p").textContent=s.subtitle;
  document.title=language==="he"?"מאיה בכרך | תיק עבודות":"Maya Bachrach | Portfolio";
  projects[0].title=s.title;projects[0].description=s.description;
  document.querySelectorAll(".star-label").forEach(e=>{e.dataset.letteringDirection=language==="en"?"ltr":"rtl";window.renderPortfolioLettering(e,s.star);});
  const footer=document.querySelector("#contact-lettering");footer.dataset.letteringDirection=language==="en"?"ltr":"rtl";window.renderPortfolioLettering(footer,matchMedia("(max-width:48rem)").matches?(language==="en"?"LET US CREATE\nSOMETHING BEAUTIFUL :)":"בואו ניצור\nמשהו יפה ביחד (:"):s.footer);
  document.querySelector("#close-project").setAttribute("aria-label",language==="en"?"Close project":"סגירת הפרויקט");
  document.querySelector("#settings-toggle").setAttribute("aria-label",language==="en"?"Settings":"הגדרות");
  document.querySelectorAll(".social-icon").forEach((e,i)=>e.setAttribute("aria-label",(language==="en"?["Instagram","WhatsApp","Email"]:["אינסטגרם","וואטסאפ","מייל"])[i]));
  document.querySelectorAll("[data-lang]").forEach(e=>e.setAttribute("aria-pressed",String(e.dataset.lang===language)));
  if(document.querySelector("dialog").open){const t=document.querySelector("#project-title");t.dataset.letteringDirection=language==="en"?"ltr":"rtl";window.renderPortfolioLettering(t,s.title);document.querySelector("#project-description").textContent=s.description;}
  if(language==="he"){lastGreetingWidth=-1;fitGreeting();}
 }
 document.querySelectorAll("[data-en-word]").forEach(e=>{e.dataset.letteringDirection="ltr";window.renderPortfolioLettering(e,e.dataset.enWord);});
 const toggle=document.querySelector("#settings-toggle"),menu=document.querySelector("#settings-menu");
 function close(){menu.hidden=true;toggle.setAttribute("aria-expanded","false");}
 toggle.addEventListener("click",()=>{menu.hidden=!menu.hidden;toggle.setAttribute("aria-expanded",String(!menu.hidden));});
 document.addEventListener("click",e=>{if(!e.target.closest(".top-nav"))close();});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
 document.querySelectorAll("[data-lang]").forEach(e=>e.addEventListener("click",()=>apply(e.dataset.lang)));
 let language="he";try{language=new URLSearchParams(location.search).get("lang")||localStorage.getItem("maya-language")||"he";}catch{}
 apply(language==="en"?"en":"he");
})();

(() => {
 const frames=[...document.querySelectorAll(".skating-frame")];
 Promise.all(frames.map(image=>image.decode())).then(()=>{
  if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;
  let step=0;const cycle=frames.map((_,i)=>i);
  const footer=document.querySelector(".skating-footer");
  new IntersectionObserver(entries=>footer.classList.toggle("is-visible",entries[0].isIntersecting),{threshold:.05}).observe(footer);
  const timing=[90,80,110,130,90,80,90,100,130,100,90,80];
  function next(){if(!document.hidden&&footer.classList.contains("is-visible")){step=(step+1)%cycle.length;frames.forEach((image,i)=>image.style.visibility=i===cycle[step]?"visible":"hidden");}setTimeout(next,timing[step]||100);}
  setTimeout(next,100);
 }).catch(()=>{});
})();
