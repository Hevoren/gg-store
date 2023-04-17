<template>
  <div>
    <gg-feed-cart :api-url="apiUrl" v-if="isLoggedIn"></gg-feed-cart>
  </div>
</template>

<script>
import GgFeedCart from "@/components/FeedCart.vue";

export default {
  name: "GgCart",
  components: {
    GgFeedCart,
  },
  data() {
    return {
      apiUrl: '/products',
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn
    }
  },
}

</script>
