<template>
  <div class="section">
    <div class="columns">
      <div class="column is-one-third">
        <h3 class="title">Leaderboard</h3>
        <p>👷</p>
      </div>
      <div class="column" style="overflow-x: scroll;">
      <div class="container">
          <h3 class="title">Recent games</h3>
          <suspense>
            <template #default>
              <GamesList />
            </template>
            <template #fallback> Loading... </template>
          </suspense>
      </div>
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
