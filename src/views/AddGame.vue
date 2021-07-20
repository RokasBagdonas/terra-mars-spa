<template>
  <div class="container">
    <Suspense>
      <template #default>
        <GameFormAsyncWrapper :game="game" />
      </template>
      <template #fallback>Preparing game form...</template>
    </Suspense>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <BaseNumberInput
            label="number of players?"
            v-model="numberOfPlayers"
            type="number"
          />
        </div>
        <div class="level-item">
          <button type="button" class="button" @click="submitNumberOfPlayers">
            confirm
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container is-fluid">
    <Suspense v-if="submittedNumberOfPlayers">
      <template #default>
        <PlayerScoresFormAsyncWrapper :playerScores="playerScores" />
      </template>
      <template #fallback>Preparing player scores form...</template>
    </Suspense>
  </div>

  <div class="container" v-if="playerScores.length > 0">
    <div class="level">
      <div class="level-item">
        <button class="button" type="button" @click="submitGame">
          Add Game
        </button>
      </div>
      <Popup
        :message="submitStatus"
        :isActive="submitted"
        @popup-closed="() => (submitted = false)"
      />
    </div>
  </div>
</template>


<script>
/*'use-strict';*/
import { ref } from "vue";

import { Game, PlayerScore } from "../classes";
import { postGameScores } from "../mars-api";
import GameFormAsyncWrapper from "../components/GameFormAsyncWrapper";
import PlayerScoresFormAsyncWrapper from "../components/PlayerScoresFormAsyncWrapper";
import Popup from "../components/utilities/Popup";

export default {
  components: {
    GameFormAsyncWrapper,
    PlayerScoresFormAsyncWrapper,
    Popup,
  },
  setup() {
    let playerScores = ref([]);
    let game = ref(new Game());
    game.value.number_of_generations = 10;
    let numberOfPlayers = 3;
    let submittedNumberOfPlayers = new ref(null);
    let submitStatus = null;
    let submitted = ref(false);
    return {
      playerScores,
      game,
      numberOfPlayers,
      submittedNumberOfPlayers,
      submitStatus,
      submitted,
    };
  },
  methods: {
    async submitGame() {
      if (!this.canSubmitGame()) {
        this.submitStatus = JSON.parse(
          '{ "error": "number of players is invalid" }'
        );
        this.submitted = true;
        return;
      }
      let payload = this.objectToDictionary(this.game);
      payload["scores"] = this.unrefArray(this.playerScores);
      await postGameScores(JSON.stringify(payload))
        .then((response) => {
          this.submitStatus = response.status;
          this.submitted = true;
        })
        .catch((error) => {
          console.error(error);
          this.submitStatus = error.response;
          this.submitted = true;
        });
    },
    canSubmitGame() {
      let allowSubmit = false;
      const ps = this.unrefArray(this.playerScores);
      if (ps.length >= 1 && ps.length <= 5) {
        allowSubmit = true;
      }
      return allowSubmit;
    },
    submitNumberOfPlayers() {
      if (this.numberOfPlayers < 1 || this.numberOfPlayers > 5) {
        // TODO: display warning
        console.error("Invalid number of players: " + this.numberOfPlayers);
      }
      this.submittedNumberOfPlayers = this.numberOfPlayers;

      // diff
      let diffnp = this.numberOfPlayers - this.playerScores.length;
      if (diffnp > 0) {
        for (let i = 0; i < diffnp; i++) {
          this.playerScores.push(ref(new PlayerScore()));
        }
      }
      if (diffnp < 0) {
        for (let i = 0; i > diffnp; i--) {
          this.playerScores.pop();
        }
      }
    },

    // --- Utilities ---
    unrefArray(arr) {
      if (arr.length === 0) {
        return arr;
      }
      let result = [];
      for (let item of arr) {
        result.push(item.value);
      }
      return result;
    },
    objectToDictionary(obj) {
      let dict = {};
      for (let prop in obj) {
        dict[prop] = obj[prop];
      }
      return dict;
    },
  },
};
</script>
