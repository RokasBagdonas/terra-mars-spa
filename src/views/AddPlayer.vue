<template>
  <div class="container">
    <PlayerForm :player="player" />
    <button
      class="['button', submitted ? 'is-loading' : '' ]"
      @click="processAddPlayer"
    >
      Submit
    </button>
    <Popup
      :message="submitMessage"
      :isActive="submitted"
      @popup-closed="() => (submitted = false)"
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
    const processAddPlayer = function () {
      // TODO: spinner
      submitted.value = true;
      postPlayer(player.value)
        // 2xx response (Axios api)
        .then((response) => {
          submitMessage.value = "Successfully created";
          console.log(response);
        })
        .catch((error) => {
          submitMessage.value = error.response.data;
          console.error(error);
        });
    };

    return {
      player,
      submitMessage,
      processAddPlayer,
      submitted,
    };
  },
};
</script>
