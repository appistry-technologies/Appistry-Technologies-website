"use client";
import {useContent} from "@/components/admin/content-provider";
import { EditableText } from "@/components/admin/editable";


import {PageIntro} from "@/components/site/page-intro";import {Portfolio} from "@/components/site/portfolio";import {CTABand} from "@/components/site/shell";export default function Page(){const {content:{copy}}=useContent();return <><PageIntro eyebrow={copy.app_work_page.text1} title={copy.app_work_page.text2} accent={copy.app_work_page.text3} text={copy.app_work_page.text4}/><div className="container portfolio-body"><p className="editorial-note"><EditableText path="app_work_page.text5" fallback={copy.app_work_page.text5} /></p><Portfolio kind="work"/></div><CTABand/></>}
