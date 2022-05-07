<script setup lang="ts">
import { useHead } from '@vueuse/head';
import axios from 'axios';
import { usePlayerStore } from '@/store'
// --------------------------------
import IconPlay from '@/components/icons/play.vue'
import MusicItem from '@/components/music-item.vue'
// --------------------------------
const isFullScreenSearch = ref(false)
const searchInput = ref('')
const searchResult = ref([]) as any
const onFullScreenSearch = () => {
  isShowSearchBox.value = true
  isFullScreenSearch.value = true
}
const closeFullScreenSearch = () => {
  isFullScreenSearch.value = false
  searchInput.value = ""
  searchFilter.value = "Song"
}

const searchFilters = ['Song', 'Album', 'Artist']
const searchFilter = ref('Song')
watch([searchInput, searchFilter], async () => {
  if (searchInput.value) {
    try {
      const { data } = await axios.get(`https://api-beta.melobit.com/v1/search/query/${searchInput.value}/0/50`)
      searchResult.value = data.results.filter((item: any) => {
        return item.type === searchFilter.value.toLowerCase()
      }).map((item: any) => item[searchFilter.value.toLowerCase()])
    } catch (error) {
      searchResult.value = []
    }
  } else {
    searchResult.value = []
  }
})
// ---------------------------------
const navLabels = ['New', 'Dance', 'Happy', 'Sad'];
const activeLabel = ref(navLabels[0])
const loading = ref(false)
const fetchError = ref(false)
const result = ref([]) as any

const getData = async (url: string) => {
  loading.value = true;
  try {
    const { data } = await axios.get(url)
    result.value = data.results
    fetchError.value = false
  } catch (error) {
    fetchError.value = true
  } finally {
    loading.value = false;
  }
}

watch(activeLabel, (newValue) => {
  if (newValue === navLabels[0]) {
    getData('https://api-beta.melobit.com/v1/song/top/week/0/50')
  } else if (newValue === navLabels[1]) {
    getData('https://api-beta.melobit.com/v1/song/mood/dance/0/50')
  } else if (newValue === navLabels[2]) {
    getData('https://api-beta.melobit.com/v1/song/mood/happy/0/50')
  } else if (newValue === navLabels[3]) {
    getData('https://api-beta.melobit.com/v1/song/mood/sad/0/50')
  }
}, { immediate: true })
// ---------------------------------
let prevScroll = 0
const isShowSearchBox = ref(true)
const onScrollPlayList = (e: any) => {
  const scrollTopPx = e.target.scrollTop as number
  if (scrollTopPx - prevScroll >= 150) {
    prevScroll = scrollTopPx;
    isShowSearchBox.value = false
  }
  if (scrollTopPx - prevScroll <= -150) {
    prevScroll = scrollTopPx
    isShowSearchBox.value = true
  }
}
const route = useRoute();
watch(route, () => {
  isShowSearchBox.value = true;
  closeFullScreenSearch()
})

const store = usePlayerStore()
const play = (newPlayList: Array<any>, index: number) => {
  store.changePlayList(newPlayList, index)
}

useHead({
  title: 'Music Player'
})
</script>

