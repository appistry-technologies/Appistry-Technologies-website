export const site = {
 name: "Appistry Technologies", legalName: "Appistry Technologies (SMC-Private) Limited",
 tagline: "Good ideas. Great apps.", description: "A Flutter mobile app studio in Multan. We design and build iOS and Android apps, from the first idea to release.",
 url: process.env.NEXT_PUBLIC_SITE_URL || "https://appistry-technologies.muhammad-faiza937572.chatgpt.site",
 location: "Multan, Pakistan", email: "" as string, phone: "" as string, whatsapp: "" as string, responseTime: "We aim to reply within 2 business days.",
 // Replace sample portfolio content and add verified contact details before public launch.
 demoContent: true,
 nav: [{label:"Home",href:"/#home"},{label:"Services",href:"/#services"},{label:"Our Work",href:"/#work"},{label:"Process",href:"/#process"},{label:"About",href:"/#about"},{label:"Contact",href:"/#contact"}],
 stats: [{value:2,suffix:"",label:"Ways we build",detail:"Client products + our own apps"},{value:6,suffix:"",label:"Connected stages",detail:"Discovery through growth"},{value:2,suffix:"",label:"Mobile platforms",detail:"iOS + Android"},{value:1,suffix:"",label:"Accountable team",detail:"From first call to release"}],
 story: "We believe the best product teams build things of their own. Appistry brings that ownership to every engagement: the care of a founder, the craft of a designer, and the discipline of an engineer. Based in Multan and working globally, we partner with businesses to turn useful ideas into mobile products people want to keep.",
 values:[{title:"Build for people.",text:"Start with the person using the product. Make the important things obvious and the difficult things simpler."},{title:"Own the outcome.",text:"Challenge assumptions, surface risks early, and stay involved beyond the release."},{title:"Keep it honest.",text:"Clear estimates. Visible progress. Straight answers when something needs to change."}],
 team: [] as {name:string;role:string;photo:string;linkedin?:string}[],
 faq: [
 {q:"How can we work together?",a:"Choose a fixed-scope engagement for a well-defined release, a dedicated product team for ongoing delivery, or a discovery sprint to clarify the opportunity. We recommend a model after understanding your goals."},
 {q:"How long does it take to launch an app?",a:"A focused MVP commonly needs 8–16 weeks after discovery. Integrations, compliance, content, and review cycles affect the schedule. You receive a milestone plan before development begins."},
 {q:"Can you sign an NDA before we share our idea?",a:"Yes. We can review your NDA or provide one before discussing confidential product details. Ownership and confidentiality are documented in the engagement agreement."},
 {q:"Do we own the code and designs?",a:"Our proposed agreements transfer the agreed project deliverables to you after payment. Third-party software retains its original licence. We document those dependencies during handover."},
 {q:"What happens after launch?",a:"We offer ongoing maintenance, monitoring, operating-system updates, and product improvements. Support coverage and response times are agreed separately so expectations stay clear."},
 {q:"Can you improve an existing app?",a:"Yes. We start with a code and product review, identify the highest-impact issues, and propose a plan for stabilisation, redesign, or new features."}
 ]
} as const;
