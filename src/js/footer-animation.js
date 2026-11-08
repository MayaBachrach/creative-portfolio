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
