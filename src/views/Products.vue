<template>
  <div>
    <p class="title-products">Products</p>
    <gg-feed :api-url="apiUrl"></gg-feed>
  </div>
</template>

<script>
import GgFeed from "@/components/Feed.vue"

export default {
  name: "GgProducts",
  components: {
    GgFeed
  },
  data() {
    return {
      apiUrl: '/products',
    }
  },
};
</script>

<style>
.title-products{
  margin-top: 120px;
  text-align: center;
  color: white;
  font-size: 24px;
}
</style>