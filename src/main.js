import Vue from "vue";
import App from "./App.vue";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload);

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.config.performance = true;

new Vue({
  render: h => h(App)
}).$mount("#app");
