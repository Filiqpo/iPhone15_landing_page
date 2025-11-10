<script setup>
import { hightlightsSlides } from "../const";
import { onMounted, reactive, ref, toRefs, watch } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { pauseImg, playImg, replayImg } from "../utils";

gsap.registerPlugin(ScrollTrigger);

const videoRef = ref([]);
const videoSpanRef = ref([]);
const videoDivRef = ref([]);
const loadedData = ref([]);

const video = reactive({
  isEnd: false,
  startPlay: false,
  videoId: 0,
  isLastVideo: false,
  isPlaying: false,
});

const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = toRefs(video);

onMounted(() => {
  gsap.to("#video", {
    scrollTrigger: {
      trigger: "#video",
      toggleActions: "restart none none none",
    },
    onComplete: () => {
      video.startPlay = true;
      video.isPlaying = true;
    },
  });
});

watch([isEnd, videoId], () => {
  gsap.to("#slider", {
    transform: `translateX(${-100 * videoId.value}%)`,
    duration: 2,
    ease: "power2.inOut",
  });

  gsap.to("#video", {
    scrollTrigger: {
      trigger: "#video",
      toggleActions: "restart none none none",
    },
    onComplete: () => {
      video.startPlay = true;
      video.isPlaying = true;
    },
  });
});

watch([videoId, startPlay], () => {
  let currentProgress = 0;
  let span = videoSpanRef.value;

  if (span[videoId.value]) {
    let anim = gsap.to(span[videoId.value], {
      onUpdate: () => {
        const progress = Math.ceil(anim.progress() * 100);

        if (progress != currentProgress) {
          currentProgress = progress;

          gsap.to(videoDivRef.value[videoId.value], {
            width:
              window.innerWidth < 760
                ? "10vw" // mobile
                : window.innerWidth < 1200
                ? "10vw" // tablet
                : "4vw", // laptop
          });

          gsap.to(span[videoId.value], {
            width: `${currentProgress}%`,
            backgroundColor: "white",
          });
        }
      },

      onComplete: () => {
        if (isPlaying.value) {
          gsap.to(videoDivRef.value[videoId.value], {
            width: "12px",
          });
          gsap.to(span[videoId.value], {
            backgroundColor: "#afafaf",
          });
        }
      },
    });

    if (videoId.value == 0) {
      anim.restart();
    }

    const animUpdate = () => {
      anim.progress(
        videoRef.value[videoId.value].currentTime /
          hightlightsSlides[videoId.value].videoDuration
      );
    };

    if (isPlaying.value) {
      gsap.ticker.add(animUpdate);
    } else {
      gsap.ticker.remove(animUpdate);
    }
  }
});

watch([startPlay, videoId, isPlaying, loadedData], () => {
  if (loadedData.value.length > 3) {
    if (!isPlaying.value) {
      videoRef.value[videoId.value].pause();
    } else {
      startPlay.value && videoRef.value[videoId.value].play();
    }
  }
});

const handleProcess = (type, i) => {
  switch (type) {
    case "video-end":
      video.isEnd = true;
      video.videoId = i + 1;
      break;

    case "video-last":
      video.isLastVideo = true;
      break;

    case "video-reset":
      video.videoId = 0;
      video.isLastVideo = false;
      break;

    case "pause":
      video.isPlaying = !video.isPlaying;
      break;

    case "play":
      video.isPlaying = !video.isPlaying;
      break;

    default:
      return video;
  }
};

const handleLoadedMetaData = (i, e) => {
  loadedData.value = [...loadedData.value, e];
};

const handleEnded = (i) => {
  if (i !== 3) {
    handleProcess("video-end", i);
  } else {
    handleProcess("video-last");
  }
};

const handlePlayVideo = () => {
  video.isPlaying = true;
};

const handleClick = () => {
  if (isLastVideo.value) {
    handleProcess("video-reset");
  } else if (!isPlaying.value) {
    handleProcess("play");
  } else {
    handleProcess("pause");
  }
};
</script>

<template>
  <div>
    <div class="flex items-center">
      <div
        v-for="(list, i) in hightlightsSlides"
        :key="list.id"
        id="slider"
        class="sm:pr-20 pr-10"
      >
        <div class="video-carousel_container">
          <div
            class="w-full h-full flex-center rounded-3xl overflow-hidden bg-black"
          >
            <video
              id="video"
              :playsinline="true"
              :class="[
                list.id === 2 && 'translate-x-44',
                'pointer-events-none',
              ]"
              preload="auto"
              :muted="true"
              :ref="
                (el) => {
                  if (el) videoRef[i] = el;
                }
              "
              @ended="handleEnded(i)"
              @play="handlePlayVideo"
              @loadedmetadata="handleLoadedMetaData(i, $event)"
            >
              <source :src="list.video" type="video/mp4" />
            </video>
          </div>

          <div class="absolute top-12 left-[5%] z-10">
            <p
              v-for="(text, index) in list.textLists"
              :key="index"
              class="md:text-2xl text-xl font-medium"
            >
              {{ text }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="relative flex-center mt-10">
      <div
        class="flex-center py-5 px-7 bg-[#42424570] backdrop-blur rounded-full"
      >
        <span
          v-for="(_, i) in videoRef"
          :key="i"
          class="mx-2 w-3 h-3 bg-[#afafaf] rounded-full relative cursor-pointer"
          :ref="
            (el) => {
              if (el) videoDivRef[i] = el;
            }
          "
        >
          <span
            class="absolute h-full w-full rounded-full"
            :ref="
              (el) => {
                if (el) videoSpanRef[i] = el;
              }
            "
          />
        </span>
      </div>

      <button
        class="ml-4 p-4 rounded-full bg-[#42424570] backdrop-blur flex-center"
        @click="handleClick"
      >
        <img
          :src="isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg"
          :alt="isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'"
        />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
