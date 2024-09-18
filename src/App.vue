<script setup lang="ts">
import BottomNav from '@/components/bottom-nav.vue'
import Player from '@/components/player.vue'
import AppMenu from '@/components/menu.vue'

import { useOnline } from '@vueuse/core'
import { isMobile as isMobileChecker } from '@/helpers'
import axios from 'axios'

const isMobile = isMobileChecker();

const online = useOnline()
</script>

<template>
  <div v-show="!online" class="bg-red-500 fixed z-50 inset-x-0 top-0 p-1 text-center text-xs font-bold text-red-200">You
    are offline!
  </div>
  <div class="bg-[#131218] w-full h-full relative" v-if="isMobile">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </router-view>
    <BottomNav />
    <Player />
    <AppMenu />
  </div>
  <div v-else class="w-full h-full flex">
    <h2 class="text-red-500 m-auto">Please open the application with the phone browser</h2>
  </div>
</template>

<style scoped lang="scss">
.menu {
  a {
    &.router-link-active {
      @apply text-[#fcab14];
    }
  }
}
</style>