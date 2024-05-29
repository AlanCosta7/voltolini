<template>
  <div class="bg-white">
    <q-tabs
      v-model="tab"
    >
      <q-tab name="galeria" label="Galeria" />
      <q-tab name="antesdepois" label="Antes e Depois" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="galeria">
        <div style="width: 300px;">
          <q-select v-model="select" :options="listaCategoria" label="Categoria" outlined rounded />
        </div>
        <galeriamodel :lista="galeria" :select="select" v-if="select" />
      </q-tab-panel>
      <q-tab-panel name="antesdepois">
        <div style="width: 300px;">
          <q-select v-model="select" :options="listaCategoria" label="Categoria" outlined rounded />
        </div>
        <antesDepois :lista="antes_depois" :select="select" v-if="select" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import antesDepois from "./antesDepois.vue";
import galeriamodel from "./galeria.vue";
import { useGlobalStore } from "../../stores/globalStore";

const global = useGlobalStore();
let tab = ref('galeria')

let select = ref(null)
let galeria = computed(() => global.galeria.filter((v) => v.data.select == select.value?.value));
let antes_depois = computed(() => global.antes_depois.filter((v) => v.data.select == select.value?.value));

let listaCategoria = computed(() => global.listaCategoria);

</script>

<style>

</style>
