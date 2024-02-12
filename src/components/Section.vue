<template>
  <div v-intersection="onIntersection" v-if="item">
    <div class="col-md-6 col-xs-12 row justify-center text-center q-pa-xl">
      <h6 style="width: 500px" :class="!item.direcao?`border_gradiente easing_r${i}`:`borda01 text-white easing_l${i}`" class="col-12 q-pa-lg">
        {{ item.text }}
      </h6>
      <div class="q-my-lg col-12 flex flex-center ">
        <div class="flex flex-center" :class="!item.direcao?`btn1 gradiente easing_r${i}`:`btn1 bg-white easing_l${i}`" style="width: 300px;" @click="onClick()" >
          <span :class="!item.direcao?'text-white':'text_gradiente'">Get a free estimate</span>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xs-12" :class="!item.direcao?`easing_l${i}`:`easing_r${i}`">
      <q-img
        :src="item.img"
        :ratio="1"
        width="100%"
        spinner-color="primary"
        spinner-size="82px"
      />
    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";
import { openURL } from 'quasar'
import anime from 'animejs/lib/anime.es.js';

const props = defineProps(['item', 'i'])
const item = computed(()=> props.item)
const i = computed(()=> props.i)

function onIntersection (entry) {
  if(entry.isIntersecting) {
    console.log(true, entry)
    setAnime(true)
  } else {
    console.log(false)
    setAnime(false)
  }
}

function onClick() {
  openURL('sms:+18133095868')
}

function setAnime(item) {

  if(item) {
    anime({
      targets: `.easing_r${i.value}`,
      translateX: 0,
      delay: 100,
      easing: 'easeInOutExpo'
    });
    anime({
      targets: `.easing_l${i.value}`,
      translateX: 0,
      delay: 100,
      easing: 'easeInOutExpo'
    });
  } else {

    anime({
      targets: `.easing_r${i.value}`,
      translateX: 1000,
      delay: 100,
      easing: 'easeInOutExpo'
    });
    anime({
      targets: `.easing_l${i.value}`,
      translateX: -1000,
      delay: 100,
      easing: 'easeInOutExpo'
    });
  }
}

</script>

<style>

</style>
