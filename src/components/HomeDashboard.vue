<template>
  <div class="tile is-ancestor">
    <div class="tile is-6 is-vertical is-parent">
      <div class="tile is-child box has-text-centered">
        <h3 class="title">Leaderboard</h3>
        <p>👷</p>
      </div>
    </div>
    <div class="tile is-parent">
      <div class="tile is-child box">
        <h3 class="title">Recent games</h3>
        <p>🚧 Under construction 🚧</p>
        <suspense>
        <template #default>
          <GamesList/>
        </template>
        <template #fallback>
        Loading...
        </template>
        </suspense>
      </div>
    </div>
  </div>
</template>



<script lang="js">
import GamesList from "./GamesList.vue";
export default {
  components: {
    GamesList
  },
};
</script>
