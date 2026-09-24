"use client";
import {usePathname} from "next/navigation";
import {Header,Footer} from "./shell";
export function SiteFrame({children}:{children:React.ReactNode}){const admin=usePathname().startsWith("/admin");return <>{!admin&&<Header/>}<main id="main">{children}</main>{!admin&&<Footer/>}</>;}
