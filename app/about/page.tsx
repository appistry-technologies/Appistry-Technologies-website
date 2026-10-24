import Page from "@/components/site/about-page";
import {managedMetadata} from "@/lib/seo";
export async function generateMetadata(){return managedMetadata("About","An independent mobile-first product studio in Multan, building for businesses and creating its own apps.","/about"); }
export default Page;
