<template>
  <div id="app">
    <main class="container centered-content">
      <div class="page">
        <div class="sentinel"></div>
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
      tweets: [],
      cursorId: null
    };
  },
  mounted() {
    let options = {
      rootMargin: "10px",
      threshold: 1.0
    };

    const loadNewTweets = () => {
      this.polling(1);
    };

    const stopNewTweets = () => {
      this.polling(0);
    };

    let observer = new IntersectionObserver(loadNewTweets, options);
    let top = document.querySelector(".sentinelTop");
    observer.observe(target);
  },
  methods: {
    addErrorMap(error) {
      let now = new Date().getTime();
      errorsMap[now] = error;
    },
    async fetchTweets(lastTweetId) {
      const newTweets = await TweetsService.get(lastTweetId);
      if (newTweets && newTweets.length) {
        const { 0: lastTweet } = newTweets;
        this.cursorId = lastTweet.id;
        this.tweets = Object.freeze([...newTweets, ...this.tweets]);
      }
    },
    async consumeTweets(lastTweetId = null) {
      try {
        await this.fetchTweets(lastTweetId);
      } catch (error) {
        this.addErrorMap(error);
        await this.fetchTweets(lastTweetId);
      }
    },
    polling(startPolling) {
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
            if (startPolling === 1) {
              setTimeout(consumer, 2000);
            }
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
