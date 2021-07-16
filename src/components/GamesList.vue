<template>
  <AsyncGameSummary v-for="gs in gamesScores" :key="gs.id" :gameScores="gs" />
</template>

<script>
import { watch, ref, defineAsyncComponent} from "vue";
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
  props: {
    params: {
      type: Object,
      required: false,
    },
  },
  async setup(props) {
    const gamesScores = ref([]);
    let params = {
      offset: 0,
      limit: 15,
      ordering: "-date",
    };

    if(props.params){
      console.log("params is provided");
      params = props.params;
    }

    const fetchGamesScores = async function(params) {
      console.log("fetchGamesScores");
      gamesScores.value = (await getGamesScores(params))["data"]["results"];
    };

    await fetchGamesScores(params);
    watch(props, (props) => fetchGamesScores(props.params));

    return {
      gamesScores,
      props,
    };
  },
};
</script>
