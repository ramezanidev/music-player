<template>
    <component :is="isLink ? 'router-link' : 'div'" :to="props.to"
        class="w-full box-border odd:-mt-4 odd:mb-4 relative pt-[100%] overflow-hidden rounded-lg shadow-md">
        <div class="absolute inset-0">
            <div v-if="isLoadingCover" class="bg-[#232128] animate-pulse w-full h-full"></div>
            <p v-if="isErrorLoadCover" class="absolute inset-0 bg-[#232128] flex w-full h-full">
                <svg class="m-auto w-9 h-9 pb-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.28003 22C8.00316 22 9.40003 20.6031 9.40003 18.88C9.40003 17.1569 8.00316 15.76 6.28003 15.76C4.55691 15.76 3.16003 17.1569 3.16003 18.88C3.16003 20.6031 4.55691 22 6.28003 22Z"
                        stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M20.84 16.8001V4.60009C20.84 2.00009 19.21 1.64009 17.56 2.09009L11.32 3.79009C10.18 4.10009 9.40002 5.00009 9.40002 6.30009V8.47009V9.93009V18.8701"
                        stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M17.72 19.9199C19.4431 19.9199 20.84 18.5231 20.84 16.7999C20.84 15.0768 19.4431 13.6799 17.72 13.6799C15.9968 13.6799 14.6 15.0768 14.6 16.7999C14.6 18.5231 15.9968 19.9199 17.72 19.9199Z"
                        stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9.40002 9.5199L20.84 6.3999" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </p>
            <img v-else @error="errorOnLoadImageCover" @load="onLoadedCover"
                class="absolute inset-0 select-none object-center object-cover w-full h-full" :src="props.img" />
            <div class="absolute select-none inset-0 p-3 bg-gradient-to-t from-[#000] flex flex-col items-baseline justify-end"
                :class="{ 'from-opacity-0': isErrorLoadCover }">
                <button v-wave
                    class="bg-transparent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#e0e0e1] p-2.5 rounded-full border-none w-10 h-10 flex justify-center flex-col gap-y-1.5 p-1">
                    <IconPlay v-if="store.getPlayingId === props.id" />
                </button>
                <p class="text-white w-full overflow-ellipsis overflow-hidden whitespace-nowrap">{{ props.title }}</p>
                <router-link @click.stop :to="`/artist/${props.artistId}`" class="text-xs !justify-start !h-auto text-[#fcab14]">{{
                        props.artist
                }}</router-link>
            </div>
        </div>
    </component>
</template>

<script setup lang="ts">
import IconPlay from '@/components/icons/play.vue'
import { usePlayerStore } from '@/store'

const store = usePlayerStore()

const props = defineProps({
    img: {
        type: String,
        default: ''
    },
    artist: {
        type: String,
        default: 'Artist'
    },
    title: {
        type: String,
        default: 'Music'
    },
    artistId: {
        type: [String, Number],
        default: 0
    },
    to: {
        type: String,
        default: ""
    },
    id: {
        type: String
    }
})

const isLink = computed(() => {
    return Boolean(props.to)
})

const isErrorLoadCover = ref(false)
const isLoadingCover = ref(true)

const errorOnLoadImageCover = () => {
    isErrorLoadCover.value = true;
    isLoadingCover.value = false
}

const onLoadedCover = () => {
    isErrorLoadCover.value = false;
    isLoadingCover.value = false
}
</script>
