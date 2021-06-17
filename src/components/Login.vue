<template>
  <div v-if="!authenticated">
    <button
      class="btn btn-primary btn-margin"
      v-if="!authenticated"
      @click="this.auth.login()"
    >
      Log In
    </button>

    <button
      class="btn btn-primary btn-margin"
      v-if="authenticated"
      @click="privateMessage()"
    >
      Call Private
    </button>

    <button
      class="btn btn-primary btn-margin"
      v-if="authenticated"
      @click="this.auth.logout()"
    >
      Log Out
    </button>
    <p>{{ message }}</p>
    <p>Authenticated: {{ this.auth.isAuthenticated()}}</p>
    <br />
  </div>

</template>

<script>
import axios from "axios";
const API_URL = "http://localhost:8000";

export default {
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
  methods: {
    privateMessage() {
      const url = `${API_URL}/mars_api/private`;
      return axios
        .get(url, {
          headers: { Authorization: `Bearer ${this.auth.getAuthToken()}` },
        })
        .then((response) => {
          console.log(response.data);
          this.message = response.data || "";
        });
    },
  },
}
</script>
