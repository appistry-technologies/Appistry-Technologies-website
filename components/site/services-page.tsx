"use client";
import {useContent} from "@/components/admin/content-provider";


import {PageIntro} from "@/components/site/page-intro";import {ServiceDetails} from "@/components/site/service-details";import {CTABand} from "@/components/site/shell";export default function Page(){const {content:{copy}}=useContent();return <><PageIntro eyebrow={copy.app_services_page.text1} title={copy.app_services_page.text2} accent={copy.app_services_page.text3} text={copy.app_services_page.text4}/><div className="container"><ServiceDetails/></div><CTABand/></>}
