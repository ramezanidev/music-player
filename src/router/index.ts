import { createWebHistory, createRouter } from "vue-router";
// routes
import Home from "@/pages/index.vue";
import Albums from "@/pages/album.vue";
import Artists from "@/pages/artist.vue";
import Album from "@/pages/album/_id.vue";
import Artist from "@/pages/artist/_id.vue";
import PlayLists from "@/pages/play-list.vue";
import PlayList from "@/pages/play-list/_id.vue";

import Favorite from "@/pages/favorite/index.vue";
import History from "@/pages/history.vue";

// config
const routes: any = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/album",
    components: {
      default: Albums,
    },
    children: [
      {
        path: ":id",
        components: {
          default: Album,
        },
      },
    ],
  },
  {
    path: "/play-list",
    components: {
      default: PlayLists,
    },
    children: [
      {
        path: ":id",
        components: {
          default: PlayList,
        },
      },
    ],
  },
  {
    path: "/artist",
    components: {
      default: Artists,
    },
    children: [
      {
        path: ":id",
        components: {
          default: Artist,
        },
      },
    ],
  },
  {
    path: '/favorite',
    components: {
      default: Favorite,
    }
  },
  {
    path: '/history',
    components: {
      default: History,
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
