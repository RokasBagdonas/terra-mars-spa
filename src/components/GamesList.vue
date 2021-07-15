<template>
  <AsyncGameSummary v-for="gs in gamesScores" :key="gs.id" :gameScores="gs" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import GameSummary from "./GameSummary.vue";

import LoadingSpinner from "./utilities/LoadingSpinner.vue";
import { getGamesScores } from "../mars-api";

const AsyncGameSummary = defineAsyncComponent({
  loader: () => import("./GameSummary.vue"),
  delay: 200,
  loadingComponent: LoadingSpinner,
});

export default {
  components: {
    AsyncGameSummary,
    GameSummary,
  },
  async setup() {
    let gamesScores = [];
    gamesScores = (await getGamesScores())["data"]["results"];
    console.dir(gamesScores);
    return {
      gamesScores,
    };
  },
};
</script>
