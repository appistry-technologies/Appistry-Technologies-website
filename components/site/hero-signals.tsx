"use client";
import {useEffect,useRef} from "react";
import {useReducedMotion} from "framer-motion";

/** Animated data packets; runs only while the hero is visible, capped at 30fps. */
export function HeroSignals({paused}:{paused:boolean}){
  const ref=useRef<HTMLCanvasElement>(null);
  const reduced=useReducedMotion();
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");if(!ctx)return;
    let width=0,height=0,frame=0,last=0,visible=true;
    const anchors=[[.48,.21],[.56,.12],[.65,.25],[.75,.1],[.89,.18],[.96,.34],[.88,.49],[.96,.68],[.83,.78],[.71,.69],[.59,.83],[.49,.64],[.58,.48],[.72,.43]];
    function draw(time:number){
      ctx!.clearRect(0,0,width,height);
      const seconds=paused||reduced?0:time/1000;
      const nodes=anchors.map(([x,y],i)=>({x:x*width+Math.sin(seconds*.6+i)*9,y:y*height+Math.cos(seconds*.5+i)*12}));
      nodes.forEach((node,i)=>{
        const next=nodes[(i+1)%nodes.length];
        ctx!.beginPath();ctx!.moveTo(node.x,node.y);ctx!.lineTo(next.x,next.y);ctx!.strokeStyle="rgba(0,215,255,.22)";ctx!.lineWidth=1;ctx!.stroke();
        const t=(seconds*.2+i*.13)%1;
        const px=node.x+(next.x-node.x)*t,py=node.y+(next.y-node.y)*t;
        ctx!.shadowColor="#00dbff";ctx!.shadowBlur=14;ctx!.fillStyle="#a1ffff";ctx!.beginPath();ctx!.arc(px,py,3.1,0,Math.PI*2);ctx!.fill();
        ctx!.shadowBlur=7;ctx!.fillStyle="#00d9ff";ctx!.beginPath();ctx!.arc(node.x,node.y,2.2,0,Math.PI*2);ctx!.fill();ctx!.shadowBlur=0;
      });
    }
    function tick(time:number){if(!visible||paused||reduced)return;if(time-last>33){draw(time);last=time}frame=requestAnimationFrame(tick)}
    const resize=new ResizeObserver(entries=>{
      const box=entries[0].contentRect;width=box.width;height=box.height;
      const dpr=Math.min(window.devicePixelRatio||1,1.5);canvas!.width=Math.round(width*dpr);canvas!.height=Math.round(height*dpr);ctx!.setTransform(dpr,0,0,dpr,0,0);draw(performance.now());
    });resize.observe(canvas);
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;cancelAnimationFrame(frame);if(visible&&!paused&&!reduced)frame=requestAnimationFrame(tick)});observer.observe(canvas);
    return()=>{cancelAnimationFrame(frame);resize.disconnect();observer.disconnect()};
  },[paused,reduced]);
  return <canvas ref={ref} className="hero-signals" aria-hidden="true"/>;
}
