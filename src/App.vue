<template>
  <div v-if="authenticated">
    <NavBar/>
    <router-view/>
  </div>

  <div v-else>
  <div class="hero">
    <div class="hero-body">
      <p class="title">Welcome to tm-stats!</p>
      <p class="subtitle">Login / register using Google account</p>

      <div class="control">
        <button class="button" @click="this.auth.login()">
          Log In
        </button>
        <br />
      </div>
    </div>
  </div>
  </div>


</template>

<script>
import NavBar from "./components/NavBar";
import HomeDashboard from "./components/HomeDashboard";
import {ref} from "vue";

export default {
  name: "app",
  components: {
    NavBar, HomeDashboard,
  },
  data() {
    this.auth.handleAuthentication();
    let authenticated = ref(false);

    this.auth.authNotifier.on("authChange", (authState) => {
      authenticated.value = authState.authenticated;
    });

    return {
      message: "",
      authenticated,
    };
  },
};
</script>
