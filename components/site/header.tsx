"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useTheme} from "next-themes";
import {useEffect,useState,useSyncExternalStore} from "react";
import {ArrowUpRight,Menu,Sun,Moon} from "lucide-react";
import {useContent} from "@/components/admin/content-provider";
import {Sheet,SheetContent,SheetTitle,SheetDescription,SheetTrigger,SheetClose} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Brand,ProjectLink} from "./shell";
import {Announcement} from "./extras";

const subscribe=()=>()=>{};
const client=()=>true;
const server=()=>false;
const sections=["home","services","work","process","about","contact"];

export function Header(){
  const {content:{site,copy}}=useContent();
  const path=usePathname();
  const {resolvedTheme,setTheme}=useTheme();
  const mounted=useSyncExternalStore(subscribe,client,server);
  const [compact,setCompact]=useState(false);
  const [open,setOpen]=useState(false);
  const [active,setActive]=useState("home");
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      frame=0;setCompact(window.scrollY>30);
      if(path!=="/")return;
      const threshold=(document.querySelector("header")?.getBoundingClientRect().height||78)+42;
      let selected="home";
      for(const section of sections){const el=document.getElementById(section);if(el&&el.getBoundingClientRect().top<=threshold)selected=section;}
      if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-4)selected="contact";
      setActive(selected);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
    schedule();window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);window.addEventListener("hashchange",schedule);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);window.removeEventListener("hashchange",schedule)};
  },[path]);
  const target=(href:string)=>href.includes("#")?href.split("#")[1]:href==="/"?"home":href.split("/")[1];
  const isCurrent=(href:string)=>path==="/"?target(href)===active:target(href)===(path.startsWith("/apps")?"work":path.split("/")[1]);
  const select=(href:string)=>{const section=target(href);setActive(section);if(section==="home"&&path==="/")window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});};
  return <><Announcement/><header className={`header ${compact?"compact":""}`}><div className="container header-inner">
    <Brand/>
    <nav className="desktop-nav" aria-label={copy.components_site_shell.text6}>{site.nav.map(n=><Link key={n.href} href={n.href} aria-current={isCurrent(n.href)?"location":undefined} onClick={()=>select(n.href)}>{n.label}</Link>)}</nav>
    <div className="header-actions">
      <Button variant="ghost" size="icon" className="icon-button" aria-label={mounted&&resolvedTheme==="light"?"Switch to dark theme":"Switch to light theme"} onClick={()=>setTheme(resolvedTheme==="dark"?"light":"dark")}>{mounted&&resolvedTheme==="light"?<Moon size={18}/>:<Sun size={18}/>}</Button>
      <span className="header-cta"><ProjectLink/></span>
      <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="ghost" size="icon" className="mobile-menu" aria-label={copy.components_site_shell.text7}><Menu/></Button></SheetTrigger>
        <SheetContent className="mobile-panel"><SheetTitle className="sr-only">Main navigation</SheetTitle><div onClick={()=>setOpen(false)}><Brand/></div><SheetDescription>Explore Appistry Technologies</SheetDescription>
          <nav aria-label="Mobile navigation">{site.nav.map((n,i)=><SheetClose asChild key={n.href}><Link href={n.href} aria-current={isCurrent(n.href)?"location":undefined} onClick={()=>select(n.href)}><small>0{i+1}</small>{n.label}<ArrowUpRight/></Link></SheetClose>)}</nav>
          <SheetClose asChild><Link href="/#contact" className="cta">Start a project <ArrowUpRight/></Link></SheetClose><p>Multan, Pakistan. Made for mobile.</p>
        </SheetContent>
      </Sheet>
    </div>
  </div></header></>;
}
