<template>
  <h5 class="title is-5">GamesList</h5>
  <AsyncGameSummary v-for="gs in gamesScores" :key="gs.id"
  :gameScores="gs"/>
</template>

<script>
import {reactive, defineAsyncComponent} from "vue";
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
    GameSummary
  },
  async setup(){
    //1. load 10 recent gameScores.
    //2. for each gameScore, feed into GameSummary
    let gamesScores = [];
    gamesScores = (await getGamesScores())["data"]["results"];
    return {
      gamesScores
    }
  },
};
</script>
