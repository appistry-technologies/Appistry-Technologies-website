import type {NextConfig} from "next";
// React uses eval for development stack traces; production must keep it blocked.
const isDevelopment = process.env.NODE_ENV === "development";
const csp=["default-src 'self'",`script-src 'self' 'unsafe-inline' blob:${isDevelopment ? " 'unsafe-eval'" : ""}`,"worker-src 'self' blob:","style-src 'self' 'unsafe-inline'","img-src 'self' data: blob: https:","font-src 'self' data:","connect-src 'self' https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com","frame-src https://www.google.com","object-src 'none'","base-uri 'self'","form-action 'self'","frame-ancestors 'none'","upgrade-insecure-requests"].join('; ');
const nextConfig:NextConfig={experimental:{workerThreads:process.env.APPISTRY_LOCAL_PREVIEW==="1"},poweredByHeader:false,async headers(){return [{source:"/:path*",headers:[{key:"Content-Security-Policy",value:csp},{key:"X-Frame-Options",value:"DENY"},{key:"X-Content-Type-Options",value:"nosniff"},{key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},{key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"}]}]}};
export default nextConfig;
