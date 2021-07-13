<template>
  <h3 class="title is-3">PlayerStats View</h3>
  <div class="container">
    <div v-for="ps in playersStats" v-bind:key="ps.id">
      <PlayerStatsCard :playerStats="ps" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import PlayerStatsCard from "../components/PlayerStatsCard";
import { getPlayersStats } from "../mars-api.ts";
import { PlayerStats } from "../classes.ts";

export default {
  components: {
    PlayerStatsCard,
  },
  setup() {
    // 1. fetch player stats
    let playersStats = ref([]);
    const fetchPlayerStats = async () => {
      let result = await getPlayersStats();
      console.dir(result.data);
      if (result.status != "200") console.error(result.status);
      playersStats.value = result["data"]["results"].map(
        (ps) => new PlayerStats(ps)
      // sort players
      );
      playersStats.value.sort((a, b) => a.games_played > b.games_played ? -1 : 1);
    };

    onMounted(fetchPlayerStats);

    return {
      playersStats,
    };
  },
};
</script>
