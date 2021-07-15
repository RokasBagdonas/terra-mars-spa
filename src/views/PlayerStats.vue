<template>
  <h3 class="title is-3">Player Statistics</h3>
  <div class="container">
    <PlayerStatsCard
      v-for="ps in playersStats"
      v-bind:key="ps.id"
      :playerStats="ps"
    />
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
      let params = { ordering: "-games_played" };
      let result = await getPlayersStats(params);
      if (result.status != "200") console.error(result.status);
      playersStats.value = result["data"]["results"].map(
        (ps) => new PlayerStats(ps)
      );
    };

    onMounted(fetchPlayerStats);

    return {
      playersStats,
    };
  },
};
</script>
