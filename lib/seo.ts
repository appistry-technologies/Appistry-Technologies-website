import type { Metadata } from "next";
import {site} from "@/content/site";
export function pageMetadata(title:string,description:string,path:string):Metadata {return {title,description,alternates:{canonical:`${site.url}${path}`},openGraph:{title:`${title} — Appistry Technologies`,description,url:`${site.url}${path}`,type:"website",images:[{url:"/opengraph-image",width:1200,height:630}]},twitter:{card:"summary_large_image",title,description,images:["/opengraph-image"]}};}

export async function managedMetadata(title:string,description:string,path:string):Promise<Metadata>{
 const {getPublicContent}=await import("./server-cms");
 const extras=await getPublicContent("extras") as import("./cms").ExtraContent|null;
 const override=extras?.seo.pages.find(page=>page.path===path);
 return pageMetadata(override?.title || (path==="/"?extras?.seo.title:undefined) || title,override?.description || (path==="/"?extras?.seo.description:undefined) || description,path);
}
