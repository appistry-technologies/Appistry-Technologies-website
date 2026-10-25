"use client";
import {usePathname} from "next/navigation";
import {Footer} from "./shell";
import {Header} from "./header";
export function SiteFrame({children}:{children:React.ReactNode}){const admin=usePathname().startsWith("/admin");return <>{!admin&&<Header/>}<main id="main">{children}</main>{!admin&&<Footer/>}</>;}
