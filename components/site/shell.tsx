"use client";
import {useContent} from "@/components/admin/content-provider";
import { EditableText } from "@/components/admin/editable";




import Link from "next/link";




import {ArrowUpRight,Globe2} from "lucide-react";
import {motion,useReducedMotion} from "framer-motion";
import {Button} from "@/components/ui/button";

export function Brand(){const {content:{copy}}=useContent();return <Link href="/#home" aria-label={copy.components_site_shell.text1} className="brand"><span className="brand-emblem" aria-hidden="true"/><span className="brand-wordmark" aria-hidden="true"/></Link>}
export function ProjectLink({secondary=false,children}:{secondary?:boolean;children?:React.ReactNode}){return <Button asChild className={secondary?"cta secondary":"cta"}><Link href={secondary?"/apps":"/#contact"}>{children||(secondary?"See our apps":"Start a project")}<ArrowUpRight size={17}/></Link></Button>}
export function Reveal({children,className="",delay=0}:{children:React.ReactNode;className?:string;delay?:number}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.5,delay,ease:"easeOut"}}>{children}</motion.div>}
export function CTABand(){const {content:{copy}}=useContent();return <section className="cta-band container"><Reveal><div className="eyebrow"><EditableText path="components_site_shell.text13" fallback={copy.components_site_shell.text13} /></div><div className="cta-band-inner"><h2><EditableText path="components_site_shell.text14" fallback={copy.components_site_shell.text14} /><br/><span><EditableText path="components_site_shell.text15" fallback={copy.components_site_shell.text15} /></span></h2><ProjectLink/></div></Reveal></section>}
export function Footer(){const {content:{copy,site,extras}}=useContent();return <footer className="footer"><div className="container"><div className="footer-top"><div><Brand/><p><EditableText path="components_site_shell.text16" fallback={copy.components_site_shell.text16} /></p></div><div className="footer-links">{site.nav.map(n=><Link key={n.href} href={n.href}>{n.label}</Link>)}</div><div className="footer-location"><Globe2 size={19}/><span><EditableText path="components_site_shell.text18" fallback={copy.components_site_shell.text18} /><br/><small><EditableText path="components_site_shell.text19" fallback={copy.components_site_shell.text19} /></small></span></div></div><nav className="footer-legal" aria-label="Legal information"><strong>Legal</strong><Link href="/legal/privacy">Privacy Policy</Link><Link href="/legal/terms">Terms &amp; Conditions</Link><Link href="/legal/cookies">Cookie Policy</Link><Link href="/legal/disclaimer">Disclaimer</Link></nav><div className="footer-social">{extras.social.map(link=><a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}</div><div className="footer-bottom"><span><EditableText path="components_site_shell.text20" fallback={copy.components_site_shell.text20} />{new Date().getFullYear()} {site.legalName}</span><span><EditableText path="components_site_shell.text21" fallback={copy.components_site_shell.text21} /></span></div></div></footer>}
