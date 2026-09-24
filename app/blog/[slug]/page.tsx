import {Blog} from "@/components/site/blog";
import {getPublicContent} from "@/lib/server-cms";
import type {ExtraContent} from "@/lib/cms";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const extras=await getPublicContent("extras") as ExtraContent|null;const p=extras?.blog.find(p=>p.slug===slug&&p.published);return p?{title:p.title,description:p.excerpt}:{title:"Article not found",robots:{index:false}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <Blog slug={slug}/>;}
