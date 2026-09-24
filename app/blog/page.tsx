import {Blog} from "@/components/site/blog";
import {managedMetadata} from "@/lib/seo";
export async function generateMetadata(){return managedMetadata("Blog","Ideas and insights from the Appistry team.","/blog"); }
export default function Page(){return <Blog/>;}
