<template>
  <div class="feed">
    <gg-loader v-if="isLoading"></gg-loader>
    <div v-if="error">SMTH WRONG</div>
    <div class="feed-container" v-if="feed">
      <div class="feed-list" v-for="(data, index) in feed.data" :key="index">
        <div class="feed-item">
          <div class="feed-item-desc">
            <p>
              Number of your order: &nbsp;
              <span style="font-weight: bold; text-align: center">{{
                data.id
              }}</span>
            </p>
            <p>Your order:</p>
            <ul class="order-list">
              <li
                v-for="(item, index) in data.products"
                :key="index"
                class="item-order-list"
              >
                {{ item }} &nbsp;
              </li>
            </ul>
          </div>
          <div class="item-price">
            <p>{{ data.order_price }} BTC</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GgLoader from "@/components/UI/GbLoader.vue";
import { mapState } from "vuex";

export default {
  components: {
    GgLoader,
  },
  name: "orderFeed",
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
      isLoggedIn: (state) => state.auth.isLoggedIn,
      delFeedData: (state) => state.feed.delData,
    }),
  },
  methods: {
    getFeed() {
      this.$store.dispatch("getFeed", { apiUrl: this.apiUrl });
    },
  },
  mounted() {
    this.getFeed();
  },
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

.feed-empty {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
}

.feed-empty-title {
  display: inline-block;
  font-size: 88px;
  text-align: center;
}
.feed-empty-desc {
  display: inline-block;
  font-size: 16px;
  text-align: center;
  color: #91bfcb;
}

.feed-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: max-content;
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

.feed-item-desc {
  display: flex;
  flex-direction: column;
  height: 85%;
}

.order-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  font-weight: bold;
  text-align: center;
}

.item-price {
  height: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
