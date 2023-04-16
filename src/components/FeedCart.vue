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
          <div class="item-price">
            <p>{{ data.price }} BTC</p>
            <p>{{ data.count }}</p>
          </div>
          <div class="feed-item-flex">
            <button class="remove-item" @click="removeFeed(data)">Remove</button>
            <button class="action-item">+</button>
            <button class="action-item" @click="reduceFeed(data)">-</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import GgLoader from "@/components/UI/GbLoader.vue";
import {mapState} from "vuex";

export default {
  components: {
    GgLoader,
  },
  name: "GgFeedCart",
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error,
      isLoggedIn: state => state.auth.isLoggedIn
    }),
  },
  methods: {
    getFeeds() {
      this.$store.dispatch('getFeedCart', {apiUrl: `/cart`}).then(() => this.groupFeeds())
    },
    groupFeeds() {
      console.log('feed', this.$store.state.data.data)
      this.$store.dispatch('groupFeeds', this.feed)
    },
    removeFeed(data) {
      this.$store.dispatch("removeFeed", {apiUrl: `/cart/${data.product_id}`})
    },
    reduceFeed(data) {
      this.$store.dispatch("removeFeed", {apiUrl: `/cart/${data.id}`})
    }
  },
  mounted() {
    this.getFeeds()
  },
}
</script>

<style scoped>
* {
  color: white;
}

.feed {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.item-price {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}


.feed-item-flex {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.remove-item {
  color: black;
  border: none;
  border-radius: 10px;
  background-color: white;
  width: 70px;
  height: 30px;
}

.action-item {
  color: black;
  border: none;
  border-radius: 10px;
  background-color: white;
  width: 50px;
  height: 30px;
  font-size: 20px;
}

.remove-item:hover {
  color: white;
  background-color: #91bfcb;
  transition: 0.3s;
}

.action-item:hover {
  font-size: 20px;
  color: white;
  background-color: #91bfcb;
  transition: 0.3s;
}
</style>