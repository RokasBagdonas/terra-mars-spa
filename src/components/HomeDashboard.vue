<template>
  <section class="hero">
    <div class="hero-body box content">
      <h3>Website for recording and tracking your
      <a
        class="link has-text-primary"
        href="https://www.fryxgames.se/games/terraforming-mars/"
        >Terraforming Mars</a
      >
      games!
      </h3>
      How to use it:
      <ul>
        <li>Register as a player in Add Player (nickname has to be unique!)</li>
        <li>
          Go to Add Game, enter game details, number of players press confirm.
        </li>
        <li>
          Enter player scores. Once finished, scroll down and press
          <span class="tag">Add Game</span>
        </li>
        <li>The game will now appear in the HomeDashboard or in Games.</li>
      </ul>
      <h6>Player Statistics</h6>
      <p class="content">
        Every time a game is added, you can Update your statistics in Player
        Stats section.
      </p>
    </div>
  </section>
  <div class="section">
    <div class="columns">
      <div class="column is-one-third is-narrow" style="overflow-x: scroll">
        <div class="container">
          <h3 class="title">Leaderboard</h3>
          <Suspense>
            <template #default>
              <PlayersStatsList
                :playersStatsQueryParams="playersStatsQueryParams"
              />
            </template>
            <template #fallback> Loading Leaderboard.. </template>
          </Suspense>
        </div>
      </div>
      <div class="column" style="overflow-x: scroll">
        <div class="container">
          <h3 class="title">Recent games</h3>
          <suspense>
            <template #default>
              <GamesList />
            </template>
            <template #fallback> Loading... </template>
          </suspense>
        </div>
      </div>
    </div>
  </div>
</template>



<script lang="js">
import GamesList from "./GamesList.vue";
import PlayersStatsList from "./PlayersStatsList.vue";

export default {
  components: {
    GamesList,
    PlayersStatsList,
  },
  data() {
    return {
      playersStatsQueryParams: {
        limit: 5,
        ordering: "-win_percentage",
        min_games_played: 20,
      }
    }
  },
};
</script>
