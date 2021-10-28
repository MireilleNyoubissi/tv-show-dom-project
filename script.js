//You can edit ALL of the code here
function setup() {
const allEpisodes = getAllEpisodes();
makePageForEpisodes(allEpisodes);
 
  
//Get the search input and the episode select  
const input_search = document.getElementById("input-search");
const select_episode = document.getElementById("episode-select");

 // addEventListener on input to scroll into view
  select_episode.addEventListener("input", (e) => {
  e.preventDefault();

  let carts = document.getElementsByClassName("cart");

    for(let i = 0; i < carts.length; i++) {
      let cart = carts[i];      
      if(cart.querySelectorAll("h1")[0].innerText === e.target.value) {
         cart.scrollIntoView();
      }    
    }
  })
  
// addEventListener to search input on keyup.
  input_search.addEventListener("keyup", (e) => {
    e.preventDefault();
    
    let filterValue = e.target.value.toLowerCase();

    makePageForEpisodes(
      allEpisodes.filter((episode) => {
        return (
          episode.name.toLowerCase().indexOf(filterValue) != -1 ||
          episode.summary.toLowerCase().indexOf(filterValue) != -1
        );
      })
    );
  });

}

function makePageForEpisodes(episodeList) {
const episode_count = document.getElementById("episode-count");
const rootElem = document.getElementById("root");
populateSelect(episodeList);
 
// empty rootElem content to clear the page.
rootElem.textContent = "";

//generate episode count display
episode_count.textContent = `Displaying ${episodeList.length}/73 episodes`;  
 
// loop through the episodeList to create each episode cart using html sample.
 
  episodeList.forEach(episode => {        
    rootElem.innerHTML += `<div class = "cart">
     <h1> ${episode.name} - S${
      episode.season < 10 ? "0" + episode.season : episode.season
    }E${episode.number < 10 ? "0" + episode.number : episode.number}</h1>
     <img src= ${episode.image.medium}>
     ${episode.summary}
     </div>`;      
  });
}  
//<option value="0">Select episode:</option>
 
// create the select bar with episodes names options

function populateSelect(episodeList) {    
select_episode = document.getElementById("episode-select");
select_episode.innerText = "";

    episodeList.forEach(episode => {
      select_episode.innerHTML += `<option value="${episode.name} - S${
        episode.season < 10 ? "0" + episode.season : episode.season
      }E${episode.number < 10 ? "0" + episode.number : episode.number}">S${
        episode.season < 10 ? "0" + episode.season : episode.season
      }E${episode.number < 10 ? "0" + episode.number : episode.number} - ${
        episode.name
      }</option>`;
    })
} 
  

window.onload = setup;
