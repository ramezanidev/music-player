<template>
  <div v-once
    class="bg-[#0c0b11] z-10 h-12 w-64 rounded-full fixed bottom-8 left-1/2 transform -translate-x-1/2 grid grid-cols-4 overflow-hidden border-t-0 border border-solid border-[#232128]">
    <!---------------------------------------/ home /--->
    <router-link to="/" v-wave>
      <span></span>
      <span>
        <svg width="24" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z" stroke-width="1.5"
            stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke-width="1.5"
            stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z"
            stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke-width="1.5"
            stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </router-link>
    <!---------------------------------------/ favorite /--->
    <router-link to="/album" v-wave>
      <span></span>
      <span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15Z" stroke="#292D32"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M7 2.5V21.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M11.47 16.8C12.2929 16.8 12.96 16.133 12.96 15.3101C12.96 14.4872 12.2929 13.8201 11.47 13.8201C10.6471 13.8201 9.97998 14.4872 9.97998 15.3101C9.97998 16.133 10.6471 16.8 11.47 16.8Z"
            stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M18.43 14.31V8.48002C18.43 7.24002 17.65 7.07007 16.86 7.28007L13.88 8.09006C13.34 8.24006 12.96 8.67001 12.96 9.29001V10.3301V11.0301V15.3"
            stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M16.9299 15.8C17.7528 15.8 18.4199 15.133 18.4199 14.3101C18.4199 13.4872 17.7528 12.8201 16.9299 12.8201C16.107 12.8201 15.4399 13.4872 15.4399 14.3101C15.4399 15.133 16.107 15.8 16.9299 15.8Z"
            stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12.96 11.04L18.43 9.55005" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>

      </span>
    </router-link>
    <!---------------------------------------/  /--->
    <router-link to="/play-list" v-wave>
      <span></span>
      <span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      </span>
    </router-link>
    <!---------------------------------------/  /--->
    <router-link to="/artist" v-wave>
      <span></span>
      <span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
            stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#292D32"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

      </span>
    </router-link>
  </div>
</template>

<style lang="scss">
a {
  @apply text-white flex justify-center items-center relative underline-transparent h-full;

  &>span:first-child {
    @apply flex w-2 h-2 opacity-0 transition-all rounded-full bg-[#fcab14] shadow-[#fcab14] shadow -top-1 left-1/2 transform -translate-x-1/2 absolute;
  }

  &>span:last-of-type {
    @apply flex h-full items-center;
  }

  &.router-link-active>span:first-child {
    @apply opacity-100;
  }

  & path {
    @apply stroke-[#bcbcbe] transition-all;
  }

  &.router-link-active path {
    @apply stroke-[#fcab14];
  }
}
</style>