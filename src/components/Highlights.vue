<script setup>
import { onMounted } from "vue";
import VideoCarousel from "./VideoCarousel.vue";
import gsap from "gsap";
import { rightImg, watchImg } from "../utils";

onMounted(() => {
  gsap.to("#title", { opacity: 1, y: 0 });
  gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
});
</script>

<template>
  <section
    id="highlights"
    class="w-screen overflow-hidden h-full common-padding bg-[#101010]"
  >
    <div class="screen-max-width">
      <div class="mb-12 w-full md:flex items-center justify-between">
        <h1 id="title" class="section-heading">Get the highlights.</h1>
        <div class="flex flex-wrap items-end gap-5">
          <p class="link">
            Watch the film
            <img :src="watchImg" alt="watch" class="ml-2" />
          </p>
          <p class="link">
            Watch the event
            <img :src="rightImg" alt="watch" class="ml-2" />
          </p>
        </div>
      </div>

      <VideoCarousel />
    </div>
  </section>
</template>

<style scoped></style>
