import ProjectPage from "@/components/site/project-page";
import {getPublicContent} from "@/lib/server-cms";
import {work,type Project} from "@/content/work";
import {pageMetadata} from "@/lib/seo";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const projects=await getPublicContent("work") as Project[]|null;const project=(projects||work).find(p=>p.slug===slug);return project?pageMetadata(project.title,project.summary,`/work/${slug}`):{title:"Project not found"};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <ProjectPage slug={slug}/>;}
