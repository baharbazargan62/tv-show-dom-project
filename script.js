// You can edit ALL of the code here
//You can edit ALL of the code here
//
window.onload = setup;
let allShows = getAllShows().sort((a, b) => a.name.localeCompare(b.name));

function makePageForShows(shows){
  let allShows = getAllShows();
  let spanEpi=document.getElementById("span-epi")
  spanEpi.style.display="none";
  const sectionEl = document.createElement("section")
  sectionEl.setAttribute("class","show-section")
  rootElem.appendChild(sectionEl);
  allShows.sort((a, b) => a.name.localeCompare(b.name)).forEach(show=>{
  const articleEl=document.createElement("article");
  const sectionShow=document.createElement("section")
  const h3 = document.createElement("h3");
  const image = document.createElement("img");
  let pragragh = document.createElement("p");
  sectionEl.appendChild(articleEl);
  articleEl.setAttribute("class", "each-show");
  articleEl.setAttribute("id",show.id);
  articleEl.appendChild(h3);
  articleEl.appendChild(image);
  articleEl.appendChild(pragragh);
  h3.innerText=show.name;
  image.src=show.image?.medium;
  pragragh.innerHTML=show.summary.slice(0,200);
  let ul=document.createElement("ul");
  ul.setAttribute("class","ul-article");
  articleEl.appendChild(ul);
  let li1=document.createElement("li");
  let li2=document.createElement("li");
  let li3=document.createElement("li");
  let li4=document.createElement("li");
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  ul.appendChild(li4);
  li1.innerText=`Rated:${show.rating.average}`;
  li2.innerText=`Genres:${show.genres}`;
  li3.innerText=`Status:${show.status}`;
  li4.innerText=`Runtime:${show.runtime}`;
  articleEl.addEventListener("click",(()=>{
  getFetch(show.id)
  }))
 }
  )
 
}
function setup() {

  let allShows=getAllShows()
  makePageForShows(allShows);
  searchinputshow(allShows);
  selectedepisode.style.display="none"
  // input.style.display="none"

}
const selectedepisode = document.getElementById("secletedepisodes");
const rootElem = document.getElementById("root");

function getFetch(showid) {
  let url = `https://api.tvmaze.com/shows/${showid}/episodes`;
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      makePageForEpisodes(response);
      selectedepisode.style.display="inline"
      let input = document.getElementById("searchinput");
      input.addEventListener("keyup", (event) => {
        let episodes = response;
        const searchValue = event.target.value;
        const filteredepisodes = episodes.filter((episode) => {
          return (
            episode.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            episode.summary.toLowerCase().includes(searchValue.toLowerCase())
          );
        });
        let spanEl = document.getElementById("count-epispde");
        spanEl.innerText = filteredepisodes.length + " / " + episodes.length;
        makePageForEpisodes(filteredepisodes);
      });
      firstSelect(response);
    })
    .catch((error) => console.log(error));
}

function makePageForEpisodes(episodeList) {
  const sectionEl = document.createElement("section");
  sectionEl.setAttribute("class", "main");
  for (let episode of episodeList) {
    const articleEl = document.createElement("article");
    const h3 = document.createElement("h3");
    const image = document.createElement("img");
    let pragragh = document.createElement("p");
    sectionEl.appendChild(articleEl);
    articleEl.setAttribute("class", "each-film");
    articleEl.appendChild(h3);
    articleEl.appendChild(image);
    articleEl.appendChild(pragragh);
    h3.innerText =
      episode.name +
      "-" +
      episode.season.toString().padStart(3, "S0") +
      episode.number.toString().padStart(3, "E0");
    image.src = episode.image.medium;
    pragragh.innerHTML = episode.summary;
  }
  rootElem.innerHTML = "";
  rootElem.appendChild(sectionEl);
  let footer = document.createElement("footer");
  let link = document.createElement("a");
  link.setAttribute("href", "https://www.tvmaze.com/");
  link.innerText = "TVMaze.com";
  rootElem.appendChild(footer);
  footer.appendChild(link);
}
let showSelect = document.querySelector("#selectedshow");
allShows.forEach((show) => {
  const option = document.createElement("option"); // create option element for each ep and fill the select dropdown
  showSelect.appendChild(option);
  option.innerText = `${show.name}`;
  option.setAttribute("value", show.id);
});
showSelect.addEventListener("change", () => {
  allShows.forEach((show) => {
    let showid = event.target.value;
    console.log(showid);
    let url = `https://api.tvmaze.com/shows/${showid}/episodes`;
    getFetch(showid);
  });
});

// window.onload = setup;
function firstSelect(episodeList) {
  episodeList.forEach((episode) => {

    let optionEl = document.createElement("option");
    selectedepisode.appendChild(optionEl);
    optionEl.setAttribute("value", episode.id);
    optionEl.innerText =
      episode.season.toString().padStart(3, "S0") +
      episode.number.toString().padStart(3, "E0") +
      "-" +
      episode.name;
  });
  selectedepisode.addEventListener("change", (element, event) => {
    let episodes = episodeList;
    episodes.forEach((episode) => {
      if (episode.id == selectedepisode.value) {
        makePageForEpisodes([episode]);
      }
    });
  });
}
function searchinputshow(){
  let input = document.getElementById("searchinput");
  input.addEventListener("keyup", (event) => {
    allShows=getAllShows()
    const searchValue = event.target.value;
    const filtereShows = allShows.filter((allShow) => {
      return (
        allShow.name.toLowerCase().includes(searchValue.toLowerCase()) 
      );
    });
    let spanEl = document.getElementById("count-epispde");
    spanEl.innerText = filtereShows.length + " / " + allShows.length ;
    let spanEpi=document.getElementById("span-epi")
    spanEpi.style.display="none"
    makePageForShows(filtereShows);
  });
  }