// Soft magnetic cursor: its silhouette flows into nearby scroll thumbs and the theme switch.
window.updatePortfolioCursors = function () {};
document.addEventListener("DOMContentLoaded", () => {
 if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
 const dot=document.createElement("div");dot.className="difference-cursor";dot.setAttribute("aria-hidden","true");document.body.append(dot);
 const dialog=document.querySelector("#project-page");
 new MutationObserver(()=>{(dialog.open?dialog:document.body).append(dot);}).observe(dialog,{attributes:true,attributeFilter:["open"]});
 let current, goal, frame;
 const paint=()=>{
  if(!goal)return;
  if(!current)current={...goal};
  let remaining=0;
  for(const key of ["x","y","w","h"]) {const delta=goal[key]-current[key];current[key]+=delta*.22;remaining+=Math.abs(delta);}
  dot.style.left=current.x+"px";dot.style.top=current.y+"px";dot.style.width=current.w+"px";dot.style.height=current.h+"px";
  frame=remaining>.12?requestAnimationFrame(paint):null;
 };
 document.addEventListener("pointermove",e=>{
  const hover=!!e.target.closest("a,button,[role=switch],.custom-scroll");
  goal={x:e.clientX,y:e.clientY,w:hover?45:25,h:hover?45:25};
  let nearest, distance=18;
  for(const target of document.querySelectorAll(".custom-scroll-thumb,.theme-toggle-track")) {
   const r=target.getBoundingClientRect();
   if(!r.width||!r.height||getComputedStyle(target.parentElement).visibility==="hidden"||r.bottom<0||r.top>innerHeight)continue;
   if(dialog.open&&!dialog.contains(target))continue;
   const dx=Math.max(r.left-e.clientX,0,e.clientX-r.right),dy=Math.max(r.top-e.clientY,0,e.clientY-r.bottom);
   const d=Math.hypot(dx,dy);
   if(d<distance){nearest={r,target};distance=d;}
  }
  if(nearest){
   const {r,target}=nearest;
   const raw=1-distance/18, t=raw*raw*(3-2*raw);
   // Fully lock only when the real pointer is over the real interactive area.
   const inside=distance===0;
   const weight=inside?1:t*.35;
   goal.x+=(r.left+r.width/2-goal.x)*weight;
   goal.y+=(r.top+r.height/2-goal.y)*weight;
   goal.w+=(r.width-goal.w)*weight;
   goal.h+=(r.height-goal.h)*weight;
   dot.style.borderRadius=getComputedStyle(target).borderRadius;
   dot.classList.add("is-merging");
  } else { dot.classList.remove("is-merging"); dot.style.borderRadius="50%"; }
  dot.style.opacity="1";document.documentElement.classList.add("circle-cursor-active");
  if(!frame)frame=requestAnimationFrame(paint);
 },{passive:true});
 document.addEventListener("pointerout",e=>{if(!e.relatedTarget)dot.style.opacity="0";});
});
