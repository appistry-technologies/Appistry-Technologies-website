"use client";
import Link from "next/link";
import {ArrowRight, Smartphone, Apple, Globe2, Sparkles, ClipboardList, Target, PenTool, Code2, Rocket} from "lucide-react";
import {useContent} from "@/components/admin/content-provider";
import {ContactForm} from "./contact-form";

const services=[
 {name:"Android App Development",description:"Thoughtful Android experiences built around your users.",icon:Smartphone,href:"/services#android-apps"},
 {name:"iOS App Development",description:"Beautiful, reliable mobile experiences for iPhone.",icon:Apple,href:"/services#ios-apps"},
 {name:"UI/UX Design",description:"Simple interfaces that make complex ideas feel easy.",icon:PenTool,href:"/services#product-design"},
 {name:"App Support",description:"Practical improvements and maintenance after launch.",icon:Sparkles,href:"/services#growth-support"}
];
const steps=[{name:"Discover",icon:ClipboardList},{name:"Plan",icon:Target},{name:"Design",icon:PenTool},{name:"Develop",icon:Code2},{name:"Launch",icon:Rocket}];
export default function LightHome(){
 const {content:{apps,site}}=useContent();
 return <div className="light-site">
  <section className="light-hero" id="home"><div className="light-wrap light-hero-grid">
   <div className="light-hero-copy"><p className="light-eyebrow">IDEAS · APPS · TECHNOLOGY</p><h1>Turning Ideas Into Meaningful <span>Digital Products.</span></h1><p className="light-lead">We create thoughtfully designed mobile experiences that help people and businesses move forward.</p><div className="light-actions"><Link href="/#contact" className="light-btn">Start a Project <ArrowRight size={17}/></Link><a href="#work" className="light-btn light-btn-outline">View Our Work</a></div><p className="light-note">Mobile development · Product design · Ongoing support</p></div>
   <div className="light-visual" aria-label="Illustration of a modern mobile application"><div className="light-orbit"/><div className="light-phone"><div className="light-phone-notch"/><div className="light-phone-content"><span className="light-phone-mark">A</span><p>Simple software.<br/><strong>Better tomorrow.</strong></p><small>Mobile apps<br/>Thoughtful design<br/>Useful experiences</small><div className="light-phone-art"/></div></div></div>
  </div></section>
  <section className="light-section" id="services"><div className="light-wrap"><div className="light-section-head"><div><p className="light-eyebrow">OUR SERVICES</p><h2>What We Do</h2><p>Focused services to help your next digital idea take shape.</p></div><Link href="/services" className="light-link">View All Services <ArrowRight size={16}/></Link></div><div className="light-services">{services.map(s=><Link key={s.name} href={s.href} className="light-service"><span className="light-service-icon"><s.icon size={25}/></span><h3>{s.name}</h3><p>{s.description}</p><span className="light-link">Learn More <ArrowRight size={15}/></span></Link>)}</div></div></section>
  <section className="light-section" id="work"><div className="light-wrap"><div className="light-section-head"><div><p className="light-eyebrow">SELECTED WORK</p><h2>Ideas Worth Exploring</h2><p>Illustrative concepts, not published apps or client projects.</p></div><Link href="/apps" className="light-link">Explore Concepts <ArrowRight size={16}/></Link></div><div className="light-feature"><div><span className="light-tag">CONCEPT PREVIEW</span><h3>{apps[0]?.name || "Mobile App Concept"}</h3><p>{apps[0]?.oneLiner || "An example of how a simple idea can become a useful digital experience."}</p><Link href="/apps" className="light-btn light-btn-outline">Explore Concept <ArrowRight size={16}/></Link></div><div className="light-feature-art"><div className="light-mini-phone"><div className="light-mini-top"/><Globe2 size={45}/><div className="light-route"/><span>Explore what’s possible</span></div></div></div></div></section>
  <section className="light-section light-process" id="process"><div className="light-wrap"><p className="light-eyebrow">OUR PROCESS</p><h2>From Idea to Real Product</h2><div className="light-steps">{steps.map((s,i)=><div className="light-step" key={s.name}><span><s.icon size={22}/></span><div><small>0{i+1}</small><h3>{s.name}</h3></div></div>)}</div></div></section>
  <section className="light-section" id="about"><div className="light-wrap light-about"><div><p className="light-eyebrow">ABOUT APPISTRY</p><h2>Small team mindset.<br/>Thoughtful digital work.</h2></div><div><p>{site.story}</p><Link href="/about" className="light-link">More About Us <ArrowRight size={16}/></Link></div></div></section>
  <section className="light-wrap light-cta"><div><p className="light-eyebrow">LET'S WORK TOGETHER</p><h2>Have a Project in Mind?</h2><p>Tell us what you're building. We'd love to hear about it.</p></div><Link href="/#contact" className="light-btn">Start a Project <ArrowRight size={17}/></Link></section>
  <section className="light-section light-contact" id="contact"><div className="light-wrap light-contact-grid"><div><p className="light-eyebrow">GET IN TOUCH</p><h2>Let's talk about your idea.</h2><p>Share a few details and we'll take it from there.</p></div><ContactForm/></div></section>
 </div>;
}
