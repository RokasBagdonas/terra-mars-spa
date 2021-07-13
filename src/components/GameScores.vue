<template>
<h5 class="title is-5">GameScores</h5>
  <div class="container">
    <div class="columns is-0">
      <div class="column">
        <div class="table-container">
          <table class="table is-hoverable">
            <tbody>
              <tr v-for="(displayName, modelName) in this.PLAYER_SCORE_FIELDS_TO_DISPLAY"
              :key="displayName">
                <td>{{displayName}}</td>
                <td
                  v-for="(value, index) in
          this.pivotedGameScores[modelName]" :key="index"
                >{{displayPlayerScoreProperty(value, modelName)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="column">
        <div class="table-container">
          <table class="table is-hoverable">
            <tr v-for="(value, name, index) in gameScores.game" :key="index">
              <td>{{name}}</td>
              <td>{{value}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import {cloneDeep} from "lodash";
import {PLAYER_SCORE_SCHEMA} from "../mars-api";

export default {
  props: {
    gameScores: {
      type: Object,
      required: true,
    },
    setup(props){
      const pivotedGameScores = ref({});
      const pivotGameScores = () => {
        pivotedGameScores.value = {};
        for (let property in PLAYER_SCORE_SCHEMA) {
          pivotedGameScores.value[property] = [];
        }

        for (let score of gameScores.scores) {
          for (let prop in score) {
            pivotedGameScores.value[prop].push(score[prop]);
          }
        }
      };

      let PLAYER_SCORE_FIELDS_TO_DISPLAY = cloneDeep(PLAYER_SCORE_SCHEMA);
      delete PLAYER_SCORE_FIELDS_TO_DISPLAY.game_id;
      delete PLAYER_SCORE_FIELDS_TO_DISPLAY.id;
      return {
        pivotedGameScores,
        PLAYER_SCORE_FIELDS_TO_DISPLAY,
      }
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
    }
  },
};
</script>
