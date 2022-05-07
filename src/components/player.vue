<template>
    <div :class="[classAttrs.wrapper, classAttrs.isShowLyrics.wrapper]" ref="parentElement"
        :style="{ boxShadow: (isOpen || isFullScreen) ? '0px 0px 100px 45px #131218' : '0px 0px 0px 0px #131218' }"
        class="fixed bottom-40 duration-[450ms] bg-transparent -right-14 z-30 transition-all mr-2 rounded-full">
        <button @click="isFullScreen || (isOpen = !isOpen)" :class="classAttrs.cover"
            class="w-12 h-12 transition-all duration-[450ms] rounded-full border-none relative overflow-hidden">
            <svg v-show="!isFullScreen"
                class="w-full h-full absolute z-10 inset-0 duration-[450ms] transform -rotate-90 origin-center stroke-[#fcab14]"
                :class="{ 'animate-spin': store.isLoadingSong }" viewPort="0 0 100 100" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <circle class="stroke-[#fcab14] transition-all duration-[450ms]" sroke-dashoffset="-62.83"
                    :stroke-width="isOpen ? 10 : 5" :r="classAttrs.progressCircle" :cx="classAttrs.progressCircle"
                    :cy="classAttrs.progressCircle" fill="transparent" stroke-dasharray="565.40"
                    :stroke-dashoffset="store.getProgress(classAttrs.progressCircle)"></circle>
            </svg>
            <img draggable="false" class="w-full h-full inset-0 absolute object-center object-cover"
                :src="store.getCurrentMusic.cover" alt="">
            <div class="w-full h-full flex inset-0 absolute" v-show="isFullScreen || !isOpen">
                <IconPlay :showOnlyLoading="true" />
            </div>
        </button>
        <div class="absolute inset-x-0 top-[25vw] flex pt-4 h-[calc(100%-240px)]" v-show="isFullScreen">
            <div class="w-full flex flex-col h-full">
                <div class="flex justify-between w-[19rem] mx-auto">
                    <div v-memo="[store.getCurrentMusic]" class="w-[calc(100%-6rem)]">
                        <p class="text-white text-lg overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                            {{ store.getCurrentMusic.title }}
                        </p>
                        <span class="!justify-start text-sm !h-auto text-[#fcab14]">
                            {{ store.getCurrentMusic.artist }}
                        </span>
                    </div>
                    <div class="flex items-center">
                        <button @click="toggleShowLyrics" v-memo="[lyrics]" v-show="!lyrics.isEmpty"
                            class="w-12 h-12 flex overflow-hidden rounded-full border-none bg-transparent text-[#fff]"
                            v-wave>
                            <svg class="m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                                    :stroke="isShowLyrics ? '#ff0000' : '#fff'" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M7 12.1599H9.68C10.39 12.1599 10.87 12.6999 10.87 13.3499V14.84C10.87 15.49 10.39 16.03 9.68 16.03H8.19C7.54 16.03 7 15.49 7 14.84V12.1599"
                                    :stroke="isShowLyrics ? '#ff0000' : '#fff'" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M7 12.16C7 9.36997 7.52 8.89997 9.09 7.96997" :stroke="isShowLyrics ? '#ff0000' : '#fff'"
                                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M13.1399 12.1599H15.8199C16.5299 12.1599 17.0099 12.6999 17.0099 13.3499V14.84C17.0099 15.49 16.5299 16.03 15.8199 16.03H14.3299C13.6799 16.03 13.1399 15.49 13.1399 14.84V12.1599"
                                    :stroke="isShowLyrics ? '#ff0000' : '#fff'" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M13.1399 12.16C13.1399 9.36997 13.6599 8.89997 15.2299 7.96997"
                                    :stroke="isShowLyrics ? '#ff0000' : '#fff'" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button v-memo="[isFavorite]" @click="isFavorite ? store.removeFavorite() : store.addFavorite()"
                            class="w-12 h-12 flex overflow-hidden rounded-full border-none bg-transparent text-[#fff]"
                            v-wave>
                            <svg class="m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                    stroke="#ff0000" :fill="isFavorite ? '#ff0000' : 'transparent'" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div v-memo="[lyrics, isShowLyrics]" :class="{'!h-[calc(100%-50px)] !opacity-100 !mt-2 !pb-2':isShowLyrics}" class="opacity-0 h-0 mt-0 pb-0 bg-[#131218] flex overflow-y-auto scrollbar-thin transition-all duration-[450ms]">
                    <pre class="text-center text-sm text-white w-[19rem] mx-auto py-2"
                        dir="rtl">{{ lyrics.isLoading ? 'Loading lyrics ...' : lyrics.value }}</pre>
                </div>
            </div>
        </div>
        <div class="absolute top-1/2 left-1/2 -z-1 transition-all duration-[450ms]"
            :class="classAttrs.controls.default">
            <!--  -->
            <div class="mt-[-48px]" v-show="isFullScreen" v-memo="[isFullScreen, progress, progressTime]">
                <div class="flex justify-between text-xs text-white mb-1.5">
                    <span>{{ progressTime.currentTime.value }}</span>
                    <span>{{ progressTime.duration.value }}</span>
                </div>
                
                <Slider :tooltips="false" :disabled="store.isLoadingSong" v-model="progress" />
            </div>
            <!--  -->
            <button @click="store.changeVolume" :class="[classAttrs.controls.volume, classAttrs.controls.volumeString]"
                class="w-0 h-0 transform translate-x-0 flex overflow-hidden transition-all duration-[450ms] rounded-full border-none absolute top-0 left-0 bg-[#131218] shadow-sm shadow-[#fcab14] text-[#fff]"
                v-wave>
                <IconVolume />
            </button>
            <button @click="store.next" :class="[classAttrs.controls.next, classAttrs.controls.disabledNext]"
                class="w-0 h-0 transform translate-x-0 flex overflow-hidden transition-all duration-[450ms] rounded-full border-none absolute top-0 left-0 bg-[#131218] shadow-sm shadow-[#fcab14] text-[#fff]"
                v-wave>
                <svg class="m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.76001 7.22005V16.7901C3.76001 18.7501 5.89 19.98 7.59 19L11.74 16.61L15.89 14.21C17.59 13.23 17.59 10.78 15.89 9.80004L11.74 7.40004L7.59 5.01006C5.89 4.03006 3.76001 5.25005 3.76001 7.22005Z"
                        stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M20.24 18.1801V5.82007" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>
            <button @click="store.isLoadingSong || store.changePlayPause()" :class="classAttrs.controls.play"
                class="w-0 h-0 transform translate-x-0 flex overflow-hidden transition-all duration-[450ms] rounded-full border-none absolute top-0 left-0 bg-[#131218] shadow-sm shadow-[#fcab14] text-[#fff]"
                v-wave>
                <IconPlay />
            </button>
            <button @click="store.prev" :class="[classAttrs.controls.prev, classAttrs.controls.disabledPrev]"
                class="w-0 h-0 transform translate-x-0 flex overflow-hidden transition-all duration-[450ms] rounded-full border-none absolute top-0 left-0 bg-[#131218] shadow-sm shadow-[#fcab14] text-[#fff]"
                v-wave>
                <svg class="m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.24 7.22005V16.7901C20.24 18.7501 18.11 19.98 16.41 19L12.26 16.61L8.10996 14.21C6.40996 13.23 6.40996 10.78 8.10996 9.80004L12.26 7.40004L16.41 5.01006C18.11 4.03006 20.24 5.25005 20.24 7.22005Z"
                        stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3.76001 18.1801V5.82007" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>

            </button>
            <button :class="classAttrs.controls.fullScreen" @click="isFullScreen = !isFullScreen"
                class="w-0 h-0 transform translate-x-0 flex overflow-hidden transition-all duration-[450ms] rounded-full border-none absolute top-0 left-0 bg-[#131218] shadow-sm shadow-[#fcab14] text-[#fff]"
                v-wave>
                <svg v-if="isFullScreen" class="m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
                        stroke="#fff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <svg v-else class="m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M15 2H17.5C19.99 2 22 4.01 22 6.5V9" stroke="#fff" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M22 16V17.5C22 19.99 19.99 22 17.5 22H16" stroke="#fff" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9 22H6.5C4.01 22 2 19.99 2 17.5V15" stroke="#fff" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconVolume from '@/components/icons/volume.vue'
