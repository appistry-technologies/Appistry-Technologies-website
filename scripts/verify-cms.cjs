const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('typescript');
function load(file, overrides = {}) {
  const source=ts.transpileModule(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  const context={exports:{},require,process,Buffer,URL,Response,AbortSignal,fetch,...overrides};
  vm.runInNewContext(source,context,{filename:file});return context.exports;
}
const cms=load('lib/cms.ts');
let checks=0;
for(const [name,file] of [['site','site'],['apps','apps'],['services','services'],['work','work'],['testimonials','testimonials'],['copy','copy']]){cms.validateContent(name,load(`content/${file}.ts`)[name]);checks++;}
cms.validateContent('extras',cms.extrasDefaults);checks++;
const apps=load('content/apps.ts').apps;
assert.throws(()=>cms.validateContent('apps',[{...apps[0],screen:'invalid'}]));checks++;
assert.throws(()=>cms.validateContent('apps',[{...apps[0],appStore:'javascript:alert(1)'}]));checks++;
assert.throws(()=>cms.validateContent('apps',[apps[0],apps[0]]));checks++;
assert.throws(()=>cms.validateContent('apps',[{...apps[0],rating:9}]));checks++;
assert.throws(()=>cms.validateContent('extras',{...cms.extrasDefaults,blog:[{slug:'Bad Slug',title:'Example',excerpt:'',body:'',cover:'',author:'',date:'',published:false}]}));checks++;
const server=load('lib/server-cms.ts');
const sample={title:'Example',enabled:true,total:42.5,empty:null,nested:{values:['a',3,false]}};
assert.equal(JSON.stringify(server.unpack(server.pack(sample))),JSON.stringify(sample));checks++;
assert.equal(server.sameOrigin(new Request('http://localhost/api',{headers:{origin:'https://other.example'}})),false);checks++;
assert.equal(server.sameOrigin(new Request('http://localhost/api',{headers:{origin:'http://localhost'}})),true);checks++;
const request=new Request('http://localhost/api');assert.equal(server.allowRequest(request,'test',1),true);assert.equal(server.allowRequest(request,'test',1),false);checks++;
const absent=load('lib/firebase.ts',{process:{env:{}}});
assert.equal(absent.firebaseConfigured,false);assert.equal(absent.app,null);assert.equal(absent.auth,null);assert.equal(absent.db,null);checks++;
const partial=load('lib/firebase.ts',{process:{env:{NEXT_PUBLIC_FIREBASE_PROJECT_ID:'test-project'}}});assert.equal(partial.firebaseConfigured,false);checks++;
let initialized=0;
const configured=load('lib/firebase.ts',{process:{env:{NEXT_PUBLIC_FIREBASE_API_KEY:'test-key',NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:'test.example',NEXT_PUBLIC_FIREBASE_PROJECT_ID:'test-project',NEXT_PUBLIC_FIREBASE_APP_ID:'test-app'}},require:name=>name==='firebase/app'?{getApps:()=>[],getApp:()=>({}),initializeApp:()=>{initialized++;return {name:'test'};}}:name==='firebase/auth'?{getAuth:()=>({name:'auth'})}:name==='firebase/firestore'?{getFirestore:()=>({name:'database'})}:require(name)});
assert.equal(configured.firebaseConfigured,true);assert.equal(initialized,1);assert.equal(configured.auth.name,'auth');assert.equal(configured.db.name,'database');checks++;
console.log(`${checks} CMS checks passed: defaults, validation, unsafe links, duplicate slugs, Firestore encoding, origin and rate limits.`);
