// You can edit ALL of the code here
//You can edit ALL of the code here
// 
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById("root")
   const sectionEl=document.createElement('section')
   sectionEl.setAttribute('class','main')
    for(let episode of episodeList){
        const articleEl=document.createElement("article")
         const h3=document.createElement("h3")
         const image=document.createElement("img")
         let pragragh=document.createElement("p")
         sectionEl.appendChild(articleEl);
         articleEl.setAttribute('class','each-film')
        articleEl.appendChild(h3);
       articleEl.appendChild(image);
       articleEl.appendChild(pragragh);
        h3.innerText=episode.name+'-'+episode.season.toString().padStart(3,'S0')+episode.number.toString().padStart(3,'E0')
        image.src=episode.image.medium
        pragragh.innerHTML=episode.summary
 }
 rootElem.innerHTML='';
  rootElem.appendChild(sectionEl)
  }
  let input=document.getElementById('searchinput')
  input.addEventListener('keyup',(event)=>{
    let episodes=getAllEpisodes()
    const searchValue=event.target.value
     const filteredepisodes=episodes.filter(episode=>{return (episode.name.toLowerCase().includes(searchValue.toLowerCase())||episode.summary.toLowerCase().includes(searchValue.toLowerCase()))
    })
    let spanEl=document.getElementById('count-epispde')
     spanEl.innerText=filteredepisodes.length +' / '+ episodes.length
     makePageForEpisodes(filteredepisodes)
   })
   const selectedepisode=document.getElementById('secletedepisodes')
    episodes=getAllEpisodes()
  episodes.forEach(episode=>{
    let optionEl=document.createElement('option')
    selectedepisode.appendChild(optionEl)
    optionEl.setAttribute('value',episode.id)
    optionEl.innerText=episode.season.toString().padStart(3,"S0")+episode.number.toString().padStart(3,"E0")+"-"+episode.name
  })
  selectedepisode.addEventListener('change',()=>{
    let episodes=getAllEpisodes()
    // let e=optionEl.target.value
    episodes.forEach(episode=>{if(episode.id==event.target.value){
      makePageForEpisodes([episode])
    }
  })
  })
  let button=document.getElementById("make-allepisode");
  button.addEventListener("click",setup)
 window.onload = setup;





