(() => {
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
let pagePaint, pageFrame;
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
function positionPageTrack(track) {
 const letter=document.querySelector('.canva-he');
 const title=letter || document.querySelector('#intro-title');
 if(title) track.style.top=Math.max(12,title.getBoundingClientRect().top+scrollY)+'px';
 const ground=document.querySelector('.footer-ground');
 if(ground){
  const rect=ground.getBoundingClientRect();
  const max=document.scrollingElement.scrollHeight-innerHeight;
  const floorAtEnd=rect.top+scrollY-max+rect.height*57/90;
  track.style.bottom=Math.max(12,innerHeight-floorAtEnd)+'px';
 }
}
function createPagePaint(){
 const ns='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(ns,'svg');
 svg.classList.add('scroll-flower');svg.setAttribute('aria-hidden','true');
 const defs=document.createElementNS(ns,'defs');
 // Only these decorative shapes are filtered; controls keep their normal hit areas.
 defs.innerHTML='<filter id="scroll-liquid" x="-80%" y="-30%" width="260%" height="160%"><feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 22 -9"/></filter>';
 svg.append(defs);
 const group=document.createElementNS(ns,'g');group.setAttribute('filter','url(#scroll-liquid)');svg.append(group);
 const make=(tag,cls)=>{const el=document.createElementNS(ns,tag);el.setAttribute('class',cls);group.append(el);return el;};
 const stem=make('path','scroll-flower-ground'),pool=make('ellipse','scroll-flower-ground');
 const solid=make('rect','scroll-flower-petal');
 const left=make('rect','scroll-flower-petal'),right=make('rect','scroll-flower-petal');
 const bud=make('ellipse','scroll-flower-petal'),center=make('circle','scroll-flower-petal');
 const phone=make('path','scroll-phone-spine');phone.setAttribute('fill','none');phone.setAttribute('stroke','currentColor');phone.setAttribute('stroke-linecap','round');
 const ear1=make('rect','scroll-flower-petal'),ear2=make('rect','scroll-flower-petal');
 document.body.append(svg);
 return {svg,solid,left,right,bud,center,stem,pool,phone,ear1,ear2,value:0,goal:0,topValue:0,topGoal:0};
}
function paintPageScrollbar(track,thumb,range){
 pagePaint ||= createPagePaint();
 const p=pagePaint,box=thumb.getBoundingClientRect(),tr=track.getBoundingClientRect();
 p.thumb=thumb;p.track=track;p.svg.style.display=range>1?"block":"none";
 p.icon=document.querySelector('.contact-phone-icon');
 p.topGoal=range>0&&p.icon?clamp(1-document.scrollingElement.scrollTop/Math.min(90,range*.12)):0;
 p.box=box;p.floor=tr.bottom;p.goal=range>0?clamp((document.scrollingElement.scrollTop/range-.86)/.14):0;
 if(!pageFrame) pageFrame=requestAnimationFrame(drawPageScrollbar);
}
function drawPageScrollbar(){
 pageFrame=null;const p=pagePaint;if(!p?.box)return;
 p.value=reduced.matches?p.goal:p.value+(p.goal-p.value)*.16;
 if(Math.abs(p.value-p.goal)<.001)p.value=p.goal;
 p.topValue=reduced.matches?p.topGoal:p.topValue+(p.topGoal-p.topValue)*.16;
 if(Math.abs(p.topValue-p.topGoal)<.001)p.topValue=p.topGoal;
 const top=p.topValue*p.topValue*(3-2*p.topValue);
 const m=p.value*p.value*(3-2*p.value),b=p.thumb.getBoundingClientRect();
 p.floor=p.track.getBoundingClientRect().bottom;
 const startX=b.left+b.width/2;
 const x=startX+(innerWidth-30-startX)*m;
 const mid=b.top+b.height/2, flowerY=p.floor-22;
 const y=mid+(flowerY-mid)*m;
 const half=b.height/2+2, petalH=half+(25-half)*m;
 const w=b.width+(13-b.width)*m;
 p.svg.setAttribute('viewBox','0 0 '+innerWidth+' '+innerHeight);
 // One uninterrupted capsule outside the bloom transition.
 p.solid.setAttribute('x',b.left);p.solid.setAttribute('y',b.top);
 p.solid.setAttribute('width',b.width);p.solid.setAttribute('height',b.height);
 p.solid.setAttribute('rx',b.width/2);
 p.solid.style.opacity=(1-clamp(m/.12))*(1-clamp(top/.12));
 const splitOpacity=clamp(m/.12);
 for(const el of [p.left,p.right])el.style.opacity=splitOpacity;
 const shape=(el,cx,cy,angle)=>{
  el.setAttribute('x',cx-w/2);el.setAttribute('y',cy-petalH/2);
  el.setAttribute('width',w);el.setAttribute('height',petalH);el.setAttribute('rx',w/2);
  el.setAttribute('transform','rotate('+angle+' '+cx+' '+cy+')');
 };
 shape(p.left,x-11*m,y-(half/2-1)*(1-m)-5*m,-48*m);
 shape(p.right,x+11*m,y+(half/2-1)*(1-m)-5*m,48*m);
 p.bud.setAttribute('cx',x);p.bud.setAttribute('cy',y-12*m);
 p.bud.setAttribute('rx',7*m);p.bud.setAttribute('ry',13*m);
 p.center.setAttribute('cx',x);p.center.setAttribute('cy',y+4*m);p.center.setAttribute('r',7*m);
 p.stem.setAttribute('d','M '+x+' '+p.floor+' Q '+(x-5*m)+' '+(p.floor-10*m)+' '+x+' '+(y+5));
 p.stem.style.opacity=m;p.stem.setAttribute('stroke-width',5*m);
 const hit=p.track.flowerHit;
 if(hit){
  hit.style.display=m>.02?'block':'none';
  hit.style.left=(x-26)+'px';hit.style.top=(y-36)+'px';
 }
 p.pool.setAttribute('cx',x);p.pool.setAttribute('cy',p.floor);p.pool.setAttribute('rx',22*m);p.pool.setAttribute('ry',4*m);
 if(p.icon){
  const r=p.icon.getBoundingClientRect(),scale=r.width/36;
  const lerp=(a,b)=>a+(b-a)*top;
  const fromY=b.top+b.width/2,toY=b.bottom-b.width/2;
  const point=(px,py,start)=>[lerp(startX,r.left+px*scale),lerp(start,r.top+scrollY+py*scale)];
  const a=point(8,5,fromY),c=point(4,18,fromY+(toY-fromY)/3),d=point(14,28,fromY+2*(toY-fromY)/3),z=point(27,22,toY);
  p.phone.setAttribute('d','M '+a.join(' ')+' C '+c.join(' ')+' '+d.join(' ')+' '+z.join(' '));
  p.phone.setAttribute('stroke-width',lerp(b.width,6*scale));p.phone.style.opacity=clamp(top/.12);
  const ear=(el,point,w,h)=>{
   const ew=w*scale*top,eh=h*scale*top;
   el.setAttribute('x',point[0]-ew/2);el.setAttribute('y',point[1]-eh/2);
   el.setAttribute('width',ew);el.setAttribute('height',eh);el.setAttribute('rx',3*scale*top);
   el.setAttribute('transform','rotate('+(-25*top)+' '+point.join(' ')+')');
  };
  ear(p.ear1,a,8,10);ear(p.ear2,z,9,10);
  p.icon.style.opacity=1-top;
  const h=p.track.phoneHit;
  if(h){h.style.display=top>.02&&top<.99?'block':'none';h.style.left=((a[0]+z[0])/2-22)+'px';h.style.top=((a[1]+z[1])/2-22)+'px';}
 }
 if(p.value!==p.goal||p.topValue!==p.topGoal)pageFrame=requestAnimationFrame(drawPageScrollbar);
}
function attach(host, target, page) {
 const track=document.createElement("div"), thumb=document.createElement("div");
 track.className="custom-scroll"; thumb.className="custom-scroll-thumb";
 track.setAttribute("aria-hidden","true");track.append(thumb);host.append(track);
 let drag;
 if(page){const hit=document.createElement("div");hit.className="scroll-flower-handle";hit.setAttribute("aria-hidden","true");host.append(hit);track.flowerHit=hit;const phoneHit=document.createElement("div");phoneHit.className="scroll-phone-handle";phoneHit.setAttribute("aria-hidden","true");host.append(phoneHit);track.phoneHit=phoneHit;}
 const measure=()=>{if(page) positionPageTrack(track);const height=page?innerHeight:target.clientHeight;const total=target.scrollHeight;const range=total-height;const th=Math.min(track.clientHeight, matchMedia("(max-width:48rem)").matches ? 56 : 88);thumb.style.height=th+"px";thumb.style.top=(range>0?target.scrollTop/range*(track.clientHeight-th):0)+"px";if(page) paintPageScrollbar(track,thumb,range);track.style.visibility=range>1?"visible":"hidden";};
 const down=e=>{
  const height=page?innerHeight:target.clientHeight;
  const range=Math.max(0,target.scrollHeight-height),travel=track.clientHeight-thumb.clientHeight;
  if(range<=0||travel<=0)return;
  const onHandle=thumb.contains(e.target)||track.flowerHit?.contains(e.target)||track.phoneHit?.contains(e.target);
  if(!onHandle)target.scrollTop=clamp((e.clientY-track.getBoundingClientRect().top-thumb.clientHeight/2)/travel)*range;
  drag={y:e.clientY,scroll:target.scrollTop,range,travel};
  e.currentTarget.setPointerCapture(e.pointerId);e.preventDefault();measure();
 };
 const move=e=>{if(drag)target.scrollTop=drag.scroll+(e.clientY-drag.y)*drag.range/drag.travel;};
 const up=()=>{drag=null;};
 for(const surface of [track,track.flowerHit,track.phoneHit].filter(Boolean)){
  surface.addEventListener('pointerdown',down);surface.addEventListener('pointermove',move);
  surface.addEventListener('pointerup',up);surface.addEventListener('pointercancel',up);surface.addEventListener('lostpointercapture',up);
 }
 (page?window:target).addEventListener("scroll",measure,{passive:true});window.addEventListener("resize",measure);
 new ResizeObserver(measure).observe(target);new MutationObserver(measure).observe(target,{childList:true,subtree:true});
 new ResizeObserver(measure).observe(page ? document.body : target.firstElementChild || target);
 if(!page) new MutationObserver(measure).observe(host,{attributes:true,attributeFilter:["open"]});
 measure();
}
attach(document.body,document.scrollingElement,true);
attach(document.querySelector("#project-page"),document.querySelector(".project-page-scroll"),false);
})();