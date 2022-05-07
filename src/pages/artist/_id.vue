<script lang="ts" setup>
import { useHead } from '@vueuse/head';
import axios from 'axios'
import { usePlayerStore } from '@/store'
import IconPlay from '@/components/icons/play.vue'
// ---------------------------------
const loading = ref(false)
const fetchError = ref(false)
const artist = reactive({
    info: null,
    albums: [],
    songs: []
}) as any

const getData = async () => {
    loading.value = true;
    try {
        const artistInfo = await axios.get('https://api-beta.melobit.com/v1/artist/byId/' + route.params.id)
        const artistAlbums = await axios.get('https://api-beta.melobit.com/v1/artist/albums/' + route.params.id + '/0/5')
        const artistTopSong = await axios.get('https://api-beta.melobit.com/v1/artist/songs/top/' + route.params.id + '/0/5')
        artist.info = artistInfo.data
        artist.albums = artistAlbums.data.results
        artist.songs = artistTopSong.data.results
        fetchError.value = false
    } catch (error) {
        fetchError.value = true
    } finally {
        loading.value = false;
    }
}
const route = useRoute()
getData()
// ----------------------------
const loadedMoreSongs = ref(false)
const errorOnLoadMoreSongs = ref(false)
const loadMoreSongs = async () => {
    try {
        const { data } = await axios.get('https://api-beta.melobit.com/v1/artist/songs/' + route.params.id + '/0/100')
        artist.songs = [...artist.songs, ...data.results]
    } catch (error) {
        errorOnLoadMoreSongs.value = true
    } finally {
        loadedMoreSongs.value = true;
    }
}
// ------------------------------
const loadedMoreAlbums = ref(false)
const errorOnLoadMoreAlbums = ref(false)
const loadMoreAlbums = async () => {
    try {
        const { data } = await axios.get('https://api-beta.melobit.com/v1/artist/albums/' + route.params.id + '/0/100')
        artist.albums = [...artist.albums, ...data.results]
    } catch (error) {
        errorOnLoadMoreAlbums.value = true
    } finally {
        loadedMoreAlbums.value = true;
    }
}
// ------------------------------
const isShowHeader = ref(false)
const onScroll = (event: any) => {
    const ScrollTop = event.target.scrollTop;
    const x = event.target.clientWidth;
    if (ScrollTop > x) {
        isShowHeader.value = true
    } else {
        isShowHeader.value = false
    }
}
const store = usePlayerStore()

const play = (newPlayList: Array<any>, index: number) => {
    store.changePlayList(newPlayList, index)
}


useHead({
    title: computed(() => artist.info?.fullName)
})
</script>

