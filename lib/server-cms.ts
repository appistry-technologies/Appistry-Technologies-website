import {createSign} from "node:crypto";
// Server-only service account. Never expose this JSON through NEXT_PUBLIC_* variables.
let cached:{token:string;until:number}|undefined;
export function serverConfigured(){return !!process.env.FIREBASE_SERVICE_ACCOUNT_JSON;}
async function credentials(){
 const raw=process.env.FIREBASE_SERVICE_ACCOUNT_JSON;if(!raw)throw new Error("Server database connection is not configured.");
 const account=JSON.parse(raw) as {client_email:string;private_key:string;project_id:string};
 if(!cached||cached.until<Date.now()){
 const now=Math.floor(Date.now()/1000);const encode=(v:unknown)=>Buffer.from(JSON.stringify(v)).toString("base64url");const unsigned=encode({alg:"RS256",typ:"JWT"})+"."+encode({iss:account.client_email,scope:"https://www.googleapis.com/auth/datastore",aud:"https://oauth2.googleapis.com/token",iat:now,exp:now+3600});
 const sign=createSign("RSA-SHA256");sign.update(unsigned);const assertion=unsigned+"."+sign.sign(account.private_key,"base64url");
 const response=await fetch("https://oauth2.googleapis.com/token",{method:"POST",body:new URLSearchParams({grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",assertion}),signal:AbortSignal.timeout(15000)});if(!response.ok)throw new Error("Server database authentication failed.");const body=await response.json() as {access_token:string};cached={token:body.access_token,until:Date.now()+3300000};}
 return {project:account.project_id,token:cached.token};
}
type FireValue={stringValue?:string;booleanValue?:boolean;integerValue?:string;doubleValue?:number;nullValue?:null;arrayValue?:{values?:FireValue[]};mapValue?:{fields?:Record<string,FireValue>}};
export function pack(value:unknown):FireValue{if(value===null||value===undefined)return {nullValue:null};if(typeof value==="string")return {stringValue:value};if(typeof value==="boolean")return {booleanValue:value};if(typeof value==="number")return {doubleValue:value};if(Array.isArray(value))return {arrayValue:{values:value.map(pack)}};return {mapValue:{fields:Object.fromEntries(Object.entries(value as object).map(([k,v])=>[k,pack(v)]))}};}
export function unpack(value:FireValue):unknown{if("stringValue"in value)return value.stringValue;if("booleanValue"in value)return value.booleanValue;if("integerValue"in value)return Number(value.integerValue);if("doubleValue"in value)return value.doubleValue;if(value.arrayValue)return (value.arrayValue.values||[]).map(unpack);if(value.mapValue)return Object.fromEntries(Object.entries(value.mapValue.fields||{}).map(([k,v])=>[k,unpack(v)]));return null;}
export async function firestore(path:string,method="GET",body?:unknown){const {project,token}=await credentials();const response=await fetch(`https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents${path.startsWith(":")?"":"/"}${path}`,{method,headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:body?JSON.stringify(body):undefined,cache:"no-store",signal:AbortSignal.timeout(15000)});if(response.status===404)return null;if(!response.ok)throw new Error("Database request failed. Check the server connection and permissions.");return response.status===204?null:await response.json() as {documents?:{name:string;fields:Record<string,FireValue>}[];fields?:Record<string,FireValue>};}
export async function getPublicContent(name:string){
 // Public reads also work without server credentials, subject to Firestore rules.
 const project=process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;if(!project)return null;
 const response=await fetch(`https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents/siteContent/${name==="extras"?"extrasPublic":name}`,{cache:"no-store",signal:AbortSignal.timeout(5000)}).catch(()=>null);if(!response?.ok)return null;const body=await response.json() as {fields?:Record<string,FireValue>};return unpack(body.fields?.data||{nullValue:null});
}
export async function requireAdmin(token:string){
 if(!token)throw new Error("Sign in required.");const key=process.env.NEXT_PUBLIC_FIREBASE_API_KEY;const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({idToken:token}),signal:AbortSignal.timeout(10000)});const body=await response.json() as {users?:{customAttributes?:string;emailVerified?:boolean;email?:string}[]};const user=body.users?.[0];const allow=(process.env.ADMIN_EMAILS||process.env.NEXT_PUBLIC_ADMIN_EMAILS||"").split(",").map(s=>s.trim().toLowerCase()).filter(Boolean);
 const claims=user?.customAttributes?JSON.parse(user.customAttributes):{};
 if(!response.ok||!user||!(claims.admin===true||(user.emailVerified&&allow.includes(user.email?.toLowerCase()||""))))throw new Error("Administrator access required.");
 return user;
}
export function sameOrigin(request:Request){const origin=request.headers.get("origin");return !origin||origin===new URL(request.url).origin;}
const limits=new Map<string,{count:number;until:number}>();
export function allowRequest(request:Request,namespace:string,max=30){const now=Date.now();for(const [k,v]of limits)if(v.until<now)limits.delete(k);const key=namespace+":"+(request.headers.get("cf-connecting-ip")||"local");const entry=limits.get(key)||{count:0,until:now+60000};entry.count++;if(limits.size>10000)return false;limits.set(key,entry);return entry.count<=max;}
