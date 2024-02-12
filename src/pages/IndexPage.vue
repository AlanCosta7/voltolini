<template>
  <q-page>
    <div>
      <div class="gradiente flex flex-center" >
        <div class=" row items-center justify-around full-width q-pa-xl" style="max-width: 1200px;" v-intersection="onIntersection">
          <div class="column col-xs-6 col-sm flex flex-center committed" >
            <q-img
              src="../assets/icon/security.svg"
              :ratio="1"
              width="100px"
              spinner-color="primary"
              spinner-size="82px"
            />
            <h6 class="text-white q-my-md">Security</h6>
          </div>
          <div class="column col-xs-6 col-sm flex flex-center committed">
            <q-img
              src="../assets/icon/agility.svg"
              :ratio="1"
              width="100px"
              spinner-color="primary"
              spinner-size="82px"
            />
            <h6 class="text-white q-my-md">Agility</h6>
          </div>
          <div class="column col-xs-6 col-sm flex flex-center committed">
            <q-img
              src="../assets/icon/quality.svg"
              :ratio="1"
              width="100px"
              spinner-color="primary"
              spinner-size="82px"
            />
            <h6 class="text-white q-my-md">Quality</h6>
          </div>
          <div class="column col-xs-6 col-sm flex flex-center committed">
            <q-img
              src="../assets/icon/transparency.svg"
              :ratio="1"
              width="100px"
              spinner-color="primary"
              spinner-size="82px"
            />
            <h6 class="text-white q-my-md">Transparency</h6>
          </div>
        </div>
      </div>

      <Section v-for="(item, i) in listaDestaque" :key="i" :item="item" :i="i" class="row items-center" :class="item.direcao?'gradiente text-white':''"  :style="item.direcao?'':'flex-direction: row-reverse'"  />

      <div class="space" >
        <q-carousel
          v-model="slide"
          flat
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="black"
          padding
          arrows
          height="200px"
          class="rounded-borders"
        >
          <template v-if="!mobile">
            <q-carousel-slide v-for="(item, i) in 2" :key="i" :name="i" class="row mobile-hide no-wrap flex-center q-gutter-md">
              <div class="q-ma-md">
                <div  style="max-width: 600px;">
                  {{ lista[slide].text }}
                </div>
                <div class="q-mt-md ">
                  {{ lista[slide].name }}
                </div>
              </div>
              <q-separator spaced inset vertical />
              <div class="q-ma-md ">
                <div style="max-width: 600px;">
                  {{ lista[slide+1].text }}
                </div>
                <div class="q-mt-md ">
                  {{ lista[slide+1].name }}
                </div>
              </div>
            </q-carousel-slide>
          </template>

          <template v-else>
          <q-carousel-slide v-for="(item, i) in lista" :key="i" :name="i" class="row mobile-only no-wrap flex-center q-gutter-md">
            <div class="q-ma-md">
              <div  style="max-width: 600px;">
                {{ item.text }}
              </div>
              <div class="q-mt-md ">
                {{ item.name }}
              </div>
            </div>
          </q-carousel-slide>
          </template>

        </q-carousel>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGlobalStore } from '../stores/globalStore'
import Section from '../components/Section.vue'
import anime from 'animejs/lib/anime.es.js';

const global = useGlobalStore()
const slide = ref(0)
const mobile = computed(() => global.mobile)

const lista = ref([
  {
    index: 0,
    img: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
    text: 'Choosing voltolini for our home remodel was the best decision we made! Their attention to detail and creative approach turned our house into a personalized haven. The Custom Remodel service exceeded our expectations, and now our home truly reflects our style. The team at voltolini brought our vision to life with professionalism and flair.',
    name: 'Maria Silva',
    star: 5
  },

  {
    index: 1,
    img: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=800',
    text: "As an art enthusiast, I was searching for a painting service that could capture the essence of my style. voltolini exceeded my expectations with their Painting Services. The attention to detail and the ability to translate my ideas into vibrant, artistic walls was truly remarkable. My home is now a gallery of self-expression, thanks to the talented team at voltolini.",
    name: 'Luisa Torres',
    star: 4
  },

  {
    index: 2,
    img: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=800',
    text: "I can't speak highly enough of voltolini's Hardscape expertise. They transformed my backyard into a stunning outdoor oasis. The blend of functionality and aesthetics is unparalleled. Now, my outdoor space is not just an extension of my home but a true reflection of my lifestyle. Thank you, voltolini, for creating a space where I can relax and entertain with pride.",
    name: 'Carlos Oliveira',
    star: 5
  }
])

const listaDestaque = computed(() => global.listaDestaque)

function onIntersection (entry) {
  if(entry.isIntersecting) {
    setAnime(true)
  } else {
    setAnime(false)
  }
}


function setAnime(item) {

if(item) {
  anime({
    targets: '.committed',
    opacity: 1,
    duration: 2000,
    easing: 'easeInOutQuad',
  })

} else {
  anime({
    targets: '.committed',
    opacity: 0,
    duration: 1000,
    easing: 'easeInOutQuad',
  })


}
}

</script>

<style>
.space {
  margin: 100px 0 100px 0;
}
</style>