<template>
    <div @scroll="onScroll" class="h-full scroll-smooth scroll-auto scrollbar-thin pb-20 box-border">
        <div class="w-full pt-[100%] relative">
            <div v-if="loading" class="absolute inset-0 bg-[#232128] animate-pulse"></div>
            <div class="absolute inset-0  z-20" :class="{ 'header': isShowHeader }">
                <img class="w-full h-full object-cover object-center" v-if="artist.info"
                    :src="artist.info.image.cover_small.url">
                <div class="absolute inset-0 bg-gradient-to-t from-[#000] from-opacity-75"></div>
                <div v-if="artist.info" class="absolute inset-0 flex flex-col justify-end p-4">
                    <span
                        class="text-2xl overflow-hidden overflow-ellipsis w-full font-bold text-shadow-sm text-[#fcab14]">{{
                                artist.info.fullName
                        }}</span>
                    <span class="text-xs text-[#bcbcbe]">Followers: <span class="text-[#fcab14]">{{
                            Math.round(artist.info.followersCount / 1000) || 1
                    }}k</span></span>
                </div>
            </div>
        </div>
        <div class="w-full p-4 box-border" v-if="artist.songs.length">
            <div class="w-full flex justify-between items-center h-8 pb-2">
                <h4 class="text-white font-normal">Top Songs: </h4>
                <button @click.once="loadMoreSongs" v-if="!loadedMoreSongs"
                    class="bg-transparent flex items-center rounded-lg border-none text-white h-full px-2 -mr-2" v-wave>
                    <span>{{ errorOnLoadMoreSongs ? 'Error, please' : 'Load More' }}</span>
                    <svg v-if="!errorOnLoadMoreSongs" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008"
                            stroke="#fff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.89 5.0799C14.02 4.8199 13.06 4.6499 12 4.6499C7.20996 4.6499 3.32996 8.5299 3.32996 13.3199C3.32996 18.1199 7.20996 21.9999 12 21.9999C16.79 21.9999 20.67 18.1199 20.67 13.3299C20.67 11.5499 20.13 9.8899 19.21 8.5099"
                            stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16.13 5.32L13.24 2" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M16.13 5.32007L12.76 7.78007" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <ul class=" border box-border border-[#232128] border-solid rounded-lg overflow-hidden w-full list-none">
                <li v-for="(song, index) in artist.songs" v-memo="[song.id === store.getPlayingId]" @click="play([song], 0)" :key="index"
                    class="flex py-1 px-1.5 border border-t-[#232128] border-solid items-center text-[#ddd] text-sm h-12 overflow-hidden">
                    <img class="w-12 h-12 object-center object-cover rounded" :src="song.image.thumbnail_small.url">
                    <span class="ml-2">{{ song.title }}</span>
                    <div class="ml-auto flex items-center gap-x-2">
                        <a v-wave @click.stop :href="song.audio.medium.url" :download="song.audio.medium.url"
                            class="bg-transparent text-[#e0e0e1] p-2.5 rounded-full border-none w-10 h-10 flex justify-center flex-col gap-y-1.5 p-1">
                            <svg width="24" class="m-auto" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">

                                <path d="M18.0699 14.4299L11.9999 20.4999L5.92993 14.4299" stroke="#e0e0e1"
                                    stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M12 3.5V20.33" stroke="#e0e0e1" stroke-width="1.5" stroke-miterlimit="10"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>
                        <button v-wave
                            @click.stop="(store.getPlayingId === song.id) ? store.changePlayPause() : play([song], 0)"
                            class="bg-transparent text-[#e0e0e1] p-2.5 rounded-full border-none w-10 h-10 flex justify-center flex-col gap-y-1.5 p-1">
                            <IconPlay v-if="store.getPlayingId === song.id" />
                            <svg v-else width="24" class="m-auto" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4 11.9999V8.43989C4 4.01989 7.13 2.2099 10.96 4.4199L14.05 6.1999L17.14 7.9799C20.97 10.1899 20.97 13.8099 17.14 16.0199L14.05 17.7999L10.96 19.5799C7.13 21.7899 4 19.9799 4 15.5599V11.9999Z"
                                    stroke="#e0e0e1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="w-full p-4 box-border" v-if="artist.albums.length">
            <div class="w-full flex justify-between items-center h-8 pb-2">
                <h4 class="text-white font-normal">Albums: </h4>
                <button @click.once="loadMoreAlbums" v-if="!loadedMoreAlbums"
                    class="bg-transparent flex items-center rounded-lg border-none text-white h-full px-2 -mr-2" v-wave>
                    <span>{{ errorOnLoadMoreAlbums ? 'Error, please' : 'Load More' }}</span>
                    <svg v-if="!errorOnLoadMoreAlbums" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008"
                            stroke="#fff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.89 5.0799C14.02 4.8199 13.06 4.6499 12 4.6499C7.20996 4.6499 3.32996 8.5299 3.32996 13.3199C3.32996 18.1199 7.20996 21.9999 12 21.9999C16.79 21.9999 20.67 18.1199 20.67 13.3299C20.67 11.5499 20.13 9.8899 19.21 8.5099"
                            stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16.13 5.32L13.24 2" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M16.13 5.32007L12.76 7.78007" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <ul class=" border box-border border-[#232128] border-solid rounded-lg overflow-hidden w-full list-none">
                <router-link :to="`/album/${album.id}`" v-memo="[artist.albums]" v-for="(album, index) in artist.albums" :key="index"
                    class="flex py-1 px-1.5 border w-full justify-start border-t-[#232128] border-solid items-center text-[#ddd] text-sm h-12 overflow-hidden">
                    <img class="w-12 h-12 object-center object-cover rounded" :src="album.image.thumbnail_small.url">
                    <span class="ml-2">{{ album.name }}</span>
                    <svg class="ml-auto mr-4" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008"
                            stroke="#fff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </router-link>
            </ul>
        </div>
    </div>

</template>

<style scoped lang="scss">
.header {
    background: #1f1e26;
    box-shadow: -10px 10px 25px #232128;
    @apply flex items-center h-16 w-full fixed px-4;

    img {
        position: unset;
        @apply w-13 h-13 rounded-full;
    }

    &>div:nth-of-type(1) {
        @apply from-opacity-0;
    }

    &>div:nth-of-type(2) {
        position: unset;

        &>span:nth-of-type(1) {
            @apply text-xl;
        }
    }
}
</style>