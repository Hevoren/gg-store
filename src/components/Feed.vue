<template>
  <div class="feed">
    <gg-loader v-if="isLoading"></gg-loader>
    <div v-if="error">SMTH WRONG</div>
    <div class="feed-container" v-if="feed">
      <div class="feed-list" v-for="(data, index) in feed.data" :key="index">
        <div class="feed-item">
          <div class="feed-item-title-desc">
            <p>{{ data.name }}</p>
            <p>{{ data.description }}</p>
          </div>
          <div class="feed-item-flex">
            <p>{{ data.price }} BTC</p>
            <button v-if="isLoggedIn" @click="addToCart(data)">Add</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import GgLoader from "@/components/UI/GbLoader.vue"

export default {
  components: {
    GgLoader,
  },

  name: "GgFeed",
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.feed.isLoading
    },
    feed() {
      return this.$store.state.feed.data
    },
    error() {
      return this.$store.state.feed.error
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn
    }
  },
  methods: {
    getFeed() {
      this.$store.dispatch('getFeed', {apiUrl: this.apiUrl})
    },
    addToCart(data) {
      this.$store.dispatch('addFeed', {apiUrl: `/cart/${data.id}`})
    },

  },
  mounted() {
    this.getFeed()
  }
};
</script>

<style scoped>
* {
  color: white;
}

.feed {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.feed-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.feed-list {
  max-width: 80em;
}

.feed-item {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.feed-item-flex {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.feed-item-flex button {
  color: black;
  border: none;
  border-radius: 10px;
  background-color: white;
  width: 70px;
  height: 30px;
}

.feed-item-flex button:hover {
  color: white;
  background-color: #91bfcb;
  transition: 0.3s;
}
</style>