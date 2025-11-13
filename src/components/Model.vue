<script setup>
import { onMounted, ref, reactive } from "vue";
import gsap from "gsap";
import ModelView from "./ModelView.vue";
import { yellowImg } from "../utils";
import * as THREE from "three";
import TresCanvas from "@tresjs/core";
import { models, sizes } from "../const";

const size = ref("small");
const model = reactive({
  title: "iPhone 15 pro in Natural Titanium",
  color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
  img: yellowImg,
});

// camera controls
const cameraControlSmall = ref([]);
const cameraControlLarge = ref([]);

// model
const small = ref(new THREE.Group());
const large = ref(new THREE.Group());

// rotation
const smallRotation = ref(0);
const largeRotation = ref(0);

const setSmallRotation = (value) => {
  smallRotation.value = value;
};
const setLargeRotation = (value) => {
  largeRotation.value = value;
};

const canvasStyle = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  overflow: "hidden",
};

const appRoot = ref(null);
const eventSource = ref(null);

function handleModelChange(item) {
  Object.assign(model, item);
}
function handleSizeChange(value) {
  size.value = value;
}

onMounted(() => {
  gsap.to("#heading", { y: 0, opacity: 1 });

  eventSource.value = appRoot.value || document.body;
});
</script>

<template>
  <section class="common-padding">
    <div class="screen-max-width">
      <h1 id="heading" class="section-heading">Take a closer look.</h1>
      <div class="flex flex-col items-center mt-5">
        <div class="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
          <ModelView
            :index="1"
            :groupRef="small"
            gsapType="view1"
            :controlRef="cameraControlSmall"
            :setRotationState="setSmallRotation"
            :item="model"
            :size="size"
          />
          <ModelView
            :index="2"
            :groupRef="large"
            gsapType="view2"
            :controlRef="cameraControlLarge"
            :setRotationState="setLargeRotation"
            :item="model"
            :size="size"
          />
          <TresCanvas
            class="w-full h-full"
            :style="canvasStyle"
            :eventSource="eventSource"
          >
          </TresCanvas>
        </div>
        <div class="mx-auto w-full">
          <p class="text-sm font-light text-center mb-5">{{ model.title }}</p>
          <div class="flex items-center justify-center">
            <ul class="color-container">
              <li
                class="w-6 h-6 rounded-full mx-2 cursor-pointer"
                v-for="(item, i) in models"
                :key="i"
                :style="{ backgroundColor: item.color[0] }"
                @click="handleModelChange(item)"
              />
            </ul>
            <button class="size-btn-container">
              <span
                class="size-btn cursor-pointer"
                v-for="{ label, value } in sizes"
                :key="label"
                :style="{
                  backgroundColor: size === value ? 'white' : 'transparent',
                  color: size === value ? 'black' : 'white',
                }"
                @click="handleSizeChange(value)"
              >
                {{ label }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
