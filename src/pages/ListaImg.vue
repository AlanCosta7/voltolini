<template>
  <q-page style="padding-top: 50px; padding-bottom: 50px">
    <div>
      <div class="flex flex-center q-pa-xl" >
        <div>
          <h1 class="text-center"><span>{{ title }}</span></h1>
          <div class="subtitle text-center">{{ descricao }}</div>
        </div>
      </div>
    </div>
    <div class="fit row items-start justify-around paddingGaleria">
      <Galeria :lista="lista" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Galeria from '../components/Galeria.vue'
import { useGlobalStore } from '../stores/globalStore'
import Header from 'components/Header.vue'

const global = useGlobalStore()

const route = useRoute()
let title = ref('')
let descricao = ref('')

const id = computed(() => route.params.id)

const isPage = computed(() => {
  return {

    img: 'https://cdn.quasar.dev/img/quasar.jpg',
    height: '412px',
    title: title.value,
    link: 'gallery',
    btn: false,
    logo: false
  }
})

const lista = computed(() => { 
  console.log('ID:', id.value)
  switch (id.value) {
    case 'custom_remodel':
      title.value = 'Custom Remodel'
      global.getImg('Custom Remodel')
      
      break;
    case 'hardscape':
      title.value = 'Hardscape'
      global.getImg('HARDSCAPE')
      
      break;
    case 'painting_services':
      title.value = 'Painting Services'
      global.getImg('Painting Services')
      
      break;
    case 'accent_wall':
      title.value = 'Accent Wall'
      global.getImg('Accent wall')
      
      break;
    case 'bath_remodel':
      title.value = 'Bath Remodel'
      global.getImg('Bath Remodel')
      
      break;
    case 'flooring':
      title.value = 'Flooring'
      global.getImg('Flooring')
      
      break;
  
    default:
      break;
  }

  return global.listaGaleria
})

</script>

<style scoped>
.q-card {
  background: transparent
}
</style>
