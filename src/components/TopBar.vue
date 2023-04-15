<template>
  <nav class="nav-topbar">
    <div class="left-topbar">
      <router-link class="link-home" to="products">Gabella Store</router-link>
    </div>

    <div class="right-topbar">
      <ul v-if="isLoggedIn" class="list">
        <p class="userName">Пользователь: {{ currentUser }}</p>
        <router-link class="link" to="products">Products</router-link>
      </ul>
      <ul v-if="isAnonymous" class="list">
        <router-link class="link" to="products" exact active-class="active"
          >Products</router-link
        >
        <router-link class="link" to="login" exact active-class="active"
          >Sign in</router-link
        >
        <router-link class="link" to="register" exact active-class="active"
          >Sign up</router-link
        >
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "GgTopbar",
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    isAnonymous() {
      return this.$store.getters.isAnonymous;
    },
  },
};
</script>

<style>
.nav-topbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.link-home {
  color: #378ba4;
  font-size: 32px;
  text-decoration: none;
}

.link {
  color: #378ba4;
  text-decoration: none;
  padding: 10px;
  font-size: 23px;
}

.link:hover {
  color: #012e4a;
}

.link.active {
  color: black;
  font-weight: bold;
}
</style>
