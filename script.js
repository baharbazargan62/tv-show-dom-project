// You can edit ALL of the code here
//You can edit ALL of the code here
//
let allShows = getAllShows();
console.log(allShows);
const selectedepisode = document.getElementById("secletedepisodes");

function getFetch(showid) {
  let url = `https://api.tvmaze.com/shows/${showid}/episodes`;
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      makePageForEpisodes(response);

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
      firstSelect(response)

      // let button = document.getElementById("make-allepisode");
      // button.addEventListener("click", setup);
    })
    .catch((error) => console.log(error));
}
function setup() {
  // const allEpisodes = getFetch();
  let allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  // firstSelect(allEpisodes);
}
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
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

window.onload = setup;
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
