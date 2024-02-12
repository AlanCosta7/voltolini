<template>
  <q-page class="flex flex-center">
    <div>
        <q-img
          src="https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2FCarousel%2Fthumbs%2F1369_1600x1600.webp?alt=media&token=693076de-1e75-4cd3-9ff6-706b813d8ba7"
          width="100vw"
          style="min-height: 100vh; height: 1000px"
          spinner-color="primary"
          spinner-size="82px"
        >
        <div class="absolute-full text-subtitle2 flex flex-center">
          <div class="full-width text-center">
            <h1>About Us</h1>
          </div>
          <q-card class="row items-center justify-around relative-position q-pa-lg" :style="mobile?'width: 98%':'width: 80%'">
            <div class="col-md-6 col-xs-12" :style="mobile?'margin-left: 0px':'margin-left: -200px;'">
                <q-img
                  class=""
                  src="https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2Fthumbs%2Fpexels-ivan-samkov-8117475_1600x1600.webp?alt=media&token=2f518eaa-f891-495c-80f5-c5aefc6eeb0d"
                  :ratio="1"
                  spinner-color="primary"
                  spinner-size="82px"
                />
            </div>

            <div class="text-black col-md-5 col-xs-12 q-pt-xl text-h6">
              <p>
                Welcome to Voltorini, where innovation meets elegance in the world of interior design. We take pride in transforming spaces into captivating environments that reflect the unique personality and lifestyle of each client.
              </p>
              <p>
                At Voltorini, our passion lies in creating personalized and functional designs that go beyond aesthetics. Our dedicated team of experts specializes, ensuring a comprehensive approach to meet your every need.
              </p>
              <p>
                We don't just design spaces; we curate experiences. Our commitment to excellence, attention to detail, and passion for innovation set us apart in the world of interior design. Discover the possibilities with us and let your space tell a story of beauty, functionality, and unmatched sophistication.
              </p>
            </div>
          </q-card>

        </div>
        </q-img>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useGlobalStore } from '../stores/globalStore'

const global = useGlobalStore()
const mobile = computed(() => global.mobile)

</script>

<style>

</style>