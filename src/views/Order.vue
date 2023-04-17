<template>
  <div>
    <order-feed :api-url="apiUrl" v-if="isLoggedIn"></order-feed>
  </div>
</template>

<script>
import OrderFeed from "@/components/orderFeed.vue";

export default {
  name: "GgOrder",
  components: {
    OrderFeed,
  },
  data() {
    return {
      apiUrl: "/order",
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  },
};
</script>

<style>
p {
  color: white;
}
</style>
