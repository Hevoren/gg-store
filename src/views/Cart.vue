<template>
  <div>
    <p class="title-cart">Cart</p>
    <gg-feed-cart :api-url="apiUrl"></gg-feed-cart>
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
}

</script>

<style>
.title-cart{
  margin-top: 120px;
  text-align: center;
  color: white;
  font-size: 24px;
}
</style>