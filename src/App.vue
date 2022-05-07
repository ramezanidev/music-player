<script setup lang="ts">
import BottomNav from '@/components/bottom-nav.vue'
import Player from '@/components/player.vue'
import AppMenu from '@/components/menu.vue'

import { useOnline } from '@vueuse/core'
import axios from 'axios'

const isEnabledVPN = ref(true);
~(async () => {
  const { data } = await axios.get('https://api.db-ip.com/v2/free/self')
  const { countryCode = "IR" } = data
  if (countryCode === "IR") {
    isEnabledVPN.value = false
  }
})()

const online = useOnline()

</script>

<template>
  <div v-show="!online" class="bg-red-500 fixed z-50 inset-x-0 top-0 p-1 text-center text-xs font-bold text-red-200">You
    are offline!
  </div>
  <div v-show="!isEnabledVPN"
    class="bg-red-500 fixed z-50 inset-x-0 top-0 p-1 text-center text-xs font-bold text-red-200">You
    Please turn on vpn, refresh page
  </div>
  <div class="bg-[#131218] w-full h-full relative">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </router-view>
    <BottomNav />
    <Player />
    <AppMenu />
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