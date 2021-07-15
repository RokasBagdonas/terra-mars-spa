<template>
    <PlayerStatsCard
      v-for="ps in playersStats"
      v-bind:key="ps.id"
      :playerStats="ps"
    />
</template>

<script>
import { ref, onMounted } from "vue";
import PlayerStatsCard from "../components/PlayerStatsCard";
import { getPlayersStats } from "../mars-api.ts";
import { PlayerStats } from "../classes.ts";

export default {
  props: {
    playersStatsQueryParams: {
      type: Object,
      required: false,
    }
  },
  components: {
    PlayerStatsCard,
  },
  async setup(props) {
    // 1. fetch player stats
    let playersStats = ref([]);
    const fetchPlayerStats = async (params) => {
      let result = await getPlayersStats(params);
      if (result.status != "200") console.error(result.status);
      playersStats.value = result["data"]["results"].map(
        (ps) => new PlayerStats(ps)
      );
    };
    let psParams = props.playersStatsQueryParams;
    console.dir(psParams);
    await fetchPlayerStats(psParams);

    return {
      playersStats,
    };
  },
}
</script>
