<template>
  <div class="row q-gutter-sm items-start justify-around" v-intersection="onIntersection">
    <q-card
      class="col-xs-10 col-md-5 staggering "
      v-for="(item, i) in listaComponentes"
      :key="i"
    >
      <q-responsive :ratio="16 / 10">
        <q-img :src="item.img" class="dimmed" @click="onRouter(item)">
          <div class="absolute-full flex flex-center transparent z-top">
            <div class="text-uppercase text-subtitle2">{{ item.txt1 }}</div>
          </div>
        </q-img>
      </q-responsive>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import anime from 'animejs/lib/anime.es.js';

const router = useRouter();

let listaComponentes = ref([
  {
    img: "https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2FCustom%20Remodel%2Fthumbs%2FWhatsApp%20Image%202023-12-19%20at%2014.29.33%20(3)_400x400.webp?alt=media&token=920bdd48-7917-4700-9b94-70f38bb9a659",
    txt1: "Custom Remodel",
    link: "custom_remodel",
    txt2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus leo non felis varius, at pharetra just, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus leo non felis varius, at pharetra just",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2FHARDSCAPE%2Fthumbs%2FWhatsApp%20Image%202023-12-19%20at%2014.29.32%20(4)_400x400.webp?alt=media&token=771395f2-c252-464d-9da9-11cae59e7a70",
    txt1: "Hardscape",
    link: "hardscape",
    txt2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus leo non felis varius, at pharetra just, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus leo non felis varius, at pharetra just",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2FPainting%20Services%2Fthumbs%2FWhatsApp%20Image%202023-12-19%20at%2014.32.22%20(11)_400x400.webp?alt=media&token=0aae3f23-7ad6-4c52-a61d-1fb7e75c94b0",
    txt1: "Painting Services",
    link: "painting_services",
    txt2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus leo non felis varius, at pharetra just, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus leo non felis varius, at pharetra just",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2FAccent%20wall%2Fthumbs%2FWhatsApp%20Image%202023-12-19%20at%2014.32.22%20(21)_400x400.webp?alt=media&token=fb76db59-1e3b-4e71-8353-51cf08ea8bc5",
    txt1: "Accent Wall",
    link: "accent_wall",
    txt2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus leo non felis varius, at pharetra just, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus leo non felis varius, at pharetra just",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2FBath%20Remodel%2Fthumbs%2FWhatsApp%20Image%202023-12-19%20at%2014.32.22%20(25)_400x400.webp?alt=media&token=972fe12c-1a6c-4d0f-b953-f56d9fed7dd8",
    txt1: "Bath Remodel",
    link: "bath_remodel",
    txt2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus leo non felis varius, at pharetra just, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus leo non felis varius, at pharetra just",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2FFlooring%2Fthumbs%2FWhatsApp%20Image%202023-12-19%20at%2014.29.32%20(3)_400x400.webp?alt=media&token=08c78a55-ec7d-4ef5-ad8a-348fa79293dd",
    txt1: "Flooring",
    link: "flooring",
    txt2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus leo non felis varius, at pharetra just, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus leo non felis varius, at pharetra just",
  },
]);

let isMouse = ref(null);

function getMouse(item) {
  isMouse.value = item;
}

function onRouter(item) {
  console.log("item", item.link);
  router.push({ name: "listaimg", params: { id: item.link } });
}

function onIntersection (entry) {
  if(entry.isIntersecting) {
    console.log(true, entry)
    setAnime(true)
  } else {
    console.log(false)
    setAnime(false)
  }
}

function setAnime(item) {
  setTimeout(() => {

    if(item) {
      anime({
        targets: '.staggering',
        translateX: 700,
        delay: anime.stagger(100) // increase delay by 100ms for each elements.
      });
    }
  }, 1000);
}
</script>

<style scoped>
.staggering {
  left: -700px;
}
</style>
