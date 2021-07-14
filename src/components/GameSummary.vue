<template>
  <div class="card">
  <header class="card-header">
  <p class="card-header-title">{{ Game.pretifyDate(gs.date) }} ; generations: {{ gs.number_of_generations }}
  winner: {{ GameScores.getWinner(gs) }}</p>
  </header>

  </div>

</template>

<script>
import { Game, GameScores } from "../classes";
export default {
  props:{
    gameScores: {
      type: Object,
      required: true
    }
  },
  setup(props){
    let gs = new GameScores(props.gameScores);
    return {
      gs,
      GameScores,
      Game,
    }
  },

};
</script>
