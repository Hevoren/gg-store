<template>
  <div>
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