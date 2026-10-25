import {getPublicContent} from "@/lib/server-cms";
import type {ContentState} from "@/components/admin/content-provider";

import {copy} from "@/content/copy";
import type {Metadata} from "next";
import localFont from "next/font/local";
import {Providers} from "@/components/site/providers";
import {SiteFrame} from "@/components/site/site-frame";
import {site} from "@/content/site";
import "./globals.css";
import "./brand.css";
import "./neon.css";
import "./navigation.css";
import "./theme.css";
const heading=localFont({src:"./fonts/space-grotesk.woff2",variable:"--font-heading",display:"swap",weight:"300 700"});
const body=localFont({src:"./fonts/inter.woff2",variable:"--font-body",display:"swap",weight:"100 900"});
export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:"Appistry Technologies — Good ideas. Great apps.",template:"%s | Appistry Technologies"},description:site.description,alternates:{canonical:"/"},openGraph:{type:"website",siteName:site.name,title:site.name,description:site.description,images:["/opengraph-image"]},twitter:{card:"summary_large_image",images:["/opengraph-image"]},icons:{icon:"/favicon.svg"}};
export default async function RootLayout({children}:{children:React.ReactNode}){const names=["copy","site","services","apps","work","testimonials","technology","extras"] as const;const initialContent=Object.fromEntries((await Promise.all(names.map(async name=>[name,await getPublicContent(name)] as const))).filter(([,value])=>value!==null)) as Partial<ContentState>;const schema=[{"@context":"https://schema.org","@type":"Organization",name:site.name,url:site.url,description:site.description,address:{"@type":"PostalAddress",addressLocality:"Multan",addressCountry:"PK"}},{"@context":"https://schema.org","@type":"WebSite",name:site.name,url:site.url}];return <html lang="en" suppressHydrationWarning className={`${heading.variable} ${body.variable}`}><body><a className="skip-link" href="#main">{initialContent.copy?.app_layout?.text1 || copy.app_layout.text1}</a><Providers initialContent={initialContent}><SiteFrame>{children}</SiteFrame></Providers><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\u003c")}}/></body></html>}
