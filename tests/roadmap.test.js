const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('index.html','utf8');
function extract(name,next){const m=html.match(new RegExp(`const ${name}=([\\s\\S]*?);\\nconst ${next}=`));assert(m,`Could not extract ${name}`);return vm.runInNewContext('('+m[1]+')')}
const ages=extract('ages','domains'),domains=extract('domains','mediaGuide'),mediaGuide=extract('mediaGuide','mediaTiers'),mediaTiers=extract('mediaTiers','principles'),principles=extract('principles','items'),items=extract('items','readiness');
const rm=html.match(/const readiness=([\s\S]*?);\nlet tab=/);assert(rm,'Could not extract readiness');const readiness=vm.runInNewContext('('+rm[1]+')');
assert.deepStrictEqual(Array.from(ages),['0–1','1–3','3–5','5–8','8–12','12–15','15–18']);
assert.equal(domains.length,13);assert(principles.length>=15);
assert(items.filter(x=>x[0]==='0–1').every(x=>x[3]==='Agreed'),'Every current 0–1 item should be Agreed');
assert(/tab==="By Domain"[\s\S]*?items\.filter\(x=>x\[1\]===d/.test(html),'By Domain must filter only on domain');
assert(/tab==="By Age"[\s\S]*?items\.filter\(x=>x\[0\]===a/.test(html),'By Age must filter only on age');
assert(/function filt\(\)[\s\S]*?x\[0\]===a&&x\[1\]===d/.test(html),'Drilldown must use age × domain intersection');
for(const a of ages)assert(items.some(x=>x[0]===a),`No roadmap items for age ${a}`);for(const d of domains)assert(items.some(x=>x[1]===d),`No roadmap items for domain ${d}`);
for(const key of Object.keys(readiness)){const [a,d]=key.split('|');assert(ages.includes(a),`Bad readiness age ${a}`);assert(domains.includes(d),`Bad readiness domain ${d}`);assert.equal(readiness[key].length,4,`${key} should have four readiness sections`)}
assert(readiness['0–1|Technology']);assert(/not applicable as (?:a )?competence goal/i.test(readiness['0–1|Technology'][0][1]));
assert(html.includes('Family principles <span class="pill">Agreed</span>'));
assert(html.includes('DRAFT 0.9')&&html.includes('Draft 0.9'),'Version labels should be 0.9');assert(html.includes('"Media Guide"'));
for(const a of ages){assert(mediaGuide[a],`No Media Guide for age ${a}`);for(const k of ['Read aloud','Games','Shows','Movies']){assert(mediaGuide[a][k],`No ${k} guide for ${a}`);assert.equal(mediaGuide[a][k].length,3)}}
assert.deepStrictEqual(Array.from(mediaTiers,x=>x[0]),['S','A','B','C','D','F']);for(const row of mediaTiers){assert.equal(row.length,4);assert(row[2].length>30&&row[3].length>30)}
assert(html.includes('We tier activities, not franchises.'));assert(html.includes('Zelda'));assert(html.includes('Mario Kart'));assert(html.includes('Metroid'));assert(html.includes('mediaView'));
console.log(`PASS: ${items.length} roadmap items, ${Object.keys(readiness).length} readiness drilldowns, ${principles.length} principles, ${Object.keys(mediaGuide).length} media age bands, ${mediaTiers.length} media tiers.`);
