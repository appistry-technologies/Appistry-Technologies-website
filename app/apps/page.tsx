import Page from "@/components/site/apps-page";
import {managedMetadata} from "@/lib/seo";
export async function generateMetadata(){return managedMetadata("Our Apps","Explore Appistry’s own product directions and verified app listings as they launch.","/apps"); }
export default Page;
