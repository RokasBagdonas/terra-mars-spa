<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <h1 class="navbar-item title is-3">
            <i class="icon fas fa-meteor"></i>
        </h1>
        <a role="button" class="navbar-burger" aria-label="menu"
        aria-expanded="false" data-target="navbarOptions" v-on:click="toggleBurger">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>
    <div class="navbar-menu" id="navbarOptions">
        <div class="navbar-start">
            <router-link :to="{name: 'Home'}" class="navbar-item">Home</router-link>
            <router-link :to="{name: 'Add Game'}" class="navbar-item">Add Game</router-link>
            <router-link :to="{name: 'Games'}" class="navbar-item">Games</router-link>
            <router-link :to="{name: 'PlayerStats'}" class="navbar-item">Player Stats</router-link>
            <router-link :to="{name: 'Add Player'}" class="navbar-item">Add Player</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <Logout/>
          </div>
        </div>
    </div>
  </nav>
</template>

<script>
import Logout from "./Logout";

export default {
  components: {
    Logout,
  },
methods: {
    toggleBurger: function(event) {
        const navbarTarget = event.target.dataset.target;
        const elTarget = document.getElementById(navbarTarget);

        if (elTarget != null) {
            event.target.classList.toggle("is-active");
            elTarget.classList.toggle("is-active");
        }
        else console.error("Couldn't find navbar element.");
    }
 }
};
</script>
