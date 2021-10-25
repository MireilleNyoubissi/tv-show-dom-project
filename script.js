//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
 
  // empty rootElem content to clear the page.
    rootElem.textContent = "";
  
  // loop through the episodeList to create each episode cart using html sample.
  episodeList.forEach(episode => {        
    rootElem.innerHTML += 
    `<div class = "cart">
     <h1> ${episode.name} - S${episode.season < 10? '0' + episode.season : episode.season}E${episode.number < 10? '0' + episode.number : episode.number}</h1>
     <img src= ${episode.image.medium}>
     <p>${episode.summary}</p>
     </div>`;      
  });
  
  let form = document.getElementById("search-form");
  let searchBtn = document.getElementById("input-search");
  form.appendChild(searchBtn);
  rootElem.appendChild(form);

}


window.onload = setup;
