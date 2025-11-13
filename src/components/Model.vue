<script setup>
import { onMounted, ref, reactive } from "vue";
import gsap from "gsap";
import ModelView from "./ModelView.vue";
import { yellowImg } from "../utils";

const size = ref("small");
const model = reactive({
  title: "iPhone 15 pro in Natural Titanium",
  color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
  img: yellowImg,
});

// camera controls
const cameraControlSmall = ref([]);
const cameraControlLarge = ref([]);

onMounted(() => {
  gsap.to("#heading", { y: 0, opacity: 1 });
});
</script>

<template>
  <section class="common-padding">
    <div class="screen-max-width">
      <h1 id="heading" class="section-heading">Take a closer look.</h1>
      <div class="flex flex-col items-center mt-5">
        <div class="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
          <ModelView />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
