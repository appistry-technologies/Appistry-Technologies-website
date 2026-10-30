import Link from "next/link";
import type {Metadata} from "next";
import "./legal.css";
export type LegalSection={heading:string;paragraphs:string[]};
export const legalPages={
 privacy:{title:"Privacy Policy",intro:"How we handle information you share with Appistry Technologies.",sections:[
 {heading:"Information we collect",paragraphs:["When you send a project enquiry, our form asks for your name, email address, optional company name, project type, budget range and message. We receive the details you choose to submit.","Our hosting and security providers may also process technical information such as IP address, browser information and request logs to operate and protect the website."]},
 {heading:"How we use information",paragraphs:["We use enquiry information to respond to your request, discuss potential services, manage business communications and protect the website against abuse. We do not claim to sell personal information."]},
 {heading:"Service providers and transfers",paragraphs:["Website hosting, form delivery and security may involve third-party service providers. Their locations and processing arrangements depend on the services actually configured. We only describe a provider as active after verifying its integration."]},
 {heading:"Retention and security",paragraphs:["We retain enquiries for as long as reasonably necessary for correspondence, legitimate business records and applicable legal obligations. No online system can guarantee absolute security."]},
 {heading:"Your choices",paragraphs:["You may request access, correction or deletion of personal information by contacting us through the website contact form. We will review requests in accordance with applicable law and any necessary recordkeeping obligations."]},
 {heading:"Updates and contact",paragraphs:["We may revise this policy as our services and practices change. For privacy questions, use the contact form on this website."]}
 ]},
 terms:{title:"Terms & Conditions",intro:"The basic conditions for using our website and contacting our team.",sections:[
 {heading:"Using this website",paragraphs:["This website provides information about Appistry Technologies and its services. You agree not to misuse it, interfere with its operation or submit unlawful, misleading or harmful content."]},
 {heading:"Information and estimates",paragraphs:["Website content is general information, not a binding offer. Project estimates, timelines, deliverables and support commitments become binding only when documented in a separate agreement accepted by the parties."]},
 {heading:"Intellectual property",paragraphs:["Unless otherwise stated, the website design, text, branding and original materials belong to Appistry Technologies or their respective licensors. You may not reuse them commercially without permission."]},
 {heading:"Project ownership",paragraphs:["Ownership of commissioned code, designs and deliverables is governed by the applicable signed project agreement. Third-party libraries, assets and services remain subject to their own licences."]},
 {heading:"External links",paragraphs:["Links to third-party websites are provided for convenience. We are not responsible for their content, security or policies."]},
 {heading:"Liability and changes",paragraphs:["To the extent permitted by applicable law, we do not guarantee uninterrupted or error-free website access. Nothing here excludes liability that cannot legally be excluded. We may update these terms as needed."]},
 {heading:"Questions",paragraphs:["For questions about these terms, contact us through the website enquiry form."]}
 ]},
 cookies:{title:"Cookie Policy",intro:"An overview of cookies and similar technologies on this website.",sections:[
 {heading:"What cookies are",paragraphs:["Cookies are small files stored by a browser. Similar technologies can remember preferences, support sessions or help operators understand website performance."]},
 {heading:"Cookies we may use",paragraphs:["Essential technologies may be required for website functionality, security and administration. Any analytics, marketing or optional third-party cookies must be disclosed here if enabled. This page does not imply that optional tracking is currently active."]},
 {heading:"Your controls",paragraphs:["You can review, block or delete cookies in your browser settings. Disabling essential storage may affect some features. Where legally required, non-essential cookies should not be set before appropriate consent."]},
 {heading:"Policy updates",paragraphs:["We will update this page when the website's verified cookie inventory or third-party integrations change. Contact us through the website for questions."]}
 ]},
 disclaimer:{title:"Disclaimer",intro:"Important information about the content and examples shown on our website.",sections:[
 {heading:"General information",paragraphs:["Our website content is provided for general information and may change without notice. We aim for accuracy but do not warrant that all information is complete or current."]},
 {heading:"Concept projects",paragraphs:["Illustrative app concepts, previews and mockups are demonstrations of possible product directions. They should not be interpreted as shipped products, customer engagements or verified client outcomes unless explicitly identified as such."]},
 {heading:"No guaranteed outcomes",paragraphs:["We do not guarantee app-store approval, commercial results, performance improvements or project delivery dates through statements on this website. Specific commitments belong in a written project agreement."]},
 {heading:"Third-party materials",paragraphs:["Third-party names, links and technologies belong to their respective owners. References do not imply endorsement or partnership."]},
 {heading:"Contact",paragraphs:["If you find inaccurate information or have questions, please use our website contact form."]}
 ]}
} satisfies Record<string,{title:string;intro:string;sections:LegalSection[]}>;
export type LegalKey=keyof typeof legalPages;
const links:[LegalKey,string][]=[["privacy","Privacy Policy"],["terms","Terms & Conditions"],["cookies","Cookie Policy"],["disclaimer","Disclaimer"]];
export function LegalPage({page}:{page:LegalKey}){const data=legalPages[page];return <main className="legal-page"><div className="legal-container"><nav className="legal-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Legal</span><span>/</span><span>{data.title}</span></nav><div className="legal-intro"><span className="legal-eyebrow">LEGAL INFORMATION</span><h1>{data.title}</h1><p>{data.intro}</p><small>Draft for review · 30 October 2026</small></div><div className="legal-grid"><aside className="legal-sidebar" aria-label="Legal documents"><strong>Legal documents</strong>{links.map(([key,label])=><Link key={key} href={`/legal/${key}`} aria-current={key===page?"page":undefined}>{label}</Link>)}</aside><article className="legal-article">{data.sections.map((section,i)=><section key={section.heading} id={`section-${i+1}`}><h2>{section.heading}</h2>{section.paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}<div className="legal-help"><strong>Have a question?</strong><p>Get in touch with our team about this document.</p><Link href="/#contact">Contact us →</Link></div></article></div></div></main>}
export function legalMetadata(page:LegalKey):Metadata{return {title:`${legalPages[page].title} | Appistry Technologies`,description:legalPages[page].intro}}
