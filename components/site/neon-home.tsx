"use client";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {motion,useMotionValue,useSpring,useReducedMotion} from "framer-motion";
import {ArrowRight,Apple,Smartphone,PenTool,Wrench,ClipboardList,Target,Code2,Rocket,CheckCircle2,Pause,Play} from "lucide-react";
import {useContent} from "@/components/admin/content-provider";
import {Phone} from "./phone";
import {Reveal} from "./shell";
import {HeroSignals} from "./hero-signals";
import {ContactForm} from "./contact-form";

const process=[
  {title:"Discover",text:"Understand your app idea, users and requirements.",icon:ClipboardList},
  {title:"Plan",text:"Define the features, priorities and release roadmap.",icon:Target},
  {title:"Design",text:"Shape a clear, thoughtful mobile experience.",icon:PenTool},
  {title:"Develop",text:"Build and test your Flutter app for iOS and Android.",icon:Code2},
  {title:"Launch",text:"Prepare for the stores and plan ongoing support.",icon:Rocket},
];
const services=[
  {title:"Android App Development",text:"Flutter apps designed for the way people use Android.",icon:Smartphone,kind:"android",href:"/services#android-apps"},
  {title:"iOS App Development",text:"Considered iPhone experiences, built with Flutter.",icon:Apple,kind:"ios",href:"/services#ios-apps"},
  {title:"App UI/UX Design",text:"Useful flows and polished screens, from idea to prototype.",icon:PenTool,kind:"design",href:"/services#product-design"},
  {title:"App Maintenance",text:"Fixes, improvements and support for your next release.",icon:Wrench,kind:"support",href:"/services#growth-support"},
];

