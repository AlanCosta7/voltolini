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
                  src="../assets/about.jpg"
                  :ratio="1"
                  spinner-color="primary"
                  spinner-size="82px"
                />
            </div>

            <div class="text-black col-md-5 col-xs-12 q-pt-xl text-h6">
              <p>We are a construction and renovation company that has been operating in the market for over 6 years, but Voltolini has been around for generations.</p>

              <p>The love for this field has been passed down from father to son, and today we are a family business with strong values and character. We are passionate about what we do, and our greatest joy is to make your dream come true.</p>

              <p>We understand that building and renovating are not always about consumerism, but rather about the desire to have a more family-oriented, comfortable environment that brings peace and joy.</p>

              <p>We want you to trust us as many other clients have. We want to join you in one single purpose: to realize your dream of the perfect environment.</p>

              <p>See you soon!</p>
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
