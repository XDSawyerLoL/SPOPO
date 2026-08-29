
const palette=[
["#1e2b2a","#0b1015"],["#2e1f24","#0a0d12"],["#17253a","#080b11"],["#322713","#0e1012"],
["#202031","#090b12"],["#153028","#070d0d"],["#342026","#0a0c12"],["#192b34","#090c11"],
["#2f2636","#090b10"],["#25301b","#080c0a"]
];
let films=[], activeGenre="Tous", activeView="home";
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
function hash(s){let h=0;for(const c of s)h=((h<<5)-h)+c.charCodeAt(0)|0;return Math.abs(h)}
function colors(f){return palette[hash(f.title)%palette.length]}
function card(f,compact=false){
 const [c1,c2]=colors(f);
 const el=document.createElement("article");el.className="card";el.tabIndex=0;
 el.innerHTML=`<div class="poster" style="--c1:${c1};--c2:${c2}">
 ${f.trend?`<span class="rank">#${f.trend}</span>`:""}
 <span class="poster-letter">${f.title.replace(/[^A-Za-zÀ-ÿ0-9]/g,"").slice(0,1).toUpperCase()||"S"}</span>
 <div class="poster-content"><div class="poster-title">${escapeHtml(f.title)}</div><div class="poster-meta">${f.year} · ${escapeHtml(f.genre)}</div></div></div>
 ${compact?"":`<div class="card-info"><strong>${escapeHtml(f.title)}</strong><span>${f.year} · ${escapeHtml(f.genre)}</span></div>`}`;
 el.addEventListener("click",()=>openFilm(f));el.addEventListener("keydown",e=>{if(e.key==="Enter")openFilm(f)});return el
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function fill(id,list,limit=14){const box=$(id);box.innerHTML="";list.slice(0,limit).forEach(f=>box.appendChild(card(f,true)))}
function trendItem(f){
 const el=document.createElement("div");el.className="trend-item";el.innerHTML=`<span class="trend-num">${String(f.trend).padStart(2,"0")}</span><div class="trend-copy"><strong>${escapeHtml(f.title)}</strong><span>${f.year} · ${escapeHtml(f.genre)}</span></div>`;el.onclick=()=>openFilm(f);return el
}
function renderTrends(){
 const box=$("#trendGrid");box.innerHTML="";
 films.filter(f=>f.trend).sort((a,b)=>a.trend-b.trend).forEach(f=>box.appendChild(trendItem(f)))
}
function renderCatalogue(){
 const q=$("#search").value.trim().toLocaleLowerCase("fr");
 let list=films.filter(f=>(activeGenre==="Tous"||f.genre===activeGenre)&&(!q||(`${f.title} ${f.genre} ${f.year}`).toLocaleLowerCase("fr").includes(q)));
 if(activeView==="trends") list=list.filter(f=>f.trend).sort((a,b)=>a.trend-b.trend);
 const box=$("#catalogueGrid");box.innerHTML="";list.forEach(f=>box.appendChild(card(f)));
 $("#resultCount").textContent=`${list.length} titre${list.length>1?"s":""}`;
 $("#catalogueTitle").textContent=activeView==="trends"?"Tendances":activeGenre==="Tous"?"Explorer le catalogue":activeGenre;
 $("#catalogueMicro").textContent=activeView==="trends"?"TOP SOPONOV":activeGenre==="Tous"?"TOUT SOPONOV":"GENRE";
}
function setupGenres(){
 const genres=["Tous","À l'affiche","Action","Animation","Aventure","Comédie","Drame","Fantastique","Horreur","Policier","Science-Fiction","Thriller","Documentaire","Spectacle"];
 const chips=$("#chips"),panel=$("#genreList");
 genres.forEach(g=>{
   const b=document.createElement("button");b.textContent=g;b.dataset.genre=g;if(g==="Tous")b.classList.add("active");b.onclick=()=>setGenre(g);chips.appendChild(b);
   if(g!=="Tous"){const p=b.cloneNode(true);p.onclick=()=>{setGenre(g);closeGenres()};panel.appendChild(p)}
 })
}
function setGenre(g){
 activeGenre=g;activeView="catalogue";$$("[data-genre]").forEach(()=>{});
 $$("#chips button").forEach(b=>b.classList.toggle("active",b.dataset.genre===g));
 renderCatalogue();$("#catalogueSection").scrollIntoView({behavior:"smooth"});
 history.replaceState(null,"",g==="Tous"?"#catalogue":"#genre-"+encodeURIComponent(g))
}
function setView(v){
 activeView=v;if(v==="home"){window.scrollTo({top:0,behavior:"smooth"});return}
 if(v==="catalogue")activeGenre="Tous";
 renderCatalogue();$("#catalogueSection").scrollIntoView({behavior:"smooth"});history.replaceState(null,"","#"+v)
}
function openFilm(f){
 const [c1,c2]=colors(f);$("#modalPoster").style.background=`linear-gradient(145deg,${c1},${c2})`;
 $("#modalTitle").textContent=f.title;$("#modalGenre").textContent=f.genre.toUpperCase();$("#modalMeta").textContent=`${f.year}${f.trend?" · Tendance #"+f.trend:""}`;
 $("#modal").classList.add("open");$("#modal").setAttribute("aria-hidden","false")
}
function closeModal(){$("#modal").classList.remove("open");$("#modal").setAttribute("aria-hidden","true")}
function openGenres(){$("#genresPanel").classList.add("open");$("#scrim").classList.add("open");$("#genresPanel").setAttribute("aria-hidden","false")}
function closeGenres(){$("#genresPanel").classList.remove("open");$("#scrim").classList.remove("open");$("#genresPanel").setAttribute("aria-hidden","true")}
async function init(){
 films=await fetch("/data/catalog.json").then(r=>r.json());
 fill("#latestRail",films.filter(f=>f.recent).concat(films.filter(f=>!f.recent)),15);
 fill("#featuredRail",films.filter(f=>f.genre==="À l'affiche"),18);
 fill("#animationRail",films.filter(f=>f.genre==="Animation"),18);
 fill("#docsRail",films.filter(f=>["Documentaire","Spectacle"].includes(f.genre)),18);
 renderTrends();setupGenres();renderCatalogue();
 $$("[data-view]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();setView(el.dataset.view)}));
 $$("[data-genre]").forEach(el=>el.addEventListener("click",()=>setGenre(el.dataset.genre)));
 $("#search").addEventListener("input",()=>{activeView="catalogue";activeGenre="Tous";renderCatalogue();$("#catalogueSection").scrollIntoView({behavior:"smooth",block:"start"})});
 document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#search").focus()}if(e.key==="Escape"){closeModal();closeGenres()}});
 $("#menuBtn").onclick=openGenres;$("#closeGenres").onclick=closeGenres;$("#scrim").onclick=closeGenres;$("#modalClose").onclick=closeModal;$("#modal").addEventListener("click",e=>{if(e.target===$("#modal"))closeModal()});
 const h=decodeURIComponent(location.hash);if(h==="#trends")setView("trends");else if(h.startsWith("#genre-"))setGenre(h.slice(7))
}
init();
