import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {createApplication} from '../../rillvane-protocol/backend/server.mjs';
test('standalone workspace serves at root with same-origin API and assets',async t=>{
 const app=createApplication({dbPath:':memory:',keys:null,workerEnabled:false,siteMode:'app',staticRoot:fileURLToPath(new URL('../dist',import.meta.url))});
 await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));t.after(()=>app.close());
 const origin='http://127.0.0.1:'+app.server.address().port;
 const response=await fetch(origin+'/'),html=await response.text();assert.equal(response.status,200);assert.match(html,/id="main-content"/);assert.match(html,/id="app-loader"/);assert.doesNotMatch(html,/id="landscape"/);
 for(const file of ['/workspace.js','/app-loading.js','/app-loading.css','/site-links.js','/assets/brand-mark.svg','/assets/fonts/manrope-latin.woff2','/assets/landscape/landing-valley-v2.webp'])assert.equal((await fetch(origin+file)).status,200,file);
 assert.equal((await fetch(origin+'/api/health')).status,200);
 assert.equal((await fetch(origin+'/api/account')).status,401);
 const old=await fetch(origin+'/app/?ref=test',{redirect:'manual'});assert.equal(old.status,308);assert.equal(old.headers.get('location'),'/?ref=test');
});
