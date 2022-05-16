import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'
import { VueMasonryPlugin } from 'vue-masonry'

createApp(App)
  .use(router)
  .use(store)
  .use(VueMasonryPlugin)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

