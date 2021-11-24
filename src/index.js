import axios from "axios";

const leagueList = document.querySelector("#league-info-cont-full");
const teamList = document.querySelector("#team-names-box");
const playerList = document.querySelector("#player-name-box");

let leagues;
let teams;
let selectedLeagueId;
let selectedTeamId;
let players;

const renderLeagues = () => {
  const html = leagues
    .map(
      (league) => `
    <div class="league-info-cont-single-border ${
      selectedLeagueId === league.id ? `selected` : ""
    }">
        <a href='#${league.id}'>
            <div class="league-info-cont-single">
                <img class="flag" src="public/${league.name}-flag.png" />
                <h4>${league.name}</h4>
                <img class="league-logo" src="public/${league.name}-logo.png" />
            </div>
        </a>
    </div>
`
    )
    .join("");

  leagueList.innerHTML = html;
};

const renderTeams = () => {
  const html = leagues
    .filter((league) => league.id === selectedLeagueId)
    .map(
      (league) => `
      <h1>Teams in the ${league.name}</h1>
          <div class="team-info-cont">
            <div class="name-cont">
              <h2>Team</h2>
              ${teams
                .filter((team) => team.leagueId === selectedLeagueId)
                .map(
                  (team) => `
                  <a href='#${league.id}/##${team.id}'><div class='${
                    selectedTeamId === team.id ? "selected1" : ""
                  }'>${team.name}</div></a>
                    `
                )
                .join("")}
              </div>
          </div>
      `
    )
    .join("");

  teamList.innerHTML = html;
  renderLeagues();
};

const renderPlayers = () => {
  const html = teams
    .filter((team) => team.id === selectedTeamId)
    .map(
      (team) => `
        <h1>${team.name} Players</h1>
          <div class="input-name-cont">
            <input id='add-player-name' placeholder='insert name'>
          </div>
          <div class="button-cont">
            <button id='add'>Add A Player</button>
          </div>
          <div class="player-info-cont">
            <div class="player-name-cont">
              <h2>Name</h2>
                ${players
                  .filter((player) => selectedTeamId === player.teamId)
                  .map(
                    (player) => `
                <div>
                ${player.name}
                <button id='delete' player-id='${player.id}'>delete</button>
              </div>
                `
                  )
                  .join("")}
            </div>
          </div>
      `
    )
    .join("");

  playerList.innerHTML = html;

  renderLeagues();
  renderTeams();
};

window.addEventListener("hashchange", async () => {
  const hashChangeInfo = window.location.hash.split(`/`);

  if (hashChangeInfo.length === 1) {
    selectedLeagueId = window.location.hash.slice(1);
    selectedTeamId = null;
    renderTeams();
  } else {
    selectedTeamId = hashChangeInfo[1].slice(2);
    renderPlayers();
  }
});

playerList.addEventListener("click", async (ev) => {
  try {
    const target = ev.target;
    const leagueId = window.location.hash.split(`/`)[0].slice(1);
    const teamId = window.location.hash.split(`/`)[1].slice(2);

    const name = document.getElementById("add-player-name").value;

    if (target.tagName === "BUTTON" && target.id === "add") {
      const player = {
        name,
        teamId,
      };

      (await axios.post(`/${leagueId}/${teamId}/players`, player)).data;
      players = (await axios.get(`/leagues/teams/players`)).data;

      renderPlayers();
    }

    if (target.tagName === "BUTTON" && target.id === "delete") {
      const playerId = target.getAttribute("player-id");

      (await axios.delete(`/${leagueId}/${teamId}/${playerId}`)).data;
      players = (await axios.get(`/leagues/teams/players`)).data;

      renderPlayers();
    }
  } catch (err) {
    console.log(err);
  }

  // renderLeagues();
  // renderTeams();
});

const fetchPlayers = async () => {};

const init = async () => {
  try {
    leagues = (await axios.get(`/leagues`)).data;
    teams = (await axios.get(`/leagues/teams`)).data;
    players = (await axios.get(`/leagues/teams/players`)).data;

    renderLeagues();
  } catch (err) {
    console.log(err);
  }
};

init();
