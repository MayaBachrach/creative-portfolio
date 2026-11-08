// Circular difference cursor; only active for precise pointing devices.
window.updatePortfolioCursors = function () {};
document.addEventListener("DOMContentLoaded", () => {
 if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
 const dot=document.createElement("div");dot.className="difference-cursor";dot.setAttribute("aria-hidden","true");document.body.append(dot);
 const dialog=document.querySelector("#project-page");
 new MutationObserver(()=>{(dialog.open?dialog:document.body).append(dot);}).observe(dialog,{attributes:true,attributeFilter:["open"]});
 document.addEventListener("pointermove",e=>{
 dot.style.left=e.clientX+"px";dot.style.top=e.clientY+"px";dot.style.opacity="1";
 dot.classList.toggle("is-hovering",!!e.target.closest("a,button,[role=switch],.custom-scroll"));
 document.documentElement.classList.add("circle-cursor-active");
 },{passive:true});
 document.addEventListener("pointerout",e=>{if(!e.relatedTarget)dot.style.opacity="0";});
});
