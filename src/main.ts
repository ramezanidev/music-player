import { createPinia } from "pinia";
import router from "@/router";
import App from "./App.vue";

import VWave from "v-wave";
import { createHead } from "@vueuse/head";

import "virtual:windi.css";
import "@/assets/styles/index.css";

const app = createApp(App);
app.use(createPinia());
app.use(createHead());
app.use(router);
app.use(VWave);
app.mount("#app");

try {
  screen.orientation.lock("any");
} catch (error) {
  console.info("Not support orientation lock!");
}
