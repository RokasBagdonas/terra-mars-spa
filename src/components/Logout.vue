<template>
  <button class="button is-rounded" @click="logout">Logout</button>
</template>

<script>
export default {
  methods: {
    logout() {
      this.auth.logout();
      console.log("isAuthenticated: " + this.auth.isAuthenticated());
    },
  },
};
</script>
