<template>
  <q-layout view="lhh lpR fff">
    <q-header height="98" class="transparent text-black full-width">
      <q-toolbar>
        <div class="row items-center justify-center full-width">
          <div class="row items-center justify-center full-width " style="max-width: 1000px;">

            <div class="col">
              <q-img
                src="https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/logo%2FIMAGEM_SEM%20FUNDO_Prancheta%201%20co%CC%81pia_400x400.webp?alt=media&token=8e630052-466d-4ee4-aec4-933abe1ea449"
                width="200px"
                :ratio="16/6"
                spinner-color="primary"
                spinner-size="82px"
              />
            </div>
            <div v-if="!mobile" class="col-auto row items-center">
              <EssentialLink
                v-for="link in linksList"
                :key="link.title"
                :link="link"
              />
              <div>
                <div @click="onClick" class="text-weight-bolder text_gradiente text-h6 cursor-pointer">+1 (813) 309-5868</div>
              </div>
            </div>
          </div>
        </div>
        <q-btn
          v-if="mobile"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
      <Header :isPage='isPage' />
    </q-header>

    <q-drawer
      v-if="mobile"
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          :link="link"
        />
      </q-list>
    </q-drawer>


  <q-footer>
        <div :class="mobile?'justify-center':'justify-between'"  class="row items-start text-center gradiente q-pt-xl ">
            <div class="col-xs-10 col-sm flex flex-center q-py-md">
                <q-img
                    src="https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/logo%2FIMAGEM_SEM%20FUNDO_Prancheta%201%20co%CC%81pia%208_400x400.webp?alt=media&token=4bd413c8-60fc-4ba3-b90c-2dd58dc8911e"
                    :ratio="20/10"
                    width="200px"
                    spinner-color="primary"
                    spinner-size="82px"
                />
            </div>

            <div class="col-xs-12 col-sm q-py-md">
                <EssentialLink
                  class="col-xs-10"
                  v-for="link in linksList"
                  :key="link.title"
                  :link="link"
                />
            </div>

            <div class="col-xs-10 col-sm q-py-md">
              <h6>contact</h6>
              <div><a href="mailto:voltolinihomeimprovement@gmail.com">voltolinihomeimprovement@gmail.com</a></div>
            </div>

            <div class="col-xs-10 col-sm q-py-md column flex flex-center text-center">
              <div class="col-12">
                <h6>follow us</h6>
              </div>
              <div class="col-12">
                <q-list class="row items-center justify-start">
                  <q-item clickable v-for="(item, i) in social" :key="i" @click="onRouter(item)" >
                    <q-item-section >
                      <q-img
                        :src="item.img"
                        :ratio="1"
                        width="30px"
                        spinner-color="primary"
                        spinner-size="82px"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>

        </div>
  </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useGlobalStore } from '../stores/globalStore'
import Header from 'components/Header.vue'
import { useRoute } from 'vue-router'
import { openURL } from 'quasar'
import facebook from "../assets/social/facebook.png";
import instagram from "../assets/social/instagram.png";

const global = useGlobalStore()
const leftDrawerOpen = ref(false)
const route = useRoute()

const mobile = computed(() => global.mobile)

const isHeight = computed(() => {
  return mobile?'90vh':'650px'
})

const isPage = computed(() => {
  switch (route.name) {
    case 'home':
      return {
        img: 'https://cdn.quasar.dev/img/parallax1.jpg',
        height: isHeight.value,
        title: 'Working to make your dream renovation come true',
        link: 'home',
        btn: true,
        logo: true
      }

    case 'about':
      return {
        img: null,
        height: null,
        title: 'About Us',
        link: 'about',
        btn: false,
        logo: false
      }

    case 'contact':
      return {
        img: 'https://cdn.quasar.dev/img/quasar.jpg',
        height: '412px',
        title: 'Contact Us',
        link: 'contact',
        btn: false,
        logo: false
      }

    case 'gallery':
      return {
        img: 'https://cdn.quasar.dev/img/quasar.jpg',
        height: '412px',
        title: 'Gallery',
        link: 'gallery',
        btn: false,
        logo: false
      }


    case 'listaimg':
      return {
        img: 'https://cdn.quasar.dev/img/quasar.jpg',
        height: '412px',
        title: 'Gallery',
        link: 'gallery',
        btn: false,
        logo: false
      }

    default:
      break;
  }
})

const linksList = ref([
  {
    title: 'Home',
    link: 'home'
  },
  {
    title: 'About Us',
    link: 'about'
  },
  {
    title: 'Gallery',
    link: 'gallery'
  },
  {
    title: 'Contact Us',
    link: 'contact'
  }

])

const social = ref([
  {
    img: 'https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2Fthumbs%2Fsms_200x200.webp?alt=media&token=6fadefaa-0828-456a-8e79-3ce1f94138bc',
    link: 'sms:+18133095868'
  },
  {
    img: facebook,
    link: 'https://www.facebook.com/voltolinihomeimprovement?mibextid=LQQJ4d'
  },
  {
    img: instagram,
    link: 'https://www.instagram.com/voltolinihomeimprovement?igsh=bnUydGFsdTg2ejUx'
  },
])



function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function onClick() {
  console.log('telefone')
  openURL('sms:+18133095868')
}

function onRouter(item) {
  openURL(item.link)
}

onMounted(async() => {
  global.promiseAll()
})
</script>
