"use client";
import {useContent} from "@/components/admin/content-provider";


import {PageIntro} from "@/components/site/page-intro";import {Portfolio} from "@/components/site/portfolio";import {CTABand} from "@/components/site/shell";export default function Page(){const {content:{copy,apps}}=useContent();const downloads=apps.reduce((sum,a)=>sum+(a.downloads||0),0);return <><PageIntro eyebrow={copy.app_apps_page.text1} title={copy.app_apps_page.text2} accent={copy.app_apps_page.text3} text={copy.app_apps_page.text4}/><div className="container portfolio-body"><div className="download-highlight"><strong>{downloads>0?downloads.toLocaleString():"Made to be useful."}</strong><p>{downloads>0?"Verified downloads across our published apps.":"Illustrative product concepts. Verified store links, ratings, and download totals will be published after launch."}</p></div><Portfolio kind="apps"/></div><CTABand/></>}
