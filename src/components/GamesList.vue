<template>
  <h5 class="title is-5">GamesList</h5>
</template>

<script>
const AsyncGameSummary = defineAsyncComponent({
  loader: () => import("./GameSummary.vue"),
});

export default {
  components: {
    AsyncGameSummary,
  },
};
</script>
