<template>
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
