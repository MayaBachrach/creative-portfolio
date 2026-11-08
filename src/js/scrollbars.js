(() => {
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
let pagePaint, pageFrame;
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
function clearFlowerLanding(ground) {
 const bounds=ground.getBoundingClientRect();
 if(bounds.height<=0)return;
 const width=bounds.width/(bounds.height/90);
 ground.setAttribute('viewBox','0 0 '+width+' 90');
 const line=ground.querySelector('.ground-line');
 if(line)line.setAttribute('d','M0 57 Q'+(width/4)+' 53 '+(width/2)+' 57 T'+width+' 57');
 if(!ground.grassTile){
  const original=ground.querySelector('path.grass-blades');
  if(original){
   const ns='http://www.w3.org/2000/svg',defs=document.createElementNS(ns,'defs'),pattern=document.createElementNS(ns,'pattern'),tile=document.createElementNS(ns,'rect');
   pattern.id='ground-grass-repeat';pattern.setAttribute('patternUnits','userSpaceOnUse');pattern.setAttribute('width','1440');pattern.setAttribute('height','90');
   const art=original.cloneNode(true);art.removeAttribute('class');pattern.append(art);defs.append(pattern);ground.prepend(defs);
   tile.setAttribute('class','grass-blades');tile.setAttribute('height','90');tile.setAttribute('fill','url(#ground-grass-repeat)');
   original.replaceWith(tile);ground.grassTile=tile;
  }
 }
 if(ground.grassTile)ground.grassTile.setAttribute('width',width);
 const blades=ground.querySelector('.grass-blades'),matrix=ground.getScreenCTM();
 if(!blades||!matrix)return;
 if(!ground.landingClip){
  const ns='http://www.w3.org/2000/svg',defs=document.createElementNS(ns,'defs'),clip=document.createElementNS(ns,'clipPath'),rect=document.createElementNS(ns,'rect');
  clip.id='flower-landing-clear';clip.setAttribute('clipPathUnits','userSpaceOnUse');
  clip.append(rect);defs.append(clip);ground.prepend(defs);ground.landingClip=rect;
  blades.setAttribute('clip-path','url(#flower-landing-clear)');
 }
 const point=ground.createSVGPoint();point.x=innerWidth-68;point.y=0;
 const local=point.matrixTransform(matrix.inverse());
 ground.landingClip.setAttribute('width',Math.max(0,Math.min(ground.viewBox.baseVal.width,local.x)));
 ground.landingClip.setAttribute('height',ground.viewBox.baseVal.height);
}
function positionPageTrack(track) {
 const letter=document.querySelector('.canva-he');
 const title=letter || document.querySelector('#intro-title');
 if(title) track.style.top=Math.max(12,title.getBoundingClientRect().top+scrollY)+'px';
 const ground=document.querySelector('.footer-ground');
 if(ground){
  clearFlowerLanding(ground);
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
 const topGroup=document.createElementNS(ns,'g');topGroup.setAttribute('filter','url(#scroll-heart-liquid)');svg.append(topGroup);
 const filter=document.createElementNS(ns,'filter');filter.id='scroll-heart-liquid';filter.setAttribute('x','-60%');filter.setAttribute('y','-60%');filter.setAttribute('width','220%');filter.setAttribute('height','220%');
 const blur=document.createElementNS(ns,'feGaussianBlur');blur.setAttribute('stdDeviation','0');blur.setAttribute('result','soft');
 const contrast=document.createElementNS(ns,'feColorMatrix');contrast.setAttribute('in','soft');contrast.setAttribute('mode','matrix');contrast.setAttribute('values','1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7');filter.append(blur,contrast);defs.append(filter);
 const heart=document.createElementNS(ns,'path');heart.setAttribute('fill','currentColor');heart.classList.add('scroll-top-heart');
 const anchor=document.createElementNS(ns,'path');anchor.classList.add('scroll-heart-anchor');anchor.setAttribute('fill','currentColor');
 const bridge=document.createElementNS(ns,'path');bridge.classList.add('scroll-heart-bridge');bridge.setAttribute('stroke','currentColor');bridge.setAttribute('stroke-linecap','round');
 topGroup.append(anchor,bridge,heart);
 document.body.append(svg);
 return {svg,solid,left,right,bud,center,stem,pool,heart,anchor,bridge,blur,value:0,goal:0,topValue:0,topGoal:0};
}
function paintPageScrollbar(track,thumb,range){
 pagePaint ||= createPagePaint();
 const p=pagePaint,box=thumb.getBoundingClientRect(),tr=track.getBoundingClientRect();
 p.thumb=thumb;p.track=track;p.svg.style.display=range>1?"block":"none";
 p.icon=document.querySelector('.contact-heart-icon');
 p.topGoal=range>0&&p.icon?clamp(1-document.scrollingElement.scrollTop/Math.min(90,range*.12)):0;
 p.box=box;p.floor=tr.bottom;p.goal=range>0?clamp((document.scrollingElement.scrollTop/range-.86)/.14):0;
 if(!pageFrame) pageFrame=requestAnimationFrame(drawPageScrollbar);
}
function drawPageScrollbar(now){
 pageFrame=null;const p=pagePaint;if(!p?.box)return;
 p.value=reduced.matches?p.goal:p.value+(p.goal-p.value)*.16;
 if(Math.abs(p.value-p.goal)<.001)p.value=p.goal;
 const dt=Math.min(50,now-(p.lastFrame??now-16));p.lastFrame=now;
 p.topValue=reduced.matches?p.topGoal:p.topValue+(p.topGoal-p.topValue)*(1-Math.exp(-dt/70));
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
 p.solid.style.opacity=top>0?0:1-clamp(m/.12);
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
 paintTopHeart(p,b,top);
 if(p.value!==p.goal||p.topValue!==p.topGoal)pageFrame=requestAnimationFrame(drawPageScrollbar);
}
function paintTopHeart(p,b,t){
 if(!p.icon)return;
 const r=p.icon.getBoundingClientRect(),cx=b.left+b.width/2,cy=b.top+b.height/2,w=b.width/2,h=b.height/2,k=.55228475;
 const top=cy-h,bottom=cy+h;
 // The first and last outlines match the real capsule and icon exactly.
 const capsule=[cx,bottom,cx-k*w,bottom,cx-w,bottom-(1-k)*w,cx-w,bottom-w,cx-w,cy,cx-w,top+w,cx-w,top+w,cx-w,top+(1-k)*w,cx-k*w,top,cx,top,cx+k*w,top,cx+w,top+(1-k)*w,cx+w,top+w,cx+w,cy,cx+w,bottom-w,cx+w,bottom-w,cx+w,bottom-(1-k)*w,cx+k*w,bottom,cx,bottom];
 const shape=[16,28,14,26,6,21,3.5,14,1,8,4,3,9,3,12,3,14,5,16,8,18,5,20,3,23,3,28,3,31,8,28.5,14,26,21,18,26,16,28];
 const smooth=v=>v*v*(3-2*v),position=smooth(clamp(t/.9)),form=smooth(clamp((t-.12)/.88));
 const tx=r.left+r.width/2,ty=r.top+r.height/2;
 const mx=cx+(tx-cx)*position,my=cy+(ty-cy)*position;
 const points=capsule.map((v,i)=>{
  const origin=i%2?cy:cx,target=(shape[i]-16)*r.width/32;
  const local=v-origin;
  return (i%2?my:mx)+local+(target-local)*form;
 });
 const path=points=>{let d='M'+points.slice(0,2).join(' ');for(let i=2;i<points.length;i+=6)d+='C'+points.slice(i,i+6).join(' ');return d+'Z';};
 p.heart.setAttribute('d',path(points));p.heart.style.display=t>0?'block':'none';
 p.anchor.setAttribute('d',path(shape.map((v,i)=>(i%2?r.top:r.left)+v*r.width/32)));
 // The target stays solid; a short rounded bridge joins the approaching shape.
 const distance=Math.hypot(tx-mx,ty-my),join=clamp((38-distance)/30)*smooth(clamp((t-.4)/.5));
 p.bridge.setAttribute('d','M'+mx+' '+my+' Q'+tx+' '+my+' '+tx+' '+ty);
 p.bridge.setAttribute('stroke-width',Math.min(9,r.width*.3)*join);p.bridge.style.opacity=join;
 p.blur.setAttribute('stdDeviation',reduced.matches?0:1.6*Math.sin(Math.PI*t));
 p.icon.style.opacity=0;
 const hit=p.track.heartHit;if(hit){hit.style.display=t>.02&&t<.99?'block':'none';hit.style.left=(mx-22)+'px';hit.style.top=(my-22)+'px';}
}
function attach(host, target, page) {
 const track=document.createElement("div"), thumb=document.createElement("div");
 track.className="custom-scroll"; thumb.className="custom-scroll-thumb";
 track.setAttribute("aria-hidden","true");track.append(thumb);host.append(track);
 let drag;
 if(page){const hit=document.createElement("div");hit.className="scroll-flower-handle";hit.setAttribute("aria-hidden","true");host.append(hit);track.flowerHit=hit;const heartHit=document.createElement("div");heartHit.className="scroll-heart-handle";heartHit.setAttribute("aria-hidden","true");host.append(heartHit);track.heartHit=heartHit;}
 const measure=()=>{if(page) positionPageTrack(track);const height=page?innerHeight:target.clientHeight;const total=target.scrollHeight;const range=total-height;const th=Math.min(track.clientHeight, matchMedia("(max-width:48rem)").matches ? 56 : 88);thumb.style.height=th+"px";thumb.style.top=(range>0?target.scrollTop/range*(track.clientHeight-th):0)+"px";if(page) paintPageScrollbar(track,thumb,range);track.style.visibility=range>1?"visible":"hidden";};
 const down=e=>{
  const height=page?innerHeight:target.clientHeight;
  const range=Math.max(0,target.scrollHeight-height),travel=track.clientHeight-thumb.clientHeight;
  if(range<=0||travel<=0)return;
  const onHandle=thumb.contains(e.target)||track.flowerHit?.contains(e.target)||track.heartHit?.contains(e.target);
  if(!onHandle)target.scrollTop=clamp((e.clientY-track.getBoundingClientRect().top-thumb.clientHeight/2)/travel)*range;
  drag={y:e.clientY,scroll:target.scrollTop,range,travel};
  e.currentTarget.setPointerCapture(e.pointerId);e.preventDefault();measure();
 };
 const move=e=>{if(drag)target.scrollTop=drag.scroll+(e.clientY-drag.y)*drag.range/drag.travel;};
 const up=()=>{drag=null;};
 for(const surface of [track,track.flowerHit,track.heartHit].filter(Boolean)){
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