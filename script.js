const episode_count = document.getElementById('episode-count');
const showsView = document.getElementById('showsView');
const input_search = document.getElementById('input-search');
const show_select = document.getElementById('shows-select');
const select_episode = document.getElementById('episode-select');
const episodesView = document.getElementById('episodesView');
const backToShowBtn = document.getElementById('backtoshows');
backToShowBtn.style.display = "none";

function setup() {
  let allEpisodes = getAllShows();
  makePageForEpisodes(allEpisodes);
  const shows = document.querySelectorAll(".show")
  backToShowBtn.addEventListener("click", () => {
    showsView.style.display = 'block';
    episodesView.style.display = 'none';
    backToShowBtn.style.display = 'none';

  })

  shows.forEach(show => {
    show.addEventListener("click", () => {

        async function fetchEpisodesList() {
        const response = await fetch(
          `https://api.tvmaze.com/shows/${show.id}/episodes`
        );
        allEpisodes = await response.json();
          let episodeViewContent = "";
          allEpisodes.forEach(v => {
            episodeViewContent +=`<div>${v.name}</div>`
          })
        episodesView.innerHTML = episodeViewContent;
        showsView.style.display = "none";
        episodesView.style.display = 'block';
        backToShowBtn.style.display = 'block';

      }  
      fetchEpisodesList();   
    })

  })
    
    
  
  //getAllEpisodes();
  //getAllShows();

  // addEventListener on input to scroll into view
  select_episode.addEventListener('input', (e) => {
    e.preventDefault();

    let cards = document.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      if (card.id == e.target.value) {
        card.scrollIntoView();
      }
    }
  });

  // addEventListener to search input on keyup.
  input_search.addEventListener('keyup', (e) => {
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

  //addEventListener to fetch episode list on show change
  show_select.addEventListener('change', (e) => {
    e.preventDefault();

    let showId = e.currentTarget.value;

    async function displayEpisodesList() {
      const response = await fetch(
        `https://api.tvmaze.com/shows/${showId}/episodes`
      );
      allEpisodes = await response.json();
      select_episode.innerHTML = populateEpisodes(allEpisodes);
      makePageForEpisodes(allEpisodes);
    }

    displayEpisodesList();
  });


}

function makePageForEpisodes(episodeList) {

  // empty showsView content to clear the page.
  showsView.textContent = '';

  //generate episode count display
 // episode_count.textContent = `Displaying ${episodeList.length}/ ${episodeList.length} episodes`;

  // loop through the episodeList to create each episode card using html sample.

  episodeList.forEach((episode) => {
    showsView.innerHTML += `<div id = "${episode.id}" class = "card show">
     <h1> ${episode.name} - S${
      episode.season < 10 ? '0' + episode.season : episode.season
    }E${episode.number < 10 ? '0' + episode.number : episode.number}</h1>   
   
     
     </div>`;
  });
}

// <div id = "card2">rated: ${episode.rating.average} <br> runtime: ${
//       episode.runtime
//     } <br> status: ${episode.status}</div>
//     </div>
//  <img src= ${episode.image.medium}>
//<div id = "card1">
//${episode.summary}

// create the select bar with episodes names options

// function populateEpisodeList(episodeList) {
// select_episode.innerText = "";
//     episodeList.forEach(episode => {
//       select_episode.innerHTML += `<option value="${episode.id}">S${
//         episode.season < 10 ? "0" + episode.season : episode.season
//       }E${episode.number < 10 ? "0" + episode.number : episode.number} - ${
//         episode.name
//       }</option>`;
//     })
// }

// fetching the list of episodes

// function getEpisodesList(){
//   fetch("https://api.tvmaze.com/shows/82/episodes")
//   .then(res => res.json())
//   .then(data => {

//     let episode = "";
//     for(let i = 0; i < data.length; i++){
//        episode += `
//        <option>S${data[i].season < 10 ? "0" + data[i].season : data[i].season}
//       E${data[i].number < 10 ? "0" + data[i].number : data[i].number} - ${data[i].name}
//       </option>`;
//     }
//     document.getElementById("episode-select").innerHTML = `<option>Search Episode...</option> ${episode}`;
//   });

// }

//populate episodes
function populateEpisodes(episodeList) {
  let selected_episode = '';
  for (let i = 0; i < episodeList.length; i++) {
    selected_episode += `
       <option value = ${episodeList[i].id}>S${
         episodeList[i].season < 10
           ? '0' + episodeList[i].season
           : episodeList[i].season
       }
      E${
        episodeList[i].number < 10
          ? '0' + episodeList[i].number
          : episodeList[i].number
      } - ${episodeList[i].name}
      </option>`;
  }
  return selected_episode;
}

// display show

async function displayShowList() {
  const response = await fetch('https://api.tvmaze.com/shows');
  const allShowsList = await response.json();
  show_select.innerHTML =
    `<option value="" disabled selected>Select a show ...</option>` +
    populateShows(allShowsList);
}

// populate show

function populateShows(shows) {
  let selected_show = '';
  for (let i = 0; i < shows.length; i++) {
    selected_show += `<option value = "${shows[i].id}">${shows[i].name}</option>`;
  }
  return selected_show;
}

displayShowList();
window.onload = setup;
