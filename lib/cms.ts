import { z } from "zod";

export const extrasDefaults = {
  announcement: { enabled: false, text: "", label: "Learn more", href: "/contact" },
  widgets: { enabled: false, whatsapp: "", label: "Chat on WhatsApp" },
  social: [] as { label: string; href: string }[],
  images: { workspace: "/images/workspace.jpg", landscape: "/images/mountains.jpg" },
  blog: [] as { slug: string; title: string; excerpt: string; body: string; cover: string; author: string; date: string; published: boolean }[],
  seo: { title: "Appistry Technologies", description: "Mobile apps, product design and web development from Lahore.", pages: [] as { path: string; title: string; description: string }[] },
  ai: { enabled: false, name: "Appistry assistant", greeting: "Hi! How can we help with your project?", instructions: "Answer questions about Appistry using the provided site information. Do not invent prices, results or commitments. Suggest contacting the team when unsure." },
  analytics: { enabled: false },
};
export type ExtraContent = typeof extrasDefaults;
const link = z.string().refine(v => !v || /^\/(?!\/)/.test(v) || /^https?:\/\//i.test(v) || /^(mailto:|tel:)/i.test(v), "Use a relative path, https://, mailto: or tel: link.");
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens.");
const screen = z.enum(["finance", "nature", "focus"]);
const text = z.string();
const strings = z.array(text);
export const schemas = {
  site:z.object({name:text.min(1),legalName:text,tagline:text,description:text,url:link,location:text,email:z.union([z.literal(""),z.string().email()]),phone:text,whatsapp:link,responseTime:text,demoContent:z.boolean(),nav:z.array(z.object({label:text.min(1),href:link})),stats:z.array(z.object({value:z.number(),suffix:text,label:text,detail:text})),story:text,values:z.array(z.object({title:text,text})),team:z.array(z.object({name:text.min(1),role:text,photo:link,linkedin:link.optional()})),faq:z.array(z.object({q:text,a:text}))}),
  technology:z.object({technologies:z.array(z.object({name:text,category:text,logo:text})),processSteps:z.array(z.object({title:text,text}))}),
  copy:z.record(z.record(z.string())),
  apps: z.array(z.object({id:slug,name:text.min(1),oneLiner:text,category:text,platforms:strings,rating:z.number().min(0).max(5).nullable(),downloads:z.number().int().min(0).nullable(),appStore:link.nullable(),googlePlay:link.nullable(),screen,initial:text,status:text})),
  services: z.array(z.object({id:slug,title:text.min(1),description:text,icon:z.enum(["phone","layers","pen","cloud"]),capabilities:strings,deliverables:strings,tech:strings,timeline:text})),
  work: z.array(z.object({slug,title:text.min(1),client:text,summary:text,category:text,platforms:strings,screen,challenge:text,approach:text,outcome:text,metrics:z.array(z.object({value:text,label:text})),stack:strings})),
  testimonials:z.array(z.object({quote:text,name:text,role:text,company:text})),
  extras:z.object({announcement:z.object({enabled:z.boolean(),text,label:text,href:link}),widgets:z.object({enabled:z.boolean(),whatsapp:link,label:text}),social:z.array(z.object({label:text,href:link})),images:z.object({workspace:link,landscape:link}),blog:z.array(z.object({slug,title:text.min(1),excerpt:text,body:text,cover:link,author:text,date:text,published:z.boolean()})),seo:z.object({title:text,description:text,pages:z.array(z.object({path:text,title:text,description:text}))}),ai:z.object({enabled:z.boolean(),name:text,greeting:text,instructions:text.max(5000)}),analytics:z.object({enabled:z.boolean()})}),
};
export function validateContent(collection:string,value:unknown){
  const schema=schemas[collection as keyof typeof schemas];
  if(schema){const result=schema.safeParse(value);if(!result.success)throw new Error(result.error.issues.map(i=>`${i.path.join(" > ")}: ${i.message}`).join("\n"));}
  const visit=(v:unknown,key="")=>{if(typeof v==="string"&&/^(href|url|photo|linkedin|whatsapp)$/.test(key)&&!link.safeParse(v).success)throw new Error(`${key}: use a valid link.`);if(Array.isArray(v)){const ids=v.map(i=>i&&typeof i==="object"?(i as Record<string,unknown>).slug??(i as Record<string,unknown>).id:undefined).filter(Boolean);if(new Set(ids).size!==ids.length)throw new Error("Each item needs a unique ID or URL slug.");v.forEach(i=>visit(i));}else if(v&&typeof v==="object")Object.entries(v).forEach(([k,x])=>visit(x,k));};visit(value);
}
