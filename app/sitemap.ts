import type {MetadataRoute} from "next";
import {site} from "@/content/site";
import {work,type Project} from "@/content/work";
import {getPublicContent} from "@/lib/server-cms";
import type {ExtraContent} from "@/lib/cms";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const [saved,extras]=await Promise.all([getPublicContent("work"),getPublicContent("extras")]);const projects=saved as Project[]|null;const settings=extras as ExtraContent|null;return ["","/services","/work","/apps","/about","/contact","/blog",...(projects||work).map(p=>`/work/${p.slug}`),...(settings?.blog||[]).filter(p=>p.published).map(p=>`/blog/${p.slug}`)].map(path=>({url:`${site.url}${path}`,changeFrequency:"monthly",priority:path===""?1:.8}));}
