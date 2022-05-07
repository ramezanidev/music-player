<script setup lang="ts">
import { useHead } from '@vueuse/head';
// ---------------------------------
import songs from "@/pages/favorite/song.vue";
// ---------------------------------
const navLabels = ['Songs', 'Albums', 'Artists'];
const activeLabel = ref(navLabels[0])

const component = computed(() => {
  if (activeLabel.value === 'Songs') return songs
})

useHead({
  title: 'Favorite'
})

import { usePlayerStore } from '@/store'
const store = usePlayerStore()
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
          <mark class="bg-transparent text-[#fcab14]">Favorite</mark>
        </p>
      </div>
    </header>
    <!-- body -->
    <section class="mt-4 h-[calc(100%-3rem)] flex-col flex duration-300 transition-all">
      <nav
        class="grid grid-cols-3 min-h-12 h-12 overflow-hidden border-t-0 border-l-0 border-r-0 border-b border-solid border-[#232128]">
        <button v-wave v-for="label in navLabels" v-memo="[activeLabel === label]" :key="label" :class="{ 'active !opacity-100': label === activeLabel }"
          @click="activeLabel = label"
          class="bg-transparent transition rounded-t disabled:opacity-50 border-none text-[#bcbcbe] flex justify-center items-center relative underline-transparent h-full">
          <span
            class="flex w-2 h-2 opacity-0 transition-all rounded-full bg-[#fcab14] shadow-[#fcab14] shadow bottom-0 left-1/2 transform -translate-x-1/2 absolute"></span>
          <span class="select-none">{{ label }}</span>
        </button>
      </nav>
      <div class="bg-gradient-to-t from-[#131218] w-full h-20 absolute z-10 bottom-0 inset-x-0"></div>
      <component :is="component" />
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