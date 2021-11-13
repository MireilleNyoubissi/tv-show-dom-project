const showsView = document.getElementById('showsView');
const searchBar_input = document.getElementById('input-search');
const select_show = document.getElementById('shows-select');
const select_episode = document.getElementById('episode-select');
const episodesView = document.getElementById('episodesView');


//Create a setup function on window.onload
function setup() {
  let allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  
  //This function adds an EventListener on keyup to the search bar in order to display filtered cards.
  searchBar_input.addEventListener('keyup', (e) => {
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

  // This function add an EventListener on episode input to scroll into view of that selected episode.
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

  //This function add an EventListener on show change to fetch the episodes list of that selected show.
  select_show.addEventListener('change', (e) => {
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

//This function set the episodes page on set up.
function makePageForEpisodes(episodeList) {
  //generate episode count display
  const episode_count = document.getElementById('episode-count');
  episode_count.textContent = `Displaying ${episodeList.length} episodes`;

  // empty showsView content to clear the page.
  showsView.textContent = '';
  populateSelectEpisodeBar(episodeList);
  createCards(episodeList);
}

//This function creates each card displayed in the viewport.
function createCards(episodeList) {
  episodeList.forEach((episode) => {
    showsView.innerHTML += `<div  id = "${episode.id}" class = "card show">
     <h1> ${episode.name} - S${
      episode.season < 10 ? '0' + episode.season : episode.season
    }E${episode.number < 10 ? '0' + episode.number : episode.number}</h1>
     <img src= ${episode.image.medium}>
     ${episode.summary}
     </div>`;
  });
}

//This function populate the episodes bar with a list of episodes.
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

//This function populate the episode bar
function populateSelectEpisodeBar(episodeList) {
  select_episode.innerText = '';
  episodeList.forEach((episode) => {
    select_episode.innerHTML += `<option value="${episode.id}">S${
      episode.season < 10 ? '0' + episode.season : episode.season
    }E${episode.number < 10 ? '0' + episode.number : episode.number} - ${
      episode.name
    }</option>`;
  });
}

// This function display the show list on API call.

async function displayShowList() {
  const response = await fetch('https://api.tvmaze.com/shows');
  const allShowsList = await response.json();
  select_show.innerHTML = populateShows(allShowsList);
}

// The function populate the show bar

function populateShows(shows) {
  let selected_show = '';
  for (let i = 0; i < shows.length; i++) {
    selected_show += `<option value = "${shows[i].id}">${shows[i].name}</option>`;
  }
  return selected_show;
}

displayShowList();

window.onload = setup;
