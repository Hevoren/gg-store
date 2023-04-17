<template>
  <div class="feed">
    <gg-loader v-if="isLoading"></gg-loader>
    <div v-if="error"></div>
    <button v-if="feed && feed.length !== 0" class="order-button" @click="orderFeeds(feed)">Order</button>
    <div v-if="(feed && feed.length === 0) || (!feed)" class="feed-empty">
      <span class="feed-empty-title">Empty</span>
      <span class="feed-empty-desc">There doesn't seem to be anything</span>
    </div>
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
    },
    orderFeeds(data){
      console.log('data', data.data)
      this.$store.dispatch('orderFeed', {apiUrl: `/order`})
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

.order-button{
  width: 90px;
  height: 40px;
  border-radius: 10px;
  color: black;
  transition: 0.5s ease;
}

.order-button:hover{
  font-size: 16px;
  background-color: #91bfcb;
  color: white;
  width: 110px;
  height: 50px;
  border-radius: 20px;
  cursor: pointer;
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

.feed-empty {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
}

.feed-empty-title{
  display: inline-block;
  font-size: 88px;
  text-align: center;
}
.feed-empty-desc{
  display: inline-block;
  font-size: 16px;
  text-align: center;
  color: #91bfcb;
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
  transition: 0.5s;
}

.action-item {
  color: black;
  border: none;
  border-radius: 10px;
  background-color: white;
  width: 50px;
  height: 30px;
  font-size: 20px;
  transition: 0.5s;
}

.remove-item:hover {
  color: white;
  background-color: #91bfcb;
  cursor: pointer;
}

.action-item:hover {
  font-size: 20px;
  color: white;
  background-color: #91bfcb;
  cursor: pointer;
}
</style>