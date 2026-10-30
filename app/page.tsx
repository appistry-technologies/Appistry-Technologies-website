import Home from "@/components/site/light-home";
import "./light-home.css";
export default Home;
export async function generateMetadata(){const {managedMetadata}=await import("@/lib/seo");return managedMetadata("Appistry Technologies","Thoughtful mobile app development, product design and support.","/");}
