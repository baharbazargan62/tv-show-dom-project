// You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
function makePageForEpisodes(episodeList) {
  const divEl = document.getElementById("root");
  const sectionEl = document.getElementById("main-page");
  divEl.appendChild(sectionEl);
  //search bar
  const selectEl=document.querySelector("#select-option");
  const searchInput=document.querySelector("#search-input")
   for(let episode of episodeList) {
    const optionEl=document.createElement("option");
    selectEl.appendChild(optionEl);
    optionEl.innerText=episode.season.toString().padStart(3,"S0")+episode.number.toString().padStart(3,"E0")+"-"+episode.name
    const articleEl = document.createElement("article");
    articleEl.setAttribute("class","each-film")
    const h3 = document.createElement("h3");
    h3.setAttribute("class","header")
    const image = document.createElement("img");
    let pragragh = document.createElement("p");
    sectionEl.appendChild(articleEl);
    articleEl.appendChild(h3);
    articleEl.appendChild(image);
    articleEl.appendChild(pragragh);
    h3.innerText = episode.name+"-"+episode.season.toString().padStart(3,"S0")+episode.number.toString().padStart(3,"E0")
    image.src = episode.image.medium;
    pragragh.innerHTML = episode.summary;
     }
     let spanEl=document.getElementById("count-epispde");
     searchInput.addEventListener('input',checkMatchEpisode)
     function checkMatchEpisode(){
       let matchList=episodeList.filter(episode=>{return (episode.name.toLowerCase().includes(searchInput.value.toLowerCase())||episode.summary.toLowerCase().includes(searchInput.value.toLowerCase()))
       })
       spanEl.innerText=matchList.length +' / '+ episodeList.length
     }
  let footer=document.createElement("footer")
  let link=document.createElement("a")
  link.setAttribute("href","https://www.tvmaze.com/")
  link.innerText="TVMaze.com"
  divEl.appendChild(footer)
  footer.appendChild(link)
};

window.onload = setup;





