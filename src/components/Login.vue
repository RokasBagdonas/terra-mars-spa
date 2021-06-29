<template>
  <div class="hero">
    <div class="hero-body">
      <p class="title">Welcome to tm-stats!</p>
      <p class="subtitle">Login / register using Google account</p>

      <div class="control">
        <button class="button" v-if="!authenticated" @click="this.auth.login()">
          Log In
        </button>

        <button class="button" v-if="authenticated" @click="this.auth.logout()">
          Log Out
        </button>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import { SERVER_IP } from "../../deployment.config.js";
import axios from "axios";
const API_URL = `${SERVER_IP}:8000`;

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
    /*privateMessage() {*/
    /*const url = `${API_URL}/mars_api/private`;*/
    /*return axios*/
    /*.get(url, {*/
    /*headers: { Authorization: `Bearer ${this.auth.getAuthToken()}` },*/
    /*})*/
    /*.then((response) => {*/
    /*console.log(response.data);*/
    /*this.message = response.data || "";*/
    /*});*/
    /*},*/
  },
};
</script>