import IconPlay from '@/components/icons/play.vue'
// @ts-ignore
import Slider from '@vueform/slider'

import axios from 'axios'
import Hammer from 'hammerjs'

import { usePlayerStore } from '@/store'
import { onClickOutside, useLocalStorage } from '@vueuse/core'

import { useTimeFormat } from "@/composables/timeFormat"

const store = usePlayerStore()

const isFavorite = computed(() => {
    return store.isFavorite(store.getCurrentMusic.id)
})
const isOpen = ref(false)
const isFullScreen = ref(false)

const parentElement = ref(null) as any;

const progressTime = {
    duration: computed(() => {
        return useTimeFormat(store.getCurrentMusic.duration)
    }),
    currentTime: computed(() => {
        store.progress
        return useTimeFormat(store.audio.currentTime)
    })
}


onClickOutside(parentElement, () => {
    isOpen.value = false
    isFullScreen.value = false
})

onMounted(() => {
    // @ts-ignore
    nextTick(() => {
        const mc = new Hammer(parentElement.value)
        mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
        mc.on('swipedown', () => {
            if (isFullScreen.value) {
                isFullScreen.value = false
            }
        })
    })
})

const progress = computed({
    get() {
        return store.progress
    },
    set(val: number) {
        store.setCurrentTime(val)
    }
})

