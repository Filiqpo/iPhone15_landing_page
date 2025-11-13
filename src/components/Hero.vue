<script setup>
import gsap from "gsap";
import { onMounted, onUnmounted, ref } from "vue";
import { heroVideo, smallHeroVideo } from "../utils";

const videoSrc = ref(window.innerWidth < 760 ? smallHeroVideo : heroVideo);

const handleVideoSrcSet = () => {
  if (window.innerWidth < 760) {
    videoSrc.value = smallHeroVideo;
  } else {
    videoSrc.value = heroVideo;
  }
};

onMounted(() => {
  gsap.to("#hero", { opacity: 1, delay: 1.5 });
  gsap.to("#cta", { opacity: 1, y: -50, delay: 2 });
  window.addEventListener("resize", handleVideoSrcSet);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleVideoSrcSet);
});
</script>

<template>
  <section class="w-full nav-height bg-black relative">
    <div class="h-5/6 w-full flex items-center justify-center flex-col">
      <p id="hero" class="hero-title">iPhone 15 Pro</p>
      <div class="md:w-10/12 w-9/12">
        <video class="pointer-events-none" autoplay muted :playsinline="true">
          <source :src="videoSrc" type="video/mp4" />
        </video>
      </div>
    </div>
    <div id="cta" class="flex flex-col items-center opacity-0 translate-y-20">
      <a href="#highlights" class="btn">Buy</a>
      <p class="font-normal text-xl">From $199/month or $999</p>
    </div>
  </section>
</template>

<style scoped></style>
