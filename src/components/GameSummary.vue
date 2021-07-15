<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-clickable" @click="toggleDisplayDetails">
        {{ Game.pretifyDate(gs.date) }}. Generations:
        {{ gs.number_of_generations }} winner: {{ GameScoresClass.getWinner(gs) }}
      </p>
      <div class="level-right">
        <span class="level-item icon is-clickable" @click="toggleDisplayDetails">
          <font-awesome-icon v-if="!displayDetails" class="fas fa-angle-down" icon="angle-down" />
          <font-awesome-icon v-else class="fas fa-times" icon="times" />
        </span>
      </div>
    </header>
    <div v-if="displayDetails" class="card-content">
      <GameScores :gameScores="gs"/>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Game, GameScores as GameScoresClass } from "../classes";
import GameScores from "./GameScores.vue";
export default {
  props: {
    gameScores: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    let gs = new GameScoresClass(props.gameScores);
    let displayDetails = ref(false);
    const toggleDisplayDetails = () => displayDetails.value = !displayDetails.value;
    return {
      gs,
      GameScoresClass,
      Game,
      toggleDisplayDetails,
      displayDetails
    };
  },
  components: {
    GameScores,
  }
};
</script>
