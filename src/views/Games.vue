<template>
  <div class="container">
    <div class="level level-center">
      <button class="button level-item" @click="navigateGames(false)">
        Previous
      </button>
      <button class="button level-item" @click="navigateGames(true)">
        Next
      </button>
    </div>
    <Suspense>
      <template #default>
        <GamesList :params="params" />
      </template>
      <template #fallback><LoadingSpinner /></template>
    </Suspense>

  </div>
</template>

<script>
import { reactive } from "vue";
import GamesList from "../components/GamesList";
import LoadingSpinner from "../components/utilities/LoadingSpinner.vue";

export default {
  components: {
    GamesList,
    LoadingSpinner,
  },
  setup() {
    let params = reactive({
      limit: 50,
      offset: 0,
      ordering: "-date",
    });
    let totalNumberOfGames = 200; // TODO: pre fetch

    const navigateGames = function (forward) {
      if (forward) {
        if (params.offset + params.limit < totalNumberOfGames)
          params.offset += params.limit;
      } else {
        if (params.offset <= params.limit) params.offset = 0;
        else params.offset -= params.limit;
      }
      console.dir(params);
    };

    return {
      params,
      navigateGames,
    };
  },
};
</script>

<!--
WARNING in ./src/views/Games.vue?vue&type=style&index=0&id=dfa49f12&lang=scss&module=true&scoped=true 1:0-402
export 'default' (reexported as 'default') was not found in '-!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-3.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./Games.vue?vue&type=style&index=0&id=dfa49f12&lang=scss&module=true&scoped=true' (possible exports: )
<style lang="scss" module scoped>
th {
  cursor: pointer;
}
th:hover {
  background-color: lavender;
}
tr {
  cursor: pointer;
}
.clicked {
    background-color: lavender;
}
</style>
-->
