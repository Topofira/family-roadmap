const fs=require('fs');
const p='index.html'; let s=fs.readFileSync(p,'utf8');
if(s.includes('const mediaTiers=')){console.log('Media tiers already installed');process.exit(0)}
s=s.replaceAll('Draft 0.8','Draft 0.9').replaceAll('DRAFT 0.8','DRAFT 0.9');
const marker='const principles=[';
const data=`const mediaTiers=[
["S","Encourage","Activities we would actively like childhood to contain often: relationship, creativity, agency, sustained attention or real-world engagement.","Reading together; parent read-alouds; couch co-op with Dad/siblings; Minecraft Creative/building; creating art/music/stories; making things; family board games; media that becomes shared family culture."],
["A","Good","Genuinely worthwhile leisure. No need to justify it as educational; it tends to involve mastery, thought, story, exploration or quality shared experience.","Independent reading; Zelda; strategy games; puzzle games; Metroid; Mario platformers; Pokémon; story-rich RPGs; excellent family films such as Ghibli; thoughtful documentaries and selected shows."],
["B","Fine","Ordinary entertainment. Enjoyable and not concerning in a healthy mix, but we do not need to manufacture more of it.","Mario Kart or Smash played casually/solo; straightforward action games; silly movies; ordinary TV; non-manipulative casual/mobile games; intentional YouTube videos chosen for a reason."],
["C","Limit","Can be fine in moderation, but often displaces richer activities or contains design patterns that make stopping harder.","Lots of passive viewing; repetitive low-quality kids media; grind-heavy live-service games; autoplay-heavy video; habitual background screens; watching other people play games for long stretches instead of playing/creating."],
["D","Discourage","The product is substantially optimized around capturing attention, compulsion, FOMO or monetization rather than providing a bounded experience.","Algorithmic short-form feeds; endless content sludge; manipulative free-to-play loops; child-targeted gacha/FOMO systems; habitual doomscrolling; personalized feeds designed to keep going indefinitely."],
["F","Avoid","Meaningfully harmful, exploitative or developmentally inappropriate rather than merely low-value entertainment.","Pornographic/explicit sexual material; real-money gambling; predatory online spaces; seriously age-inappropriate graphic content; exploitative monetization involving real gambling-like stakes."]
];
`;
if(!s.includes(marker))throw new Error('principles marker missing'); s=s.replace(marker,data+marker);
const old=`if(tab==="Media Guide"){
  ageControl.style.display=""; domainControl.style.display="none"; search.style.display="none";
  const guide=mediaGuide[a];
  content.innerHTML='<div class="section"><h2>Media Guide — '+a+'</h2><p class="sub">Examples, not a curriculum. Age is a starting point; comprehension, emotional maturity, motor skill, frustration tolerance and family context can move different media at different speeds.</p></div>'+Object.entries(guide).map(([kind,rows])=>'<div class="section"><h2>'+kind+'</h2><div class="grid">'+rows.map(([level,text])=>'<div class="card '+(level==='Great now'?'now':level==='Stretch together'?'soon':'later')+'"><div class="meta">'+level+'</div><p>'+text+'</p></div>').join('')+'</div></div>').join('');
  return;
}`;
const neu=`if(tab==="Media Guide"){
  domainControl.style.display="none"; search.style.display="none";
  const view=localStorage.getItem("mediaView")||"age";
  ageControl.style.display=view==="age"?"":"none";
  const switcher='<div class="controls"><button id="mediaAge" class="'+(view==='age'?'active':'')+'">Age Guide</button><button id="mediaTier" class="'+(view==='tiers'?'active':'')+'">Media Tiers</button></div>';
  if(view==="tiers"){
    content.innerHTML=switcher+'<div class="section"><h2>Media Tiers</h2><p class="sub"><strong>We tier activities, not franchises.</strong> Content, context, child and usage can move the same media up or down. Social connection, creativity, agency, problem-solving, sustained attention, reading/narrative, mastery and meaningful choice tend to move an activity upward. Passivity, endlessness, algorithmic optimization, FOMO, compulsive rewards, monetization pressure and displacement of sleep/relationships/physical activity tend to move it downward.</p><p class="sub">Genre matters, but less than design and context: Zelda is typically richer than a straightforward action game, but a family Mario Kart tournament can be S-tier family time. A child who loves mastering Mario is not better served by being assigned a puzzle game merely because it looks educational.</p></div><div class="grid">'+mediaTiers.map(([tier,name,why,examples])=>'<div class="card"><h3>'+tier+' — '+name+'</h3><p>'+why+'</p><div class="meta">Examples</div><p>'+examples+'</p></div>').join('')+'</div>';
  } else {
    const guide=mediaGuide[a];
    content.innerHTML=switcher+'<div class="section"><h2>Media Guide — '+a+'</h2><p class="sub">Examples, not a curriculum. Age is a starting point; comprehension, emotional maturity, motor skill, frustration tolerance and family context can move different media at different speeds.</p></div>'+Object.entries(guide).map(([kind,rows])=>'<div class="section"><h2>'+kind+'</h2><div class="grid">'+rows.map(([level,text])=>'<div class="card '+(level==='Great now'?'now':level==='Stretch together'?'soon':'later')+'"><div class="meta">'+level+'</div><p>'+text+'</p></div>').join('')+'</div></div>').join('');
  }
  document.getElementById("mediaAge").onclick=()=>{localStorage.setItem("mediaView","age");render()};
  document.getElementById("mediaTier").onclick=()=>{localStorage.setItem("mediaView","tiers");render()};
  return;
}`;
if(!s.includes(old))throw new Error('media render block missing'); s=s.replace(old,neu);
fs.writeFileSync(p,s); console.log('Updated roadmap to v0.9 with media tiers');
