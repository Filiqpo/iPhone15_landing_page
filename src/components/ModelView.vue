<script setup>
import * as THREE from "three";
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import Lights from "./Lights.vue";
import { Suspense } from "vue";

const props = defineProps({
  index: { type: Number, required: true },
  groupRef: { type: Object, default: null },
  gsapType: { type: String, default: "" },
  controlRef: { type: Object, default: null },
  setRotationState: { type: Function, default: null },
  item: { type: Object, required: true },
  size: { type: [String, Object], default: "small" },
});
</script>

<template>
  <div
    :index="index"
    :id="gsapType"
    :class="`border-2 border-red-500 w-full h-full
    ${index === 2 ? '-right-full' : ''}`"
  >
    <TresCanvas>
      <TresAmbientLight :intensity="0.3" />
      <TresPerspectiveCamera :position="[0, 0, 4]" />
      <!-- <Lights /> -->
    </TresCanvas>
  </div>
</template>

<style scoped></style>
