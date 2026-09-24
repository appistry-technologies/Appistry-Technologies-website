import Home from "@/components/site/home";export default Home;
export async function generateMetadata(){const {managedMetadata}=await import("@/lib/seo");return managedMetadata("Appistry Technologies","Mobile apps, product design and web development.","/");}
