const fs=require('fs');
const p='index.html';
let s=fs.readFileSync(p,'utf8');
if(s.includes('const mediaGuide=')){console.log('Media Guide already installed');process.exit(0)}
s=s.replaceAll('Draft 0.7','Draft 0.8').replaceAll('DRAFT 0.7','DRAFT 0.8');
s=s.replace('const principles=[',`const mediaGuide={
"0–1":{
"Read aloud":[["Great now","Board books, nursery rhymes, picture books, family photo books — repetition is a feature."],["Stretch together","Longer picture books when attention happens naturally; no need to finish."],["Save for later","Chapter-book progression is irrelevant; language and closeness are the point."]],
"Games":[["Great now","People games: peekaboo, songs, imitation, floor play."],["Stretch together","Watching family members play briefly is just family life, not a developmental goal."],["Save for later","No need for apps or video games as infant enrichment."]],
"Shows":[["Great now","Video calls with family are useful because the relationship is the point."],["Stretch together","Occasional shared family-screen moments need not be treated as a crisis."],["Save for later","Routine entertainment viewing is unnecessary in infancy."]],
"Movies":[["Great now","Not needed."],["Stretch together","Being present while the family watches something is different from programming a movie for the baby."],["Save for later","Family movie culture can wait."]]},
"1–3":{
"Read aloud":[["Great now","Picture books with strong language, rhythm and reread value; begin longer stories as attention grows."],["Stretch together","Winnie-the-Pooh and other episodic read-alouds can work surprisingly early with a child who enjoys listening."],["Save for later","Do not make chapter books a badge of advancement; pictures and repetition remain excellent."]],
"Games":[["Great now","Physical, pretend and simple tabletop play remain the main event."],["Stretch together","Around the upper end, very simple point-and-click or parent-driven games can be shared occasionally."],["Save for later","Independent app use and personal gaming devices."]],
"Shows":[["Great now","Short, calm, curated shared shows such as Mister Rogers, Sesame Street, Daniel Tiger or Bluey as family chooses."],["Stretch together","A familiar movie or longer program with a parent if attention and temperament fit."],["Save for later","Algorithmic feeds, autoplay habits and unsupervised browsing."]],
"Movies":[["Great now","At the upper end, gentle shared movies can begin."],["Stretch together","Ponyo or My Neighbor Totoro around 2.5–3 for a child comfortable with feature length and mild tension."],["Save for later","Intensity should track emotional readiness, not ability to sit still."]]},
"3–5":{
"Read aloud":[["Great now","Rich picture books plus sustained read-alouds; Winnie-the-Pooh and early chapter books can become staples."],["Stretch together","Narnia can begin toward the upper end for an interested listener, with Dad carrying vocabulary and context."],["Save for later","Independent reading level should not cap what the family reads aloud."]],
"Games":[["Great now","Putt-Putt, Freddi Fish and similar point-and-click adventures; Mario Kart with assists and simple co-op toward the upper end."],["Stretch together","Pajama Sam, Yoshi's Crafted World and other forgiving games with a parent."],["Save for later","Difficulty for difficulty's sake; frustration tolerance matters more than gamer credentials."]],
"Shows":[["Great now","Bluey, Mister Rogers, Daniel Tiger, Sesame Street, Numberblocks and other intentionally chosen family viewing."],["Stretch together","Wild Kratts or Magic School Bus when comprehension and interest fit."],["Save for later","Personal feeds and endless short-form video."]],
"Movies":[["Great now","Ponyo, Totoro and similarly gentle family films."],["Stretch together","Kiki's Delivery Service, The Cat Returns or Arrietty depending on attention and sensitivity."],["Save for later","More frightening Ghibli or action-heavy movies simply because other kids have seen them."]]},
"5–8":{
"Read aloud":[["Great now","Keep sophisticated parent read-alouds even as independent reading takes off: Narnia, The Hobbit and other family novels as interest fits."],["Stretch together","Books above independent reading level are often exactly what read-aloud is for; discuss difficult themes as they arise."],["Save for later","Do not equate decoding ability with emotional readiness for every older book."]],
"Games":[["Great now","Yoshi, Kirby, LEGO games, Mario Kart, Mario Wonder and other forgiving family/co-op games."],["Stretch together","Mario Odyssey, Captain Toad, Minecraft Creative, Pokémon or simple RPGs when reading, motor skill and frustration tolerance fit."],["Save for later","Online social ecosystems and monetized/algorithmic game loops do not need to arrive with gaming competence."]],
"Shows":[["Great now","Wild Kratts, Magic School Bus, Hilda and other high-quality chosen series; shared viewing remains valuable."],["Stretch together","Avatar or Pokémon depending on intensity, comprehension and family interest."],["Save for later","Unrestricted YouTube or individualized recommendation feeds."]],
"Movies":[["Great now","Kiki, Arrietty, Castle in the Sky and a growing range of family films."],["Stretch together","Spirited Away, Nausicaä or Howl when the child handles tension and ambiguity well."],["Save for later","Age ratings are inputs, not dares; emotional readiness still matters."]]},
"8–12":{
"Read aloud":[["Great now","Family read-aloud remains worthwhile even for excellent independent readers; increasingly complex fantasy, history, biography and classics can enter."],["Stretch together","Use shared reading for books whose ideas outrun independent comprehension, not just books the child cannot decode."],["Save for later","There is no developmental prize for ending read-aloud because the child can read alone."]],
"Games":[["Great now","Zelda, Minecraft Survival, harder Mario, Pokémon and increasingly substantial RPG/adventure games as interests emerge."],["Stretch together","More complex strategy or story-heavy games when systems, reading and themes fit; co-play can bridge difficulty."],["Save for later","Independent online communities require separate internet/judgment readiness."]],
"Shows":[["Great now","Broader family series and documentaries; selection can increasingly involve the child's taste."],["Stretch together","Older-skewing animation or serialized stories with discussion where themes are complex."],["Save for later","Algorithmic independence should not automatically follow content maturity."]],
"Movies":[["Great now","Spirited Away, Nausicaä, Howl and broader family/adventure films as temperament fits."],["Stretch together","More intense PG/PG-13 material can be a together decision based on the actual child."],["Save for later","Princess Mononoke and other substantially violent/mature works until themes and intensity fit."]]},
"12–15":{
"Read aloud":[["Great now","Shared books become optional family culture rather than instruction; recommendations and discussion matter more."],["Stretch together","Read the same novel separately and discuss it, or keep an occasional family read-aloud if everyone enjoys it."],["Save for later","Do not force childhood formats merely to preserve tradition."]],
"Games":[["Great now","Broader genres and deeper independent play; family couch multiplayer can remain part of family culture."],["Stretch together","Online play expands with demonstrated judgment, communication habits and family rules."],["Save for later","A mature game rating or peer access is not itself evidence of readiness."]],
"Shows":[["Great now","Increasingly self-chosen shows within family content boundaries; discuss rather than micromanage taste."],["Stretch together","More mature themes can be handled together when useful."],["Save for later","Private algorithmic feeds deserve a separate decision from ordinary TV maturity."]],
"Movies":[["Great now","Most mainstream family and teen films become ordinary choices."],["Stretch together","More mature films can be evaluated by violence, sexuality, themes and the actual teen rather than a single age cutoff."],["Save for later","Some adult material can simply remain adult material."]]},
"15–18":{
"Read aloud":[["Great now","Books are increasingly the teen's domain; family recommendations, shared favorites and discussion can continue naturally."],["Stretch together","Treat sophisticated literature as something to engage, not a maturity trophy."],["Save for later","Very little needs an age roadmap now; judgment and values dominate."]],
"Games":[["Great now","Near-adult autonomy in game choice, time management and communities, subject to household expectations."],["Stretch together","Use remaining restrictions to teach the reasoning that will replace them."],["Save for later","Anything still restricted should have an intelligible reason and an exit path."]],
"Shows":[["Great now","Near-adult media choice with family conversation and ordinary household norms."],["Stretch together","Talk about algorithms, persuasion, pornography, misinformation and attention as adult digital-life issues."],["Save for later","Surveillance should not substitute for judgment development."]],
"Movies":[["Great now","Near-adult choice; shared family movie culture can continue because it is enjoyable, not because Dad is curating childhood."],["Stretch together","Use genuinely difficult films as opportunities for conversation when wanted."],["Save for later","The roadmap should now be fading into personal judgment."]]}}
;
const principles=[`);
s=s.replace('const tabs=["Today","By Age","By Domain","Drilldown","Principles","Family Decisions"];','const tabs=["Today","By Age","By Domain","Drilldown","Media Guide","Principles","Family Decisions"];');
const marker=`if(tab==="Principles"){`;
const mediaRender=`if(tab==="Media Guide"){
  ageControl.style.display=""; domainControl.style.display="none"; search.style.display="none";
  const guide=mediaGuide[a];
  content.innerHTML='<div class="section"><h2>Media Guide — '+a+'</h2><p class="sub">Examples, not a curriculum. Age is a starting point; comprehension, emotional maturity, motor skill, frustration tolerance and family context can move different media at different speeds.</p></div>'+Object.entries(guide).map(([kind,rows])=>'<div class="section"><h2>'+kind+'</h2><div class="grid">'+rows.map(([level,text])=>'<div class="card '+(level==='Great now'?'now':level==='Stretch together'?'soon':'later')+'"><div class="meta">'+level+'</div><p>'+text+'</p></div>').join('')+'</div></div>').join('');
  return;
}
`;
if(!s.includes(marker)) throw new Error('Principles render marker missing');
s=s.replace(marker,mediaRender+marker);
fs.writeFileSync(p,s);
console.log('Updated roadmap to v0.8 with Media Guide');
