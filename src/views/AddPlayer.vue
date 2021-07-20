<template>
  <h3 class="title is-3">Add Player</h3>
  {{ player }}
  <div class="container">
    <PlayerForm :player="player" />
    <button
      class="['button', submitted ? 'is-loading' : '' ]"
      @click="processAddPlayer"
    >
      Submit
    </button>
    <p class="content">AddPlayer submitted: {{ submitted }}</p>
    <Popup
      :message="submitMessage"
      :isActive="submitted"
      @popupClosed="() => (submitted = false)"
    />
  </div>
</template>

<script>
import { ref } from "vue";

import { Player } from "../classes.ts";
import { postPlayer } from "../mars-api.ts";
import PlayerForm from "../components/PlayerForm";
import Popup from "../components/utilities/Popup";

export default {
  components: {
    PlayerForm,
    Popup,
  },

  setup() {
    let player = ref(new Player());
    const submitMessage = ref("");
    const submitted = ref(false);

    const processAddPlayer = function (player) {
      // TODO: spinner
      submitted.value = true;
      postPlayer(player)
        // 2xx response (Axios api)
        .then((response) => {
          submitMessage.value = "Successfully created";
          console.log(response);
        })
        .catch((error) => {
          submitMessage.value = error.message;
          console.error(error);
        });
      /*.finally(() => {*/
      /*submitted = false;*/
      /*});*/
    };

    return {
      player,
      processAddPlayer,
      submitMessage,
      submitted,
    };
  },
};
</script>
