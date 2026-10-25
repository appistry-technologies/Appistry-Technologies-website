// Development-only entry point for environments that cannot fork the Next CLI.
// Deployment continues to use the existing Next.js / Vercel build commands.
import {createServer} from "node:http";
import next from "next";

process.env.NODE_ENV = "development";
process.env.APPISTRY_LOCAL_PREVIEW = "1";
const port = Number(process.env.PORT || 3000);
const hostname = "127.0.0.1";
const app = next({
  dev: true,
  hostname,
  port,
});
await app.prepare();
createServer(app.getRequestHandler()).listen(port, hostname, () => {
  console.log(`Appistry preview: http://localhost:${port}`);
});
