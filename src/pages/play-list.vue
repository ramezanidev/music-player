<script lang="ts" setup>
import { useHead } from '@vueuse/head';

// ----------------------------
const route = useRoute()
const isShowPlayList = computed(() => {
    return Boolean(route.params.id)
});

const playList = ['Pop', 'Hip Hop', 'Rock', 'Classical']
useHead({
    title: 'Top genres'
})

import { usePlayerStore } from '@/store'
const store = usePlayerStore()
</script>

<template>
    <router-view v-if="isShowPlayList"></router-view>
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
                    <mark class="bg-transparent text-[#fcab14]">Top</mark> Genres
                </p>
            </div>
        </header>
        <div class="flex h-[calc(100%-2rem)] w-full">
            <div class="bg-gradient-to-t from-[#131218] w-full h-20 absolute z-10 bottom-0 inset-x-0"></div>
            <div class="flex-auto pt-4 mt-4 overflow-auto scrollbar-thin pb-25">
                <div class="grid grid-cols-1 gap-4 scroll-smooth">
                    <router-link v-for="(item) in playList" :key="item" :to="`/play-list/${item}`"
                        class="w-full h-16 flex flex-col items-start justify-end p-3 box-border overflow-hidden play-list-item rounded-lg shadow-md">
                        <p class="text-white overflow-ellipsis overflow-hidden whitespace-nowrap">{{ item }}</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.play-list-item {
    background-size: cover !important;
    background-position: center;

    &:nth-of-type(1) {
        background: linear-gradient(to left, rgba(2, 104, 161, 0.5), rgb(138 192 211 / 50%)), url(https://img.melobit.com/KTWQQOjdi_0hX4TlyigkEKTkN6izdirzx7dy1SLOP4g/rs:fill:280:175:1/dpr:1/Y292ZXJzL3BvcDIuanBn);
    }

    &:nth-of-type(2) {
        background: linear-gradient(to left, rgba(170, 7, 107, 0.5), rgba(97, 4, 95, 0.5)), url(https://img.melobit.com/ZsccjKR-FrvA-qo20gFaBUKHogwleENSNkV9zhHWlH0/rs:fill:280:175:1/dpr:1/Y292ZXJzL3JhcDIuanBn);
    }

    &:nth-of-type(3) {
        background: linear-gradient(to left, rgba(234, 148, 1, 0.5), rgba(253, 229, 2, 0.5)), url(https://img.melobit.com/YK6i0ct5FwU-vNol8YUL8LAveo6NMxaQnZc0jcUWWXg/rs:fill:280:175:1/dpr:1/Y292ZXJzL3JvY2syLnBuZw);
    }

    &:nth-of-type(4) {
        background: linear-gradient(to left, rgba(187, 192, 202, 0.5), rgba(120, 132, 145, 0.5)), url(https://img.melobit.com/Xgfh9By1JymtUeQGy7tj1IawyK3HZMMeNDZUv-o9Dfc/rs:fill:280:175:1/dpr:1/Y292ZXJzL2NsYXNzaWMyLmpwZw);
    }
}
</style>