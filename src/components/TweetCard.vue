<script>
export default {
  name: "TweetCard",
  props: {
    tweet: {
      type: Object,
      default: () => ({
        id: 1392,
        image:
          "https://s3.amazonaws.com/uifaces/faces/twitter/dhoot_amit/128.jpg",
        text:
          "1392. I will tell you, then, what occurred in your house last night.",
        timeStamp: 1594197642742,
        username: "Helen24"
      })
    }
  },
  computed: {
    date() {
      const date = new Date(this.tweet.timeStamp);
      const seconds = date.getSeconds();
      const milliseconds = date.getMilliseconds();
      const minutes = date.getMinutes();
      const hours = date.getHours();
      return `h ${hours}.${minutes} : sec ${seconds}.${milliseconds}`;
    }
  }
};
</script>

<template >
  <div class="card card--medium">
    <div class="card__body">
      <div class="card__portrait center">
        <img class="card__portrait__img" v-lazy="tweet.image" :alt="tweet.username">
      </div>
      <div class="card__description">
        <h2 class="card__title">{{ tweet.username }}</h2>
        <p>{{ tweet.text }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  border: solid 2px #c3cfd9;
  margin: 1.6rem 0;
}

.card--medium {
  padding: 1.8rem 1.2rem 1.2rem 1.2rem;
}

.card__title {
  margin-top: 0;
}

.card__body {
  min-height: 6em;
  display: flex;
  flex-wrap: wrap;
}

.card__description {
  text-align: left;
  flex: 1.5;
}

.card__portrait {
  display: flex;
  flex: 1;
  justify-content: center;
}

.card__portrait__img {
  height: 6rem;
  object-fit: contain;
  border-radius: 50%;
}

@media screen and (max-width: 767px) {
  .card__body {
    flex-direction: column;
    height: auto;
  }

  .card__portrait {
    width: 100%;
    margin-bottom: 1.6rem;
  }
}
</style>