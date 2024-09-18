import { defineStore } from "pinia";

import { useLocalStorage } from "@vueuse/core";

const favorite = useLocalStorage("favorite", []);
const history = useLocalStorage("history", []);

export const usePlayerStore = defineStore("player", {
  state: () => {
    return {
      audio: new Audio(),
      volume: 100,
      progress: 0,
      totalTime: 0,
      currentTime: 0,
      playList: [] as any,
      currentMusicIndex: 0,
      isPlay: false,
      isPlaying: true,
      isLoadingSong: true,
      isErrorOnPlaySong: false,
      isErrorOnLoadSong: false,
      endedPlayList: false,
      // flags
      isOpenMenu: false,
    };
  },

  getters: {
    favorites() {
      return favorite.value;
    },
    history() {
      return history.value;
    },
    isShowPopUp(): boolean {
      return Boolean(this.playList.length);
    },
    isSongEndOfPlayList(): boolean {
      return this.playList.length - 1 === this.currentMusicIndex;
    },
    isSongStartOfPlayList(): boolean {
      return 0 === this.currentMusicIndex;
    },
    getCurrentMusic(state) {
      const currentMusic = state.playList[state.currentMusicIndex];
      return {
        cover: currentMusic?.cover ?? "",
        src: currentMusic?.url ?? "",
        id: currentMusic?.id ?? "",
        duration: currentMusic?.duration ?? 0,
        title: currentMusic?.name ?? "",
        artist: currentMusic?.artist ?? "",
        lyrics: currentMusic?.lyrics ?? "",
        album: currentMusic?.album ?? "",
      };
    },
    getPlayingId(): string {
      return this.getCurrentMusic.id;
    },
    getVolume(): number {
      return this.volume;
    },
    isFavorite(state) {
      return (id: string): boolean => {
        const fav = this.favorites.find((item: any) => item.id === id);
        return Boolean(fav);
      };
    },
    getProgress(state) {
      return (size: number): number => {
        if (state.progress < 0) {
          state.progress = 0;
        }
        if (state.progress > 100) {
          state.progress = 100;
        }
        return -((100 - state.progress) / 100) * Math.PI * (size * 2);
      };
    },
  },

  actions: {
    setCurrentTime(time: number) {
      const duration = this.getCurrentMusic.duration;
      this.audio.currentTime = (duration * time) / 100;
    },
    addFavorite() {
      favorite.value.unshift(this.playList[this.currentMusicIndex] as never);
    },
    addHistory() {
      history.value = history.value.filter(({id}) => {
        return id !== this.getCurrentMusic.id;
      });
      history.value.unshift(this.playList[this.currentMusicIndex] as never);
      if (history.value.length > 20) {
        history.value = history.value.slice(0, 20);
      }
    },
    removeFavorite() {
      favorite.value = this.favorites.filter((item: any) => {
        return item.id !== this.getCurrentMusic.id;
      });
    },
    changePlayPause() {
      if (this.endedPlayList) {
        this.changePlayList(this.playList, 0)
      } else {
        this.isPlay ? this.audio.pause() : this.audio.play();
        if (this.isPlay) {
          this.isPlay = false;
        } else {
          this.isPlay = true;
        }
      }
    },
    next() {
      if (!this.isSongEndOfPlayList) {
        this.currentMusicIndex++;
        this.audio.src = this.getCurrentMusic.src;
        return true;
      } else return false;
    },
    prev() {
      if (!this.isSongStartOfPlayList) {
        this.currentMusicIndex--;
        this.audio.src = this.getCurrentMusic.src;
        return true;
      } else return true;
    },
    changePlayList(newPlayList: Array<any>, index: number) {
      //reset parametrs
      this.progress = 0;
      this.isErrorOnLoadSong = false;
      this.totalTime = 0;
      this.currentTime = 0;

      this.isPlay = true;
      this.playList = JSON.parse(JSON.stringify(newPlayList));
      this.currentMusicIndex = index;
    },
    changeVolume() {
      switch (this.volume) {
        case 0: {
          this.volume = 30;
          break;
        }
        case 30: {
          this.volume = 60;
          break;
        }
        case 60: {
          this.volume = 100;
          break;
        }
        case 100: {
          this.volume = 0;
          break;
        }
        default: {
          this.volume = 100;
        }
      }

      this.audio.volume = this.volume / 100;
    },
  },
});

nextTick(() => {
  const store = usePlayerStore();

  watch(
    () => store.getCurrentMusic,
    () => {
      const src = store.getCurrentMusic.src;
      store.endedPlayList = false;
      if (src) {
        store.audio.src = src;
        store.audio.volume = store.volume / 100;
        store.isLoadingSong = true;
        store.isPlaying = false;
        store.addHistory();
        // show notify
        if ("mediaSession" in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: store.getCurrentMusic.title,
            artist: store.getCurrentMusic.artist,
            album: store.getCurrentMusic.album,
            artwork: [
              {
                src: store.getCurrentMusic.cover,
                sizes: "150x150",
                type: "image/png",
              },
            ],
          });
          // controler
          navigator.mediaSession.setActionHandler("nexttrack", store.next);
          navigator.mediaSession.setActionHandler("previoustrack", store.prev);
          navigator.mediaSession.setActionHandler("stop", () => {
            store.changePlayList([], 0);
          });
          navigator.mediaSession.setActionHandler("seekbackward", (details) => {
            store.audio.currentTime -= 15;
            navigator.mediaSession.setPositionState({
              duration: store.audio.duration,
              playbackRate: store.audio.playbackRate,
              position: store.audio.currentTime,
            });
          });

          navigator.mediaSession.setActionHandler("seekforward", (details) => {
            store.audio.currentTime += 15;
            navigator.mediaSession.setPositionState({
              duration: store.audio.duration,
              playbackRate: store.audio.playbackRate,
              position: store.audio.currentTime,
            });
          });

          navigator.mediaSession.setActionHandler("seekto", (details) => {
            navigator.mediaSession.setPositionState({
              duration: store.audio.duration,
              playbackRate: store.audio.playbackRate,
              position: store.audio.currentTime,
            });
          });
        }
      } else {
        store.isPlay = false;
        store.isPlaying = false;
      }
    },
    { deep: true }
  );

  store.audio.addEventListener("loadeddata", () => {
    store.isLoadingSong = false;
    if (store.isPlay) {
      store.audio.play();
    }
  });

  store.audio.addEventListener("waiting", () => {
    store.isLoadingSong = true;
    store.isPlaying = false;
  });
  store.audio.addEventListener("timeupdate", () => {
    store.progress =
      (store.audio.currentTime / store.getCurrentMusic.duration) * 100;
  });
  store.audio.addEventListener("play", () => {
    store.isPlaying = true;
    store.isLoadingSong = false;
  });
  store.audio.addEventListener("playing", () => {
    store.isPlaying = true;
    store.isLoadingSong = false;
  });

  store.audio.addEventListener("pause", () => {
    store.isPlaying = false;
  });
  store.audio.addEventListener("ended", () => {
    if (!store.next()) {
      store.endedPlayList = true;
    }
  });
  store.audio.addEventListener("ratechange", () => {
    navigator.mediaSession.setPositionState({
      duration: store.audio.duration,
      playbackRate: store.audio.playbackRate,
      position: store.audio.currentTime,
    });
  });
});
