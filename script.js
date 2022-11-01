// You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
window.onload = () => {
  const divEl = document.getElementById("root");
  const sectionEl = document.getElementById("main-page");
  const episodes = getAllEpisodes();
  divEl.appendChild(sectionEl);
   for(let episode of episodes) {
    const articleEl = document.createElement("article");
    const h3 = document.createElement("h3");
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
  let footer=document.createElement("footer")
  let link=document.createElement("a")
  link.setAttribute("href","https://www.tvmaze.com/")
  link.innerText="TVMaze.com"
  divEl.appendChild(footer)
  footer.appendChild(link)
}



