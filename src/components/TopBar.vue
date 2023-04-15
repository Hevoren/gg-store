<template>
  <nav class="nav-topbar">
    <div class="left-topbar">
      <router-link class="link-home" to="products">Gabella Store</router-link>
    </div>

    <div class="right-topbar">
      <ul v-if='isLoggedIn' class="list">
        <router-link class="link" to="products" exact active-class="active">Products</router-link>
        <router-link class="link" to="cart" exact active-class="active">Cart</router-link>
        <router-link class="link" to="order" exact active-class="active">Orders</router-link>
        <router-link class="link" to="/">Exit</router-link>
      </ul>
      <ul v-if='!isLoggedIn' class="list">
        <router-link class="link" to="products" exact active-class="active">Products</router-link>
        <router-link class="link" to="login" exact active-class="active">Sign in</router-link>
        <router-link class="link" to="register" exact active-class="active">Sign up</router-link>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'GgTopbar',
  computed: {
    isLoggedIn(){
      return this.$store.getters.isLoggedIn
    },
  }
}
</script>

<style>
.nav-topbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}


.link-home {
  color: white;
  font-size: 32px;
  text-decoration: none;
}

.link {
  color: white;
  text-decoration: none;
  padding: 10px;
  font-size: 23px;
}

.link:hover {
  color: #91bfcb;
}

.link.active {
  color: #91bfcb;
  font-weight: bold;
}

</style>