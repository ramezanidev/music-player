<template>
    <svg v-if="store.isLoadingSong" class="m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path class="animate-spin origin-center"
            d="M4.02 5.97C2.75 7.65 2 9.74 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2"
            stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path class="animate-spin-reverse origin-center"
            d="M5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12C19 8.13 15.87 5 12 5" stroke="#fff"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path class="animate-spin origin-center" d="M12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8" stroke="#fff"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>


    <svg v-else-if="!props.showOnlyLoading && store.endedPlayList" class="m-auto" width="20" height="20"
        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14.55 21.67C18.84 20.54 22 16.64 22 12C22 6.48 17.56 2 12 2C5.33 2 2 7.56 2 7.56M2 7.56V3M2 7.56H4.01H6.44"
            stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M2 12C2 17.52 6.48 22 12 22" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" stroke-dasharray="3 3" />
    </svg>

    <svg v-else-if="!props.showOnlyLoading && store.isPlaying" class="m-auto" width="20" height="20" viewBox="0 0 24 24"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10.65 19.11V4.89C10.65 3.54 10.08 3 8.64 3H5.01C3.57 3 3 3.54 3 4.89V19.11C3 20.46 3.57 21 5.01 21H8.64C10.08 21 10.65 20.46 10.65 19.11Z"
            stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M21 19.11V4.89C21 3.54 20.43 3 18.99 3H15.36C13.93 3 13.35 3.54 13.35 4.89V19.11C13.35 20.46 13.92 21 15.36 21H18.99C20.43 21 21 20.46 21 19.11Z"
            stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <svg v-else-if="!props.showOnlyLoading" class="m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4 11.9999V8.43989C4 4.01989 7.13 2.2099 10.96 4.4199L14.05 6.1999L17.14 7.9799C20.97 10.1899 20.97 13.8099 17.14 16.0199L14.05 17.7999L10.96 19.5799C7.13 21.7899 4 19.9799 4 15.5599V11.9999Z"
            stroke="#fff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/store'
const store = usePlayerStore()
const props = defineProps({
    showOnlyLoading: {
        type: Boolean,
        default: false
    }
})
</script>

<style>
.animate-spin-reverse {
    -webkit-animation: spin-reverse 1s linear infinite;
    animation: spin-reverse 1s linear infinite;
}

@keyframes spin-reverse {
    0% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }

    100% {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
    }
}
</style>