watch([() => store.isShowPopUp, isFullScreen], () => {
    isOpen.value = false
})

const isShowLyrics = useLocalStorage('show-lyrics', true)
const toggleShowLyrics = () => {
    isShowLyrics.value = !isShowLyrics.value
}

const lyrics = reactive({
    isLoading: false,
    value: '',
    isError: false,
    isEmpty: false
})

watch([isFullScreen, () => store.currentMusicIndex, isShowLyrics], async () => {
    if (isFullScreen.value && isShowLyrics.value) {
        const id = store.getCurrentMusic.id;
        const url = `https://api-beta.melobit.com/v1/song/${id}`;

        lyrics.isLoading = true;
        lyrics.isError = false;
        lyrics.isEmpty = false;
        lyrics.value = "";

        try {
            const { data } = await axios.get(url)
            if (data.lyrics) {
                lyrics.value = data.lyrics
            } else {
                lyrics.isEmpty = false
            }
        } catch (error) {
            lyrics.isError = true;
            lyrics.isEmpty = true

        } finally {
            lyrics.isLoading = false;
        }
    }
})

const classAttrs = reactive({
    wrapper: computed(() => {
        if (isFullScreen.value) {
            return '!m-0 !inset-x-0 !bottom-0 !h-[calc(25vw+13rem)] !rounded-b-none !rounded-t-2xl !bg-[#16151c]'
        }

        if (store.isShowPopUp) {
            return '!right-0'
        }

        if (isOpen.value) {
            return '!bottom-36'
        }
    }),
    cover: computed(() => {
        if (isFullScreen.value) {
            return '!w-[50vw] !h-[50vw] -top-[25vw] inset-x-[25vw]'
        }

        if (isOpen.value) {
            return '!w-20 !h-20'
        }
    }),
    isShowLyrics: {
        wrapper: computed(() => {
            if (isFullScreen.value && isShowLyrics.value) {
                return '!h-[calc(100%-50vw)]'
            }
        }),
    },
    controls: {
        default: computed(() => {
            if (isFullScreen.value) {
                return 'w-full h-12 left-[calc(calc(100vw-19rem)/2)] bottom-2 top-auto py-2 w-[19rem]'
            }
        }),
        play: computed(() => {
            if (isFullScreen.value) {
                return '!w-12 !h-12 !left-1/2 !translate-x-[-1.5rem]'
            }

            if (isOpen.value) {
                return '!w-12 !h-12 !left-[-106px] !top-[-24px]'
            }
        }),
        next: computed(() => {
            if (isFullScreen.value) {
                return '!w-12 !h-12 !left-[calc(50%+3rem+15px)] !translate-x-[-1.5rem]'
            }

            if (isOpen.value) {
                return '!w-12 !h-12 !left-[-74px] !top-[-86px]'
            }
        }),
        disabledNext: computed(() => {
            if (store.isSongEndOfPlayList) {
                return 'disabled-player-control'
            }
        }),
        prev: computed(() => {
            if (isFullScreen.value) {
                return '!w-12 !h-12 !left-[calc(50%-3rem-15px)] !translate-x-[-1.5rem]'
            }

            if (isOpen.value) {
                return '!w-12 !h-12 !left-[-74px] !top-[38px]'
            }
        }),
        disabledPrev: computed(() => {
            if (store.isSongStartOfPlayList) {
                return 'disabled-player-control'
            }
        }),
        fullScreen: computed(() => {
            if (isFullScreen.value) {
                return '!w-12 !h-12 !left-[calc(50%-6rem-30px)] !translate-x-[-1.5rem]'
            }

            if (isOpen.value) {
                return '!w-12 !h-12 !left-[-10px] !top-[52px]'
            }
        }),
        volume: computed(() => {
            if (isFullScreen.value) {
                return '!w-12 !h-12 !left-[calc(50%+6rem+30px)] !translate-x-[-1.5rem]'
            }

            if (isOpen.value) {
                return '!w-12 !h-12 !left-[-10px] !top-[-100px]'
            }
        }),
        volumeString: computed(() => {
            if (store.getVolume === 0) {
                return '!shadow-[#ff0000] !text-[#ff0000]'
            }

        })
    },
    progressCircle: computed(() => {
        if (isFullScreen.value) {
            return document.documentElement.offsetWidth / 4
        }

        if (isOpen.value) {
            return 40
        }

        return 24
    }),
})
</script>

<style src="@vueform/slider/themes/default.css">
</style>

<style>
.disabled-player-control {
    @apply pointer-events-none;

    path {
        @apply stroke-[#413d4a];
    }
}

.left-\[calc\(calc\(100vw-19rem\)\/2\)\] {
    left: calc(calc(100vw - 19rem) / 2) !important;
}

:root {
    --slider-bg: #131218;
    --slider-connect-bg: #fcab14;
    --slider-handle-bg: #da910b;
}
</style>