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
          <p>Games played: <i class="has-text-primary">{{ playerStats.games_played }}</i></p>
          <p>{{ pretifyWinrate }}</p>
          <p>
            Number of players in games:
            <i class="has-text-primary">{{ playerStats.average_number_of_players_in_games
            }} </i>
          </p>
        </div>
        <div class="tile is-child box">
          <p>
            Favourite corporation: <i class="has-text-primary">{{ playerStats.most_popular_corporation }}</i>
          </p>
          <p>
            Last updated: {{ playerStats.last_updated }}
          </p>
        </div>
      </div>
    </div>
    <footer class="card-footer">
    <button class="card-footer-item button" @click="updatePlayerStats">Update stats</button>
    <!--
      /*<a href="#" class="card-footer-item" @click="updatePlayerStats">Recalculate stats</a>*/
      -->
    </footer>
  </div>
</template>
<script>
import { round } from "lodash";
import { calcPlayerStats } from "../mars-api";

export default {
  props: {
    playerStats: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updatePlayerStats() {
      calcPlayerStats(this.playerStats.player.id)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
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
