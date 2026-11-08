(() => {
 const button=document.querySelector('#pencil-toggle');
 if(!button)return;
 const canvas=document.createElement('canvas');canvas.className='background-drawing';canvas.setAttribute('aria-hidden','true');
 document.body.prepend(canvas);document.body.classList.add('has-drawing-layer');
 const ctx=canvas.getContext('2d');const strokes=[];let enabled=false,active=null,frame=0;
 const palette=()=>Array.from({length:5},(_,i)=>getComputedStyle(document.documentElement).getPropertyValue('--accent-'+(i+1)).trim());
 function render(){
  frame=0;const ratio=Math.min(devicePixelRatio||1,2);
  if(canvas.width!==Math.round(innerWidth*ratio)||canvas.height!==Math.round(innerHeight*ratio)){
   canvas.width=Math.round(innerWidth*ratio);canvas.height=Math.round(innerHeight*ratio);
  }
  ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,innerWidth,innerHeight);
  const colors=palette();ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=5;
  for(const stroke of strokes){
   if(!stroke.points.length)continue;ctx.strokeStyle=colors[stroke.color];ctx.fillStyle=colors[stroke.color];
   const first=stroke.points[0];
   if(stroke.points.length===1){ctx.beginPath();ctx.arc(first.x,first.y-scrollY,2.5,0,Math.PI*2);ctx.fill();continue;}
   ctx.beginPath();ctx.moveTo(first.x,first.y-scrollY);
   for(let i=1;i<stroke.points.length;i++)ctx.lineTo(stroke.points[i].x,stroke.points[i].y-scrollY);
   ctx.stroke();
  }
 }
 const repaint=()=>{if(!frame)frame=requestAnimationFrame(render);};
 button.addEventListener('click',()=>{
  enabled=!enabled;button.setAttribute('aria-pressed',String(enabled));
  button.setAttribute('aria-label',enabled?'כיבוי ציור ברקע':'הפעלת ציור ברקע');
  document.body.classList.toggle('drawing-enabled',enabled);
 });
 canvas.addEventListener('pointerdown',e=>{
  if(!enabled||e.button!==0)return;
  active={id:e.pointerId,color:strokes.length%5,points:[{x:e.clientX,y:e.clientY+scrollY}]};
  strokes.push(active);if(strokes.length>200)strokes.shift();
  canvas.setPointerCapture(e.pointerId);e.preventDefault();repaint();
 });
 canvas.addEventListener('pointermove',e=>{
  if(!active||e.pointerId!==active.id)return;
  for(const point of e.getCoalescedEvents?.()||[e]){
   const last=active.points.at(-1),next={x:point.clientX,y:point.clientY+scrollY};
   if(Math.hypot(next.x-last.x,next.y-last.y)>1.5&&active.points.length<4000)active.points.push(next);
  }repaint();
 });
 const end=()=>{active=null;};canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);
 window.addEventListener('scroll',repaint,{passive:true});window.addEventListener('resize',repaint);
 new MutationObserver(repaint).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
 render();
})();
