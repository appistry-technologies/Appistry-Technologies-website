"use client";
import { EditableText } from "@/components/admin/editable";
import {copy} from "@/content/copy";
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="container page-intro"><div className="eyebrow"><EditableText path="app_error.text1" fallback={copy.app_error.text1} /></div><h1><EditableText path="app_error.text2" fallback={copy.app_error.text2} /></h1><p><EditableText path="app_error.text3" fallback={copy.app_error.text3} /></p><button className="cta" onClick={reset}><EditableText path="app_error.text4" fallback={copy.app_error.text4} /></button></section>}
