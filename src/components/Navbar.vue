<script setup>
import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../const";
</script>

<template>
  <header class="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
    <nav class="flex w-full screen-max-width">
      <img :src="appleImg" alt="Apple" :width="14" :height="18" />
      <div class="flex justify-center max-sm:hidden flex-1">
        <div
          class="px-5 text-sm cursor-pointer text-[#86868b] hover:text-white transition-all"
          v-for="nav in navLists"
          :key="nav"
        >
          {{ nav }}
        </div>
      </div>
      <div class="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
        <img :src="searchImg" alt="search" :width="18" :height="18" />
        <img :src="bagImg" alt="bag" :width="18" :height="18" />
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
