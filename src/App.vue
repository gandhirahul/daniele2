<template>
  <div id="app">
    <main class="container centered-content">
      <div class="page">
        <tweet-card v-for="tweet in tweets" :tweet="tweet" :key="tweet.id" class="card--medium"></tweet-card>
      </div>
    </main>
  </div>
</template>

<script>
import TweetsService from "@/services/TweetsService.js";
import TweetCard from "@/components/TweetCard.vue";
const errorsMap = {};
export default {
  name: "App",
  components: {
    TweetCard
  },
  data() {
    return {
      tweets: []
    };
  },
  mounted() {
    this.polling();
  },
  methods: {
    polling() {
      let cursorId = null;
      const consumer = async () => {
        let now = new Date().getTime();
        try {
          const newTweets = await TweetsService.get(cursorId);
          if (newTweets && newTweets.length) {
            const { 0: lastTweet } = newTweets;
            cursorId = lastTweet.id;
            this.tweets = Object.freeze([...newTweets, ...this.tweets]);
          }
        } catch (error) {
          errorsMap[now] = error;
        } finally {
          if (this.tweets >= 10000) {
            await TweetsService.reset();
          } else {
            setTimeout(consumer, 2000);
          }
        }
      };
      consumer();
    }
  }
};
</script>

<style lang="scss">
@import "./assets/reset.css";
@import "./assets/typo.css";

.container {
  width: 80vw;
  max-width: 1200px;
  margin: 1em auto 2em;
  height: calc(100vh - 3em);
}

.page {
  padding: 0.8rem 1rem 1.2rem;
}
</style>
