<template>
  <GameForm :game="game" :MAPS="MAPS"/>
</template>


<script>
import GameForm from "./GameForm";
import { getMaps, getPlayerStats } from "../mars-api";

export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  components: {
    GameForm,
  },
  async setup() {
    const {data: MAPS} = await getMaps();
    const {data: playerStats} = await getPlayerStats();
    console.dir(playerStats);
    return {
      MAPS,
      playerStats
    };
  },
};
</script>
