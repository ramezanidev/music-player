<script lang="ts" setup>
import { useHead } from '@vueuse/head';
import axios from 'axios'
// --------------------------------
import MusicItem from '@/components/music-item.vue'
// ---------------------------------
const loading = ref(false)
const fetchError = ref(false)
const result = ref([]) as any

const getData = async (url: string) => {
  loading.value = true;
  try {
    const { data } = await axios.get(url)
    result.value = [...result.value, ...data.data]
    fetchError.value = false
  } catch (error) {
    fetchError.value = true
  } finally {
    loading.value = false;
  }
}
getData('https://music-player.liara.run/albums')
// ----------------------------
const route = useRoute()
const isShowAlbumPlayList = computed(() => {
  return Boolean(route.params.id)
});

useHead({
  title: 'Latest Albums'
})

import { usePlayerStore } from '@/store'
const store = usePlayerStore()
</script>

<template>
  <router-view v-if="isShowAlbumPlayList"></router-view>
  <div class="p-4 h-full box-border" v-else>
    <header class="flex items-center justify-between">
      <div class="flex items-center">
        <!-- menu toggle -->
        <button v-wave @click.stop="store.isOpenMenu = true"
          class="bg-transparent text-[#e0e0e1] p-2 -ml-2 rounded-full border-none w-12 h-12 flex justify-center flex-col gap-y-1.5">
          <span class="flex w-full bg-[#e0e0e1] h-[3px] rounded"></span>
          <span class="flex w-3/4 bg-[#e0e0e1] h-[3px] rounded"></span>
          <span class="flex w-1/2 bg-[#e0e0e1] h-[3px] rounded"></span>
        </button>
        <!-- title -->
        <p class="ml-2 text-white">
          <mark class="bg-transparent text-[#fcab14]">Latest</mark> Albums
        </p>
      </div>
    </header>
    <div class="flex h-[calc(100%-2rem)] w-full">
      <div class="bg-gradient-to-t from-[#131218] w-full h-20 absolute z-10 bottom-0 inset-x-0"></div>
      <div v-if="loading"
        class="grid flex-auto scrollbar-thin grid-cols-2 gap-4 pt-4 mt-4 animate-pulse overflow-auto scroll-smooth">
        <div v-for="i in 8" :key="i"
          class="w-full odd:-mt-4 odd:mb-4 bg-[#232128] relative pt-[100%] overflow-hidden rounded-lg shadow-md">
          <div class="absolute inset-0"></div>
        </div>
      </div>

      <div v-else-if="fetchError" class="flex flex-auto">
        <div class="m-auto flex flex-col items-center">
          <svg class="w-38 h-38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.91003 11.84C9.21003 8.51998 14.8 8.51998 19.1 11.84" stroke="#232128" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2 8.35998C8.06 3.67998 15.94 3.67998 22 8.35998" stroke="#232128" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.79004 15.49C9.94004 13.05 14.05 13.05 17.2 15.49" stroke="#232128" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.40002 19.15C10.98 17.93 13.03 17.93 14.61 19.15" stroke="#232128" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p class="text-[#bcbcbe] text-sm mt-2">
            No
            <mark class="bg-transparent text-[#fcab14]">network</mark> connection
          </p>
          <p class="text-[#bcbcbe] text-xs">please try again later!</p>
        </div>
      </div>
      <div v-else-if="result.length" class="flex-auto pt-4 mt-4 overflow-auto scrollbar-thin pb-25">
        <div class="grid grid-cols-2 gap-4 scroll-smooth">
          <MusicItem v-for="(album, index) in result" :key="index" :to="`/album/${album.id}`"
            :img="album.cover" :title="album.name" :artist="album.artists[0].fullName"
            :artistId="album.artists[0].id" />
        </div>
      </div>
      <div v-else class="flex flex-auto">
        <div class="m-auto flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 117.85" class="w-38 h-38">
            <g>
              <path fill="#232128"
                d="M60.05,68.41L18.02,46.33L6.2,60.47c14.91,7.88,29.82,15.76,44.74,23.65L60.05,68.41L60.05,68.41z M63.3,23.47L21.12,44.39 L62.24,66l41.2-21.65L79.81,31.99L63.3,23.47L63.3,23.47z M15.89,43.95L0.39,29.27c-0.57-0.65-0.51-1.65,0.15-2.23 c0.09-0.08,0.2-0.15,0.3-0.21L47.95,0.18c0.75-0.4,1.68-0.12,2.1,0.61l13.23,18.22L72.1,2.49c0.41-0.77,1.36-1.07,2.13-0.66 l47.8,25.27c0.14,0.08,0.27,0.17,0.39,0.29c0.61,0.62,0.6,1.62-0.02,2.23l-14.16,13.91l13.71,16.41c0.56,0.67,0.47,1.67-0.2,2.22 c-0.1,0.08-0.21,0.15-0.32,0.21l-12.31,6.51v24.4c0,0.66-0.4,1.22-0.98,1.46l-44.51,22.59c-0.29,0.32-0.71,0.52-1.17,0.52 c-0.62,0-1.15-0.35-1.41-0.87l-44.59-22.3c-0.55-0.28-0.87-0.83-0.87-1.41L15.59,69L3.05,62.37c-0.11-0.06-0.22-0.13-0.32-0.21 c-0.67-0.56-0.76-1.56-0.2-2.22L15.89,43.95L15.89,43.95z M60.84,21.06L48.11,3.67L4.07,28.7L18.46,42.1L60.84,21.06L60.84,21.06z M65.75,21.08l14.75,7.72l25.08,12.93l13.07-12.84L74.15,5.35L65.75,21.08L65.75,21.08z M106.47,46.33L64.44,68.41l9.11,15.7 l44.74-23.65L106.47,46.33L106.47,46.33z" />
            </g>
          </svg>
          <p class="text-[#bcbcbe] text-sm mt-2">Empty, Not Found!</p>
        </div>
      </div>

    </div>
  </div>
</template>

