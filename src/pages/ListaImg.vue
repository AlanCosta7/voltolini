<template>
  <q-page style="padding-top: 50px; padding-bottom: 50px">
    <div>
      <div class="flex flex-center q-pa-xl" >
        <div>
          <h1 class="text-center"><span>{{ title.label }}</span></h1>
          <div class="subtitle text-center">{{ descricao }}</div>
        </div>
      </div>
    </div>
    <div class="fit row items-start justify-around paddingGaleria">
      <Galeria :lista="lista_galeria" />
    </div>
    <div v-if="antes_depois.length">
      <h2 class="text-center">Antes e Depois</h2>
      <div class="row items-start justify-around">
        <q-list class="col-xs-12 col-md-6" v-for="(item, i) in antes_depois" :key="i">
          <AntesDepois v-if="item" :beforeSrc="item.data.antes_imagem_800" :afterSrc="item.data.depois_imagem_800" />
        </q-list>
      </div>
    </div>
    <div v-if="listaVideo.length" class="full-width">
      <h2 class="text-center">Video</h2>
      <div class="row items-start justify-center full-width">
        <q-list class="col-xs-12 col-md-5 text-center row items-start justify-center " v-for="(item, i) in listaVideo" :key="i">
          <Video :video="item.data.link" />
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Galeria from '../components/Galeria.vue'
import AntesDepois from '../components/AntesDepois.vue'
import Video from '../components/Video.vue'
import { useGlobalStore } from '../stores/globalStore'

const global = useGlobalStore()

const route = useRoute()
const id = computed(() => route.params.id)

let title = computed(() => global.listaCategoria.find(v => v.value == id.value))


let antes_depois = computed(() => global.antes_depois.filter((v) => v.data.select == id.value));
let lista_galeria = computed(() => global.galeria.filter((v) => v.data.select == id.value));
let listaVideo = computed(() => global.listaVideo.filter((v) => v.data.select == id.value));

</script>

<style scoped>
.q-card {
  background: transparent
}
</style>
