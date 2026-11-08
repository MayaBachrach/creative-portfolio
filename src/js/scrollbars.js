(() => {
function attach(host, target, page) {
 const track=document.createElement("div"), thumb=document.createElement("div");
 track.className="custom-scroll"; thumb.className="custom-scroll-thumb";
 track.setAttribute("aria-hidden","true");track.append(thumb);host.append(track);
 let drag;
 const measure=()=>{const height=page?innerHeight:target.clientHeight;const total=target.scrollHeight;const range=total-height;const th=Math.max(36,track.clientHeight*height/total);thumb.style.height=th+"px";thumb.style.top=(range>0?target.scrollTop/range*(track.clientHeight-th):0)+"px";track.style.visibility=range>1?"visible":"hidden";};
 track.addEventListener("pointerdown",e=>{drag={y:e.clientY,scroll:target.scrollTop};track.setPointerCapture(e.pointerId);e.preventDefault();});
 track.addEventListener("pointermove",e=>{if(!drag)return;const range=target.scrollHeight-(page?innerHeight:target.clientHeight);target.scrollTop=drag.scroll+(e.clientY-drag.y)*range/(track.clientHeight-thumb.clientHeight);});
 track.addEventListener("pointerup",()=>drag=null);track.addEventListener("pointercancel",()=>drag=null);
 (page?window:target).addEventListener("scroll",measure,{passive:true});window.addEventListener("resize",measure);
 new ResizeObserver(measure).observe(target);new MutationObserver(measure).observe(target,{childList:true,subtree:true});
 measure();setInterval(measure,500);
}
attach(document.body,document.scrollingElement,true);
attach(document.querySelector("#project-page"),document.querySelector(".project-page-scroll"),false);
})();