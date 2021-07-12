<template>
  <div class="card">
    <header class="card-header">
      <div class="level">
        <div class="level-right">
          <div class="level-item">
            <p class="card-header-title">{{ playerStats.player.nickname }}</p>
          </div>
        </div>
      </div>
    </header>
    <div class="card-content">
      <div class="tile is-ancestor is-parent">
        <div class="tile is-child box">
          <p>Games played: {{ playerStats.games_played }}</p>
          <p>{{ pretifyWinrate }}</p>
          <p>
            Number of players in games:
            {{ playerStats.average_number_of_players_in_games }}
          </p>
        </div>
        <div class="tile is-child box">
          <p>
            Favourite corporation: {{ playerStats.most_popular_corporation }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Summary:
player name
key stats
-->

  <!-- Details:
all the rest
--></template>
<script>
import { round } from "lodash";
export default {
  props: {
    playerStats: {
      type: Object,
      required: true,
    },
  },
  computed: {
    pretifyWinrate() {
      let winrate = parseFloat(this.playerStats.win_percentage) * 100.0;
      return round(winrate, 2) + "%";
    },
  },
};
</script>
