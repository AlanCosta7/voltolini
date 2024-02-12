<template>
  <q-carousel
    animated
    v-model="slide"
    infinite
    :autoplay="true"
    :height="isPage.height"
    v-if="isPage && isPage.height"

  >
    <q-carousel-slide :name="i" v-for="(item, i) in lista" :key="i" class="column no-wrap q-pa-none q-ma-none flex-center">
      <q-img
        class="pelicula transparent"
        :src="item"
        :height="isPage.height"
        spinner-color="primary"
        spinner-size="82px"
      >
        <div v-if="isPage.title" class="absolute-full q-py-lg flex flex-center">
            <div class="full-width text-center q-py-xl" v-if="isPage.logo">
              <q-img

                src="https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/logo%2FIMAGEM_SEM%20FUNDO_Prancheta%201%20co%CC%81pia%209_400x400.webp?alt=media&token=567c212c-6e0a-43c4-b3e9-f3e5d6b6061f"
                :ratio="19/6"
                width="300px"
                spinner-color="primary"
                spinner-size="82px"
              />
            </div>
            <div style="max-width: 700px " class="border-bottom">
              <h1 class=" full-width text-center">{{ isPage.title }}</h1>
            </div>
            <q-separator v-if="isPage.btn" spaced inset />
            <div class="full-width text-center q-py-md" v-if="isPage.btn">
              <q-btn color="negative" label="Get a free estimate" size="20px" style="width: 300px;" @click="onClick()" />
            </div>
          </div>
      </q-img>
    </q-carousel-slide>
  </q-carousel>

</template>

<script setup>
import { ref, computed } from 'vue'
import { useGlobalStore } from '../stores/globalStore'
import { openURL } from 'quasar'

const global = useGlobalStore()
const props = defineProps(['isPage'])
const isPage = computed(() => props.isPage)
const slide = ref(0)
const lista = ref([
  'https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2FCarousel%2Fthumbs%2F1_1600x1600.webp?alt=media&token=4a6a1b9f-1a79-493c-9466-90e0d560780e',
  'https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2FCarousel%2Fthumbs%2F2_1600x1600.webp?alt=media&token=2792de91-72a6-48e8-97a7-15031e8ca2d5',
  'https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2FCarousel%2Fthumbs%2F3_1600x1600.webp?alt=media&token=598a59b5-061a-4a23-9325-b700099c4b63',
  'https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2FCarousel%2Fthumbs%2F4_1600x1600.webp?alt=media&token=577c4d25-dc36-4535-ad5e-80427d494815'])
const mobile = computed(() => global.mobile)

function onClick() {
  openURL('sms:+18133095868')
}


</script>

<style>
.pelicula {
  background: linear-gradient(0deg, rgba(36, 78, 155, 0.60) 0%, rgba(36, 78, 155, 0.60) 100%)
}

.q-img__content > div {
  background: rgba(0, 0, 0, 0);
}

.border-bottom{
  border-bottom: 3px solid white;
}
</style>
