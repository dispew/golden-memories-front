<style>
@import url('https://fonts.googleapis.com/css2?family=Rouge+Script&display=swap');

.jumbotron {
  background-image: url('img/bokeh-bg.jpg');
  background-color: #c5d5cb;
  color: #c60021;;
}

.main {
  background-color: #ececec;
  min-height: 100vh;
  padding-top: px;
}

/* .bg-light {
  background-color: #006d77 !important;
} */

</style> 

<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a href="/" class="navbar-brand">Golden Memories</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/gallery" class="nav-link">
            <font-awesome-icon icon="images" /> Gallery
          </router-link>
        </li>
        <li v-if="showManagerBoard" class="nav-item">
          <router-link to="/manager" class="nav-link">
            <font-awesome-icon icon="list-check" />  Manager Board
          </router-link>
        </li>
        <li v-if="showManagerBoard" class="nav-item">
          <router-link to="/users" class="nav-link">
            <font-awesome-icon icon="users" /> Manage Users
          </router-link>
        </li>
        <li v-if="showUploadBoard" class="nav-item">
          <router-link to="/upload" class="nav-link">
            <font-awesome-icon icon="image" /> Post a photo
          </router-link>
        </li>
      </div>
      <div v-if="!currentAuthData" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>
      <div v-if="currentAuthData" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentAuthData.user.name }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>
    <div class="container main">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentAuthData() {
      return this.$store.state.auth.authData;
    },
    showManagerBoard() {
      if (this.currentAuthData && this.currentAuthData.user['roles']) {
        return this.currentAuthData.user['roles'].includes('admin');
      }
      return false;
    },
    showUploadBoard() {
      if (this.currentAuthData && this.currentAuthData.user['roles']) {
        return this.currentAuthData.user['roles'].includes('user') || 
          this.currentAuthData.user['roles'].includes('admin');
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
