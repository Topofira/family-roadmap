const fs=require('fs');
const p='index.html';
let s=fs.readFileSync(p,'utf8');
s=s.replace('<title>Family Development Roadmap — Draft 0.1</title>','<title>Family Development Roadmap — Draft 0.7</title>');
s=s.replace('<span class="pill">DRAFT 0.1</span>','<span class="pill">DRAFT 0.7</span>');
s=s.replace('Draft 0.6 •','Draft 0.7 •');
s=s.replace(/(\["0–1","[^"]+","[^"]+",)"Proposed"/g,'$1"Agreed"');
s=s.replace('<h2>Family principles</h2><div class="card">','<h2>Family principles <span class="pill">Agreed</span></h2><p class="sub">Mom and Dad aligned on these principles. They are the shared defaults for interpreting the roadmap, while the actual child and future circumstances still shape implementation.</p><div class="card">');
fs.writeFileSync(p,s);
