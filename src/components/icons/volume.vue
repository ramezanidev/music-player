<template>
    <svg v-if="store.getVolume === 0" class="m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M15 8.37003V7.41003C15 4.43003 12.93 3.29003 10.41 4.87003L7.49 6.70003C7.17 6.89003 6.8 7.00003 6.43 7.00003H5C3 7.00003 2 8.00003 2 10V14C2 16 3 17 5 17H7"
            stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10.41 19.13C12.93 20.71 15 19.56 15 16.59V12.95" stroke="#ff0000" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" />
        <path d="M18.81 9.41992C19.71 11.5699 19.44 14.0799 18 15.9999" stroke="#ff0000" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" />
        <path d="M21.15 7.80005C22.62 11.29 22.18 15.37 19.83 18.5" stroke="#ff0000" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" />
        <path d="M22 2L2 22" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <svg v-if="store.getVolume === 30" class="m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5.5 10V14C5.5 16 6.5 17 8.5 17H9.93C10.3 17 10.67 17.11 10.99 17.3L13.91 19.13C16.43 20.71 18.5 19.56 18.5 16.59V7.41003C18.5 4.43003 16.43 3.29003 13.91 4.87003L10.99 6.70003C10.67 6.89003 10.3 7.00003 9.93 7.00003H8.5C6.5 7.00003 5.5 8.00003 5.5 10Z"
            stroke="#fff" stroke-width="1.5" />
    </svg>

    <svg v-if="store.getVolume === 60" class="m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M3.32996 10V14C3.32996 16 4.32996 17 6.32996 17H7.75996C8.12996 17 8.49996 17.11 8.81996 17.3L11.74 19.13C14.26 20.71 16.33 19.56 16.33 16.59V7.41003C16.33 4.43003 14.26 3.29003 11.74 4.87003L8.81996 6.70003C8.49996 6.89003 8.12996 7.00003 7.75996 7.00003H6.32996C4.32996 7.00003 3.32996 8.00003 3.32996 10Z"
            stroke="#fff" stroke-width="1.5" />
        <path d="M19.33 8C21.11 10.37 21.11 13.63 19.33 16" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>

    <svg v-if="store.getVolume === 100" class="m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M2 10V14C2 16 3 17 5 17H6.43C6.8 17 7.17 17.11 7.49 17.3L10.41 19.13C12.93 20.71 15 19.56 15 16.59V7.41003C15 4.43003 12.93 3.29003 10.41 4.87003L7.49 6.70003C7.17 6.89003 6.8 7.00003 6.43 7.00003H5C3 7.00003 2 8.00003 2 10Z"
            stroke="#fff" stroke-width="1.5" />
        <path d="M18 8C19.78 10.37 19.78 13.63 18 16" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M19.83 5.5C22.72 9.35 22.72 14.65 19.83 18.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/store'
const store = usePlayerStore()
</script>