<script lang="ts" setup>
import { usePlayerStore } from '@/store'
const store = usePlayerStore()
</script>

<template>
    <div v-memo="[store.isOpenMenu]" :class="{ '!left-0 !bg-opacity-20': store.isOpenMenu }"
        @click.self="store.isOpenMenu = false"
        class="fixed transition-all duration-300 inset-y-0 -left-full h-full w-full z-30 bg-[#100f14] bg-opacity-0">
        <div class="w-[calc(100%-5rem)] bg-[#100f14] h-full">
            <div class="flex items-center px-4 pt-14 pb-6">
                <img src="/icon-512.png" class="w-20" alt="logo">
                <p class="ml-2 text-white text-lg select-none"><mark
                        class="bg-transparent font-bold text-[#fcab14]">Music</mark> Player
                </p>
            </div>
            <span class="flex w-full border-b border-t-0 border-r-0 border-l-0 border-solid border-[#232227]"></span>
            <ul class="p-2 menu">
                <li>
                    <RouterLink @click="store.isOpenMenu = false" to="/" v-wave
                        class="w-full select-none flex h-14 box-border rounded-lg text-white justify-start py-2 px-4">
                        <svg class="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z"
                                stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
                                stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path
                                d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z"
                                stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
                                stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                        </svg>

                        <span>Home</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink @click="store.isOpenMenu = false" to="/favorite" v-wave
                        class="w-full select-none flex h-14 box-border rounded-lg text-white justify-start py-2 px-4">
                        <svg class="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <span>Favorite</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink @click="store.isOpenMenu = false" to="/history" v-wave
                        class="w-full select-none flex h-14 box-border rounded-lg text-white justify-start py-2 px-4">

                        <svg class="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                                stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001"
                                stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <span>History</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>