<template>
  <div v-if="authenticated">
    <NavBar/>
    <!-- <HomeDashboard/> -->
    <router-view/>
  </div>

  <div v-else>
    <Login/>
  </div>

</template>

<script>
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import HomeDashboard from "./components/HomeDashboard";

export default {
  name: "app",
  components: {
    NavBar, HomeDashboard, Login,
  },
  data() {
    this.auth.handleAuthentication();
    this.authenticated = false;

    this.auth.authNotifier.on("authChange", (authState) => {
      this.authenticated = authState.authenticated;
    });

    return {
      authenticated: false,
      message: "",
    };
  },
};
</script>