export default function NeonHome(){
  const {content:{apps,site}}=useContent();
  const [paused,setPaused]=useState(false);
  const reduced=useReducedMotion();
  const x=useMotionValue(0),y=useMotionValue(0);
  const sx=useSpring(x,{stiffness:65,damping:25}),sy=useSpring(y,{stiffness:65,damping:25});
  return <div className={`neon-home ${paused?"motion-paused":""}`}>
    <section className="space-hero" id="home" onPointerMove={e=>{
      if(reduced||paused||e.pointerType!=="mouse"||!window.matchMedia("(hover:hover)").matches)return;
      const r=e.currentTarget.getBoundingClientRect();x.set((e.clientX-r.left-r.width/2)*.018);y.set((e.clientY-r.top-r.height/2)*.018);
    }} onPointerLeave={()=>{x.set(0);y.set(0)}}>
      <motion.div className="space-art" style={{x:reduced||paused?0:sx,y:reduced||paused?0:sy}} aria-hidden="true">
        <Image src="/images/neon-mobile-ai.webp" alt="" fill preload sizes="100vw"/>
      </motion.div>
      <div className="space-shade" aria-hidden="true"/>
      <HeroSignals paused={paused}/>
      <div className="space-particles" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i} style={{left:`${45+(i*17)%53}%`,top:`${8+(i*13)%65}%`,animationDelay:`${i*-.7}s`}}/>)}</div>
      <div className="orbit-rings" aria-hidden="true"><i/><i/><i/></div>
      <div className="mobile-hologram hologram-one" aria-hidden="true"><i/><b/><span/><span/><em/></div>
      <div className="mobile-hologram hologram-two" aria-hidden="true"><i/><b/><span/><span/><em/></div>
      <svg className="neural-network" viewBox="0 0 1000 500" fill="none" aria-hidden="true"><path d="M480 160 560 90 650 135 740 60 850 110 945 45M560 90 600 250 720 300 850 230 945 300M650 135 720 300M850 110 850 230M480 350 600 250M720 300 780 410 945 300"/>{[[480,160],[560,90],[650,135],[740,60],[850,110],[945,45],[600,250],[720,300],[850,230],[945,300],[480,350],[780,410]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="3" style={{animationDelay:`${i*-.3}s`}}/>)}</svg>
      <div className="hero-brand-wordmark" role="img" aria-label="Appistry Technologies"/>
      <div className="neon-container space-hero-inner">
        <Reveal className="space-copy">
          <p className="neon-kicker">FLUTTER DEVELOPMENT · iOS & ANDROID APPS</p>
          <h1>Engineering the Future <span>of Mobile Innovation.</span></h1>
          <p className="space-description">We design and build mobile apps that turn your ideas into thoughtful digital experiences. One Flutter codebase, made for iOS and Android.</p>
          <div className="neon-actions"><Link className="neon-button" href="/#contact">Start a Project <ArrowRight size={16}/></Link><a className="neon-button outline" href="#work"><Play size={13} fill="currentColor"/> Explore Our Work</a></div>
          <div className="hero-capabilities"><div><strong>iOS</strong><span>iPhone experiences</span></div><div><strong>Android</strong><span>Mobile apps</span></div><div><strong>Shared</strong><span>Flutter codebase</span></div></div>
        </Reveal>
      </div>
      <div className="hero-rail" aria-hidden="true"><span>IDEAS</span><span>DESIGN</span><span>FLUTTER</span><span>LAUNCH</span></div>
      <button className="motion-toggle" onClick={()=>{setPaused(!paused);x.set(0);y.set(0)}} aria-pressed={paused} aria-label={paused?"Play decorative animations":"Pause decorative animations"}>{paused?<Play size={13}/>:<Pause size={13}/>}<span>{paused?"Play motion":"Pause motion"}</span></button>
    </section>

    <section className="neon-section" id="services"><div className="neon-container">
      <Reveal className="neon-heading"><div><p className="neon-kicker">OUR SERVICES</p><h2>Complete Mobile Solutions<br/>for Your Next Idea.</h2></div><p>From app design to store release, we connect the details that make a mobile product work.</p><Link href="/services" className="neon-button outline small">View All Services <ArrowRight size={14}/></Link></Reveal>
      <div className="neon-services">{services.map((s,i)=><Reveal key={s.title} delay={i*.045}><Link className={`neon-service ${s.kind}`} href={s.href}><span className="neon-service-title"><s.icon size={33}/><h3>{s.title}</h3></span><p>{s.text}</p><span className="neon-text-link">Learn More <ArrowRight size={14}/></span></Link></Reveal>)}</div>
    </div></section>

    <section className="neon-section featured-section" id="work"><div className="neon-container">
      <Reveal className="neon-heading"><div><p className="neon-kicker">FEATURED DIRECTIONS</p><h2>Mobile Experiences<br/>Made with Purpose.</h2></div><p>Illustrative app concepts showing possible product directions. These are not published apps or client results.</p><Link href="/apps" className="neon-button outline small">Explore App Concepts <ArrowRight size={14}/></Link></Reveal>
      <div className="neon-projects">{apps.slice(0,3).map((app,i)=><Reveal key={app.id} delay={i*.06}><article className={`neon-project project-${app.screen}`}><div className="project-copy"><span className="concept-tag">CONCEPT PREVIEW</span><h3>{app.name}</h3><small>{app.category}</small><p>{app.oneLiner}</p><Link href="/apps" className="neon-button outline small">Explore Concept <ArrowRight size={14}/></Link></div><div className="project-device"><Phone kind={app.screen}/></div></article></Reveal>)}</div>
    </div></section>

    <section className="neon-section" id="process"><div className="neon-container">
      <Reveal className="neon-heading"><div><p className="neon-kicker">OUR PROCESS</p><h2>From Idea to<br/>Real Product.</h2></div><p>A clear, connected process for turning an idea into an app people can use.</p><Link href="/#contact" className="neon-button outline small">Get Started <ArrowRight size={14}/></Link></Reveal>
      <div className="neon-process">{process.map((step,i)=><Reveal key={step.title} delay={i*.06}><div className="neon-step"><div className="neon-step-top"><span className="step-orb"><step.icon size={27}/></span><div><small>0{i+1}</small><h3>{step.title}</h3></div>{i<4&&<ArrowRight className="step-connector" size={22}/>}</div><p>{step.text}</p></div></Reveal>)}</div>
    </div></section>

    <section className="neon-section neon-about" id="about"><div className="neon-container neon-about-grid">
      <Reveal><p className="neon-kicker">ABOUT APPISTRY TECHNOLOGIES</p><h2>Building Apps<br/>for a Better<br/><span>Tomorrow.</span></h2></Reveal>
      <Reveal className="neon-about-copy"><p>{site.story}</p><div className="neon-values">{["Mobile-first thinking","Flutter development","Clear communication","Considered UI/UX","iOS & Android","Release support"].map(v=><span key={v}><CheckCircle2 size={14}/>{v}</span>)}</div><Link href="/about" className="neon-button outline small">Learn More About Us <ArrowRight size={14}/></Link></Reveal>
      <Reveal className="studio-art"><Image src="/images/appistry-studio-concept.webp" alt="Concept illustration of an Appistry office with a desk, chair, glass walls and cyan lighting" fill sizes="(max-width: 900px) 100vw, 38vw"/><small>APPISTRY · STUDIO CONCEPT</small></Reveal>
    </div></section>

    <section className="neon-contact-band"><div className="neon-container"><div><p className="neon-kicker">LET’S WORK TOGETHER</p><h2>Have a Project in Mind?</h2><p>Let’s turn your idea into a thoughtful mobile app.</p></div><Link href="/#contact" className="neon-button">Start a Project <ArrowRight size={16}/></Link></div></section>
    <section id="contact" className="neon-contact-form neon-section"><div className="neon-container"><div><p className="neon-kicker">START A CONVERSATION</p><h2>Tell us about your app.</h2><p>iOS, Android, app design or maintenance. Share your idea and the next step you have in mind.</p><span className="neon-location">Multan, Pakistan</span></div><ContactForm/></div></section>
  </div>;
}
