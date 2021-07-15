<template>
    <div class="columns">
      <div class="column">
        <div class="table-container">
          <table class="table is-hoverable">
            <tbody>
              <tr
                v-for="(
                  displayName, modelName
                ) in PLAYER_SCORE_FIELDS_TO_DISPLAY"
                :key="displayName"
              >
                <td>{{ displayName }}</td>
                <td
                  v-for="(value, index) in this.pivotedGameScores[modelName]"
                  :key="index"
                >
                  {{ displayPlayerScoreProperty(value, modelName) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="column" style="overflow-x: scroll;">
        <div class="table-container">
          <table class="table is-hoverable">
          <tbody>
            <tr v-for="(value, name, index) in game" :key="index">
              <td>{{ name }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
          </table>
        </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { PLAYER_SCORE_SCHEMA } from "../mars-api";

export default {
  props: {
    gameScores: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const gs = props.gameScores;
    const game = cloneDeep(gs);
    delete game.scores;
    const pivotedGameScores = {};
    const pivotGameScores = () => {
      pivotedGameScores.value = {};
      for (let property in PLAYER_SCORE_SCHEMA) {
        pivotedGameScores[property] = [];
      }

      for (let score of gs.scores) {
        for (let prop in score) {
          pivotedGameScores[prop].push(score[prop]);
        }
      }
    };
    pivotGameScores();

    let PLAYER_SCORE_FIELDS_TO_DISPLAY = cloneDeep(PLAYER_SCORE_SCHEMA);
    delete PLAYER_SCORE_FIELDS_TO_DISPLAY.game_id;
    delete PLAYER_SCORE_FIELDS_TO_DISPLAY.id;
    return {
      gs,
      game,
      pivotedGameScores,
      PLAYER_SCORE_FIELDS_TO_DISPLAY,
    };
  },
  methods: {
    displayPlayerScoreProperty(prop, modelName) {
      if (modelName === "player") {
        return prop.nickname;
      }
      if (modelName === "is_winner") {
        return prop ? "Yes" : "No";
      } else return prop;
    },
  },
};
</script>
