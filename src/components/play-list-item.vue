<script setup lang="ts">
import IconPlay from '@/components/icons/play.vue'
import { usePlayerStore } from '@/store'
import { useTimeFormat } from "@/composables/timeFormat"

const store = usePlayerStore();

const emit = defineEmits(['play'])

const play = () => {
    emit("play")
}

const props = defineProps({
    music: {
        type: Object as any,
        default: () => ({})
    },
})

const music = computed(() => props.music)
</script>

<template>
    <div class="w-full text-[#e0e0e1] flex h-16 overflow-hidden">
        <img draggable="false" class="rounded-lg select-none object-center object-cover w-16 h-16"
            :src="music.cover" />
        <div class="flex select-none items-baseline w-[calc(100%-11.5rem)] flex-col ml-2 justify-between py-0.5">
            <p class="text-white w-full overflow-ellipsis overflow-hidden whitespace-nowrap">{{
                    music.title
            }}</p>
            <router-link :to="`/artist/${music.artist_id}`" class="text-xs !justify-start !h-auto text-[#fcab14]">
                {{ music.artist}}
            </router-link>
            <span class="text-xs text-[#bcbcbe]">{{ useTimeFormat(music.duration) }}</span>

        </div>
        <div class="ml-auto flex items-center gap-x-2">
            <a v-wave :href="music.url" :download="music.url"
                class="bg-transparent text-[#e0e0e1] p-2.5 rounded-full border-none w-10 h-10 flex justify-center flex-col gap-y-1.5 p-1">
                <svg width="24" class="m-auto" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">

                    <path d="M18.0699 14.4299L11.9999 20.4999L5.92993 14.4299" stroke="#e0e0e1" stroke-width="1.5"
                        stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 3.5V20.33" stroke="#e0e0e1" stroke-width="1.5" stroke-miterlimit="10"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </a>
            <button v-wave
                @click="(store.getPlayingId === music.id) ? store.changePlayPause() :  play()"
                class="bg-transparent text-[#e0e0e1] p-2.5 rounded-full border-none w-10 h-10 flex justify-center flex-col gap-y-1.5 p-1">
                <IconPlay v-if="store.getPlayingId === music.id" />
                <svg v-else width="24" class="m-auto" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4 11.9999V8.43989C4 4.01989 7.13 2.2099 10.96 4.4199L14.05 6.1999L17.14 7.9799C20.97 10.1899 20.97 13.8099 17.14 16.0199L14.05 17.7999L10.96 19.5799C7.13 21.7899 4 19.9799 4 15.5599V11.9999Z"
                        stroke="#e0e0e1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    </div>
</template>