<template>
  <div class="h-full w-full relative p-4 box-border">
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
          <mark class="bg-transparent text-[#fcab14]">Music</mark> Player
        </p>
      </div>
      <button v-wave v-show="isFullScreenSearch" @click="closeFullScreenSearch"
        class="bg-transparent text-[#e0e0e1] p-2 relative rounded-full border-none w-12 h-12 -mr-2">
        <span class="flex w-7 bg-[#e0e0e1] h-[3px] rounded absolute transform rotate-45 right-[0.6rem]"></span>
        <span class="flex w-7 bg-[#e0e0e1] h-[3px] rounded absolute transform -rotate-45 right-[0.6rem]"></span>
      </button>
      <button v-wave v-show="!isShowSearchBox" @click="onFullScreenSearch"
        class="bg-transparent text-[#e0e0e1] p-2 relative rounded-full border-none w-12 h-12 -mr-2">
        <label for="searchInput" form="searchForm">

          <svg width="24" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              stroke-width="1.5" class="stroke-[#e0e0e1]" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M22 22L20 20" class="stroke-[#e0e0e1]" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </label>
      </button>
    </header>
    <!-- search box -->
    <div class="w-full !flex-col flex mt-6 transition-all overflow-hidden h-12 opacity-100 duration-300 items-center"
      :class="[{ '!fixed inset-0 bg-[#131218] !mt-16 z-20 p-4 !h-full pt-6 box-border !items-start': isFullScreenSearch }, { 'h-0 mt-0 opacity-0': !isShowSearchBox }]">
      <form @submit.prevent class="relative w-full" id="searchForm" autocomplete="off">
        <input @focus="onFullScreenSearch" @click="onFullScreenSearch" v-model="searchInput" type="search"
          placeholder="Find your song" id="searchInput" autocomplete="off"
          class="bg-transparent w-full p-4 h-12 pr-10 border border-solid border-[#232128] focus:border-[#fcab14] focus:border-opacity-70 transition rounded-lg outline-none text-[#ddd]" />
        <button v-wave type="submit"
          class="bg-transparent rounded-l text-[#bcbcbe] border-none absolute top-0 right-0 h-12 w-12">
          <svg width="24" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              stroke-width="1.5" class="stroke-[#bcbcbe]" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M22 22L20 20" class="stroke-[#bcbcbe]" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </form>
      <div class="flex gap-2 mt-2">
        <div class="relative" v-for="filter in searchFilters" :key="filter" v-memo="[searchFilter === filter]">
          <input type="radio" name="searchFilter" :value="filter" v-model="searchFilter"
            class="w-full opacity-0 peer z-10 h-full absolute inset-0">
          <div
            class="w-full h-full inset-0 peer-checked:border-[#fcab14] absolute border border-solid border-[#232128] rounded-lg">
          </div>
          <p class="text-xs text-[#ddd] py-1 px-2">{{ filter }}</p>
        </div>
      </div>
      <!-- search result -->
      <ul v-show="searchResult.length"
        class="mt-4 select-none border border-[#232128] border-solid rounded-lg overflow-hidden w-full list-none">
        <li v-if="searchFilter === 'Song'" v-memo="[store.getPlayingId === song.id]"
          v-for="(song, index) in searchResult" :key="song.id"
          class="flex py-1 px-1.5 border border-t-[#232128] border-solid items-center text-[#ddd] text-sm h-12 overflow-hidden">
          <img class="w-12 h-12 object-center object-cover rounded" :src="song.image.thumbnail_small.url">
          <div class="ml-2 flex flex-col items-baseline w-[calc(100%-10rem)]">
            <p class="text-white w-full overflow-ellipsis overflow-hidden whitespace-nowrap">{{
                song.title
            }}</p>
            <router-link :to="`/artist/${song.artists[0].id}`" class="text-xs !justify-start !h-auto text-[#fcab14]">
              {{ song.artists[0].fullName }}
            </router-link>
          </div>
          <div class="ml-auto flex items-center gap-x-2">
            <a v-wave :href="song.audio.medium.url" :download="song.audio.medium.url"
              class="bg-transparent text-[#e0e0e1] p-2.5 rounded-full border-none w-10 h-10 flex justify-center flex-col gap-y-1.5 p-1">
              <svg width="24" class="m-auto" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">

                <path d="M18.0699 14.4299L11.9999 20.4999L5.92993 14.4299" stroke="#e0e0e1" stroke-width="1.5"
                  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 3.5V20.33" stroke="#e0e0e1" stroke-width="1.5" stroke-miterlimit="10"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
            <button v-wave @click.stop="(store.getPlayingId === song.id) ? store.changePlayPause() : play([song], 0)"
              class="bg-transparent text-[#e0e0e1] p-2.5 rounded-full border-none w-10 h-10 flex justify-center flex-col gap-y-1.5 p-1">
              <IconPlay v-if="store.getPlayingId === song.id" />
              <svg v-else width="24" class="m-auto" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 11.9999V8.43989C4 4.01989 7.13 2.2099 10.96 4.4199L14.05 6.1999L17.14 7.9799C20.97 10.1899 20.97 13.8099 17.14 16.0199L14.05 17.7999L10.96 19.5799C7.13 21.7899 4 19.9799 4 15.5599V11.9999Z"
                  stroke="#e0e0e1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </li>
        <router-link v-if="searchFilter === 'Album'" :to="`/album/${album.id}`" v-for="(album, index) in searchResult"
          :key="album.name + index"
          class="flex py-1 px-1.5 border w-full justify-start border-t-[#232128] border-solid items-center text-[#ddd] text-sm h-12 overflow-hidden">
          <img class="w-12 h-12 object-center object-cover rounded" :src="album.image.thumbnail_small.url">
          <span class="ml-2">{{ album.name }}</span>
        </router-link>
        <router-link v-if="searchFilter === 'Artist'" :to="`/artist/${artist.id}`"
          v-for="(artist, index) in searchResult" :key="artist.fullName + index"
          class="flex py-1 px-1.5 border w-full justify-start border-t-[#232128] border-solid items-center text-[#ddd] text-sm h-12 overflow-hidden">
          <img class="w-12 h-12 object-center object-cover rounded" :src="artist.image.thumbnail_small.url">
          <span class="ml-2">{{ artist.fullName }}</span>
        </router-link>
      </ul>
    </div>
    <!-- body -->
    <section class="mt-4 h-[calc(100%-7.6rem)] flex-col flex duration-300 transition-all"
      :class="[{ 'mt-22': isFullScreenSearch }, { '!h-[calc(100%-2rem)] !mt-0': !isShowSearchBox }]">
      <nav
        class="grid grid-cols-4 min-h-12 h-12 overflow-hidden border-t-0 border-l-0 border-r-0 border-b border-solid border-[#232128]">
        <button :disabled="loading" v-wave="!loading" v-for="label in navLabels"
          v-memo="[activeLabel === label, loading]" :key="label"
          :class="{ 'active !opacity-100': label === activeLabel }" @click="activeLabel = label"
          class="bg-transparent transition rounded-t disabled:opacity-50 border-none text-[#bcbcbe] flex justify-center items-center relative underline-transparent h-full">
          <span
            class="flex w-2 h-2 opacity-0 transition-all rounded-full bg-[#fcab14] shadow-[#fcab14] shadow bottom-0 left-1/2 transform -translate-x-1/2 absolute"></span>
          <span class="select-none">{{ label }}</span>
        </button>
      </nav>
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
      <div v-else-if="result.length" class="flex-auto pt-4 mt-4 overflow-auto scrollbar-thin pb-25"
        @scroll="onScrollPlayList">
        <div class="grid grid-cols-2 gap-4 scroll-smooth" v-memo="[result]">
          <MusicItem v-for="(music, index) in result" :key="index" :img="music.image.thumbnail_small.url"
            :title="music.title" :id="music.id" :artist="music.artists[0].fullName" :artistId="music.artists[0].id"
            @click="(store.getPlayingId === music.id) ? store.changePlayPause() : play(result, index)" />
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
    </section>
  </div>
</template>

<style lang="scss">
button.active {
  &>span:first-child {
    @apply opacity-100;
  }

  @apply text-[#fcab14] font-bold;
}

.peer:checked~.peer-checked\:border-\[\#fcab14\] {
  @apply border-[#fcab14]
}
</style>