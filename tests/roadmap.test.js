const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('index.html','utf8');
function extract(name,next){const m=html.match(new RegExp(`const ${name}=([\\s\\S]*?);\\nconst ${next}=`));assert(m,`Could not extract ${name}`);return vm.runInNewContext('('+m[1]+')')}
const ages=extract('ages','domains'),domains=extract('domains','principles'),principles=extract('principles','items'),items=extract('items','readiness');
const rm=html.match(/const readiness=([\s\S]*?);\nlet tab=/);assert(rm,'Could not extract readiness');const readiness=vm.runInNewContext('('+rm[1]+')');
assert.deepStrictEqual(Array.from(ages),['0–1','1–3','3–5','5–8','8–12','12–15','15–18']);
assert.equal(domains.length,13);assert(principles.length>=15);
assert(items.filter(x=>x[0]==='0–1').every(x=>x[3]==='Agreed'),'Every current 0–1 item should be Agreed');
assert(/tab==="By Domain"[\s\S]*?items\.filter\(x=>x\[1\]===d/.test(html),'By Domain must filter only on domain');
assert(/tab==="By Age"[\s\S]*?items\.filter\(x=>x\[0\]===a/.test(html),'By Age must filter only on age');
assert(/function filt\(\)[\s\S]*?x\[0\]===a&&x\[1\]===d/.test(html),'Drilldown must use age × domain intersection');
for(const a of ages)assert(items.some(x=>x[0]===a),`No roadmap items for age ${a}`);
for(const d of domains)assert(items.some(x=>x[1]===d),`No roadmap items for domain ${d}`);
for(const key of Object.keys(readiness)){const [a,d]=key.split('|');assert(ages.includes(a),`Bad readiness age ${a}`);assert(domains.includes(d),`Bad readiness domain ${d}`);assert.equal(readiness[key].length,4,`${key} should have four readiness sections`)}
assert(readiness['0–1|Technology'],'Infant technology drilldown must be explicit');
assert(/not applicable as (?:a )?competence goal/i.test(readiness['0–1|Technology'][0][1]),'Infant technology should be explicitly not applicable as a competence goal');
assert(html.includes('Family principles <span class="pill">Agreed</span>'),'Principles should display Agreed');
assert(html.includes('DRAFT 0.7')&&html.includes('Draft 0.7'),'Version labels should be 0.7');
console.log(`PASS: ${items.length} roadmap items, ${Object.keys(readiness).length} readiness drilldowns, ${principles.length} agreed principles.`);
