<template>
  <h3 class="title is-3">Player Statistics</h3>
  <div class="container">
  <Suspense>
    <template #default>
      <PlayersStatsList :playersStatsQueryParams="playersStatsQueryParams"/>
    </template>
    <template #fallback>Loading Leaderboard...</template>
  </Suspense>

  </div>
</template>

<script>
import  PlayersStatsList  from "../components/PlayersStatsList.vue";

export default {
  components: {
    PlayersStatsList,
  },
  data() {
    return {
      playersStatsQueryParams: {
        ordering: "-games_played",
      }
    }
  },
};
</script>
