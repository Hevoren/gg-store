<template>
  <div class="feed">
    <gg-loader v-if="isLoading"></gg-loader>
    <div v-if="error">SMTH WRONG</div>
    <div v-if="feed && feed.length === 0" class="feed-empty">Empty</div>
    <div class="feed-container" v-if="feed && feed.length !== 0">
      <div class="feed-list" v-for="(data, index) in feed" :key="index">
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
            <button class="action-item" @click="increaseFeed(data, index)">+</button>
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
      isLoggedIn: state => state.auth.isLoggedIn,
      delFeedData: state => state.feed.delData,
    }),
  },
  methods: {
    getFeeds() {
      this.$store.dispatch('getFeedCart', {apiUrl: `/cart`}).then(() => this.groupFeeds())
      console.log('getFeeds')
    },
    groupFeeds() {
      this.$store.dispatch('groupFeedsCart')
      console.log("groupFeeds")
    },
    removeFeed(data) {
      for (let deleted of this.delFeedData.data) {
        if (deleted.product_id === data.product_id) {
          console.log('wp', data.id)
          this.$store.dispatch('removeFeed', {
            apiUrl: `/cart/${deleted.id}`
          }).then(() => this.getFeeds())
        }
      }
    },
    reduceFeed(data) {
      this.$store.dispatch("removeFeed", {apiUrl: `/cart/${data.id}`}).then(() => this.getFeeds())
    },
    increaseFeed(data) {
      this.$store.dispatch('increaseFeedCart', {apiUrl: `/cart/${data.product_id}`}).then(() => this.getFeeds())
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

.feed-empty {
  margin-top: 200px;
  font-size: 54px;
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

.feed-item-title-desc{
  height: 70%;
}

.item-price {
  height: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}


.feed-item-flex {
  height: 15%;
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