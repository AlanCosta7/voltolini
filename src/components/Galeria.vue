<template>
  <div class="row items-center justify-around">
    <q-list v-for="(item, i) in lista" :key="i">
      <q-item clickable v-ripple @click="open(item.data.imagem_1600)">
        <q-item-section avatar>
          <q-img
            :src="item.data.imagem_200"
            :ratio="1"
            width="200px"
            spinner-color="primary"
            spinner-size="82px"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="dialogImg">
      <q-card class="full-width">
          <q-img
            :src="isImg"
            width="100%"
            spinner-color="primary"
            spinner-size="82px"
          />
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps(["lista"]);
let lista = computed(() => props.lista.sort((a, b) => Number(a.data.index) - Number(b.data.index)));
let isImg = ref(null)
let dialogImg = ref(false)

function open(item) {
  isImg.value = item
  dialogImg.value = true
}

</script>

<style>

</style>
