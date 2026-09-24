import {Reveal} from "./shell";
export function PageIntro({eyebrow,title,accent,text}:{eyebrow:string;title:string;accent?:string;text:string}){return <section className="page-intro container"><Reveal><div className="eyebrow">{eyebrow}</div><h1>{title}{accent&&<><br/><span>{accent}</span></>}</h1><p>{text}</p></Reveal></section>}
