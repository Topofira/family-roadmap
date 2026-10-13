const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('index.html','utf8');
function extract(name,next){const m=html.match(new RegExp(`const ${name}=([\\s\\S]*?);\\nconst ${next}=`));assert(m,`Could not extract ${name}`);return vm.runInNewContext('('+m[1]+')')}
const ages=extract('ages','domains'),domains=extract('domains','mediaGuide'),mediaGuide=extract('mediaGuide','mediaTiers'),mediaTiers=extract('mediaTiers','principles'),principles=extract('principles','items'),items=extract('items','readiness');
const rm=html.match(/const readiness=([\s\S]*?);\nlet tab=/);assert(rm,'Could not extract readiness');const readiness=vm.runInNewContext('('+rm[1]+')');
assert.deepStrictEqual(Array.from(ages),['0–1','1–3','3–5','5–8','8–12','12–15','15–18']);assert.equal(domains.length,13);assert(principles.length>=15);
assert(items.filter(x=>x[0]==='0–1').every(x=>x[3]==='Agreed'));
assert(/tab==="By Domain"[\s\S]*?items\.filter\(x=>x\[1\]===d/.test(html));assert(/tab==="By Age"[\s\S]*?items\.filter\(x=>x\[0\]===a/.test(html));assert(/function filt\(\)[\s\S]*?x\[0\]===a&&x\[1\]===d/.test(html));
for(const a of ages)assert(items.some(x=>x[0]===a));for(const d of domains)assert(items.some(x=>x[1]===d));for(const key of Object.keys(readiness)){const [a,d]=key.split('|');assert(ages.includes(a));assert(domains.includes(d));assert.equal(readiness[key].length,4)}
assert(readiness['0–1|Technology']);assert(/not applicable as (?:a )?competence goal/i.test(readiness['0–1|Technology'][0][1]));assert(html.includes('Family principles <span class="pill">Agreed</span>'));
assert(html.includes('DRAFT 0.10')&&html.includes('Draft 0.10'),'Version labels should be 0.10');assert(html.includes('"Media Guide"'));
for(const a of ages){assert(mediaGuide[a]);for(const k of ['Read aloud','Games','Shows','Movies']){assert(mediaGuide[a][k]);assert.equal(mediaGuide[a][k].length,3)}}assert.deepStrictEqual(Array.from(mediaTiers,x=>x[0]),['S','A','B','C','D','F']);
for(const d of domains){assert(items.some(x=>x[0]==='1–3'&&x[1]===d),`1–3 missing roadmap card: ${d}`);assert(readiness[`1–3|${d}`],`1–3 missing drilldown: ${d}`);assert.equal(readiness[`1–3|${d}`].length,4)}
assert(html.includes('v1-3-complete'));console.log(`PASS: complete 1–3 matrix; ${items.length} roadmap items, ${Object.keys(readiness).length} readiness drilldowns.`);
