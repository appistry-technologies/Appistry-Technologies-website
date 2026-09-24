import {firestore,pack} from "@/lib/server-cms";
export const runtime="nodejs";
import {contactSchema} from "@/lib/contact-schema";
const attempts=new Map<string,{count:number;reset:number}>();
const WINDOW=15*60*1000;
function reply(message:string,status:number,extra:Record<string,string>={}){return Response.json({message},{status,headers:{"Cache-Control":"no-store",...extra}})}
export async function POST(request:Request){
 const origin=request.headers.get("origin");if(origin&&origin!==new URL(request.url).origin)return reply("This request is not allowed.",403);
 if(!request.headers.get("content-type")?.includes("application/json"))return reply("Please send a JSON request.",415);
 // Simple best-effort per-isolate limit. Replace with an edge rate limiter or shared store for multi-instance deployments.
 // Only trust proxy-injected IP headers on infrastructure that removes client-supplied copies.
 const ip=request.headers.get("cf-connecting-ip")||"unknown";const now=Date.now();
 for(const [key,value] of attempts)if(value.reset<=now)attempts.delete(key);
 const entry=attempts.get(ip)||{count:0,reset:now+WINDOW};if(entry.count>=5)return reply("Too many enquiries. Please try again in 15 minutes.",429,{"Retry-After":String(Math.ceil((entry.reset-now)/1000))});
 if(attempts.size>=10000&&!attempts.has(ip))return reply("We’re receiving a lot of requests. Please try again shortly.",429,{"Retry-After":"60"});entry.count++;attempts.set(ip,entry);
 if(Number(request.headers.get("content-length")||0)>16000)return reply("Your message is too large.",413);
 let data:unknown;try{const reader=request.body?.getReader();if(!reader)return reply("A request body is required.",400);const chunks:Uint8Array[]=[];let size=0;while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>16000){await reader.cancel();return reply("Your message is too large.",413)}chunks.push(value)}const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length}data=JSON.parse(new TextDecoder().decode(bytes))}catch{return reply("We couldn’t read your request.",400)}
 if(data&&typeof data==="object"&&"website" in data&&data.website)return reply("Thanks for your enquiry.",200);
 const parsed=contactSchema.safeParse(data);if(!parsed.success)return Response.json({message:"Please check the fields and try again.",errors:parsed.error.flatten().fieldErrors},{status:422,headers:{"Cache-Control":"no-store"}});
 try {
  const {website: ignored, ...message}=parsed.data;
  void ignored;
  const fields=pack({...message,read:false,archived:false,createdAt:new Date().toISOString()}).mapValue?.fields;
  await firestore("messages","POST",{fields});
  return reply("Thanks. Your enquiry has been received by our team.",200);
 } catch { return reply("We could not save your enquiry. Please try again later or use the contact details shown on this page.",503); }
}
