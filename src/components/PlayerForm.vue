<template>
  <h5 class="title is-5">Player Form</h5>
  {{ player }}
  <BaseNumberInput :label="nickname" v-model="player['nickname']" type="text"/>
  <BaseNumberInput :label="motto" v-model="player.motto" type="text" />
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
};
</script>
