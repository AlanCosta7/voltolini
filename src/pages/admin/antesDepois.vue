<template>
  <div>
    <input
      ref="photoInputAntes"
      debounce="500"
      type="file"
      @change="onPhotoURLPickedAntes"
      name="photo"
      style="display: none"
      accept="image/*"
    />

    <input
      ref="photoInputDepois"
      debounce="500"
      type="file"
      @change="onPhotoURLPickedDepois"
      name="photo"
      style="display: none"
      accept="image/*"
    />

    <!-- Lista -->
    <div class="row items-start">

      <q-list class="col-auto q-pa-md">
        <div class="text-bold q-mb-md">Lista de {{ select.label }}:</div>

        <div v-for="(item, i) in newLista" :key="i" class="q-mt-md">
          <q-item
            v-if="item"
            class="borda bg-grey-3"
            :class="item == selectItem ? 'bordaSecondary' : ''"
          >
            <q-item-section>
              <q-img
                :src="item.data.depois_imagem_200"
                width="200px"
                spinner-color="primary"
                spinner-size="82px"
              />
            </q-item-section>
            <div>
              <div>
                <q-btn color="negative" icon="delete" round @click="onRemove(i, item)" />
              </div>
              <div>
                <q-btn color="primary" icon="edit" round @click="setForm(item)" />
              </div>
            </div>
          </q-item>
        </div>
      </q-list>

      <div class="col-8 q-gutter-md">
        <div class="row items-start q-gutter-md">
          <div class="bg-grey-3">
            <q-img
              width="300px"
              v-if="selectItem && selectItem.data && selectItem.data.antes_imagem_200"
              :src="selectItem.data.antes_imagem_200"
              @click="onPickPhotoAntes"
              alt="Banners"
              class="cursor-pointer"
            >
              <template v-slot:error>
                <div
                  class="absolute-full flex flex-center bg-negative text-white"
                >
                  Clique aqui para add uma imagem
                </div>
              </template>
              <div class="absolute-full text-subtitle2 column flex flex-center">
                <div><q-icon size="md" name="photo_camera" /></div>
                <div>
                  Clique aqui para atualizar a imagem
                </div>
              </div>
            </q-img>
            <q-card
              v-else
              @click="onPickPhotoAntes"
              flat
              style="width: 300px; height: 180px"
              class="flex flex-center bg-negative text-white cursor-pointer"
            >
              <div>Clique aqui para add uma imagem</div>
            </q-card>
          </div>
          <div class="bg-grey-3">
            <q-img
              width="300px"
              v-if="selectItem && selectItem.data && selectItem.data.depois_imagem_200"
              :src="selectItem.data.depois_imagem_200"
              @click="onPickPhotoDepois"
              alt="Banners"
              class="cursor-pointer"
            >
              <template v-slot:error>
                <div
                  class="absolute-full flex flex-center bg-negative text-white"
                >
                  Clique aqui para add uma imagem
                </div>
              </template>
              <div class="absolute-full text-subtitle2 column flex flex-center">
                <div><q-icon size="md" name="photo_camera" /></div>
                <div>
                  Clique aqui para atualizar a imagem
                </div>
              </div>
            </q-img>
            <q-card
              v-else
              @click="onPickPhotoDepois"
              flat
              style="width: 300px; height: 180px"
              class="flex flex-center bg-negative text-white cursor-pointer"
            >
              <div>Clique aqui para add uma imagem</div>
            </q-card>
          </div>

        </div>
      </div>

      <div>
        <q-btn color="primary" icon="add" label="Adicionar" @click="onAdd()" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useGlobalStore } from "../../stores/globalStore";
import { uid } from "quasar";

const global = useGlobalStore();
const props = defineProps(["lista", "select"]);
const photoInputAntes = ref(null)
const photoInputDepois = ref(null)

let lista = computed(() => props.lista);
let select = computed(() => props.select);
let newLista = ref([])

watch(select, async (newDoc, oldDoc) => {
  if(newDoc) {
    newLista.value = lista.value
  }
})


let selectItem = ref({
  id: null,
  data: {
    select: null,
    antes_imagem_200: null,
    antes_imagem_400: null,
    antes_imagem_600: null,
    antes_imagem_800: null,
    antes_imagem_1600: null,
    depois_imagem_200: null,
    depois_imagem_400: null,
    depois_imagem_600: null,
    depois_imagem_800: null,
    depois_imagem_1600: null,
  }
})

function onPickPhotoAntes() {
  photoInputAntes.value.click();
}

function onPickPhotoDepois() {
  photoInputDepois.value.click();
}

async function onPhotoURLPickedAntes(event) {
  const files = event.target.files;
  const file = files[0];

  if(!selectItem.value.id) {
    selectItem.value.id = uid()
    var val = {
      id: selectItem.value.id,
      collection: 'antes_depois',
      data: {
        select: select.value.value,
        antes_imagem_200: null,
        antes_imagem_400: null,
        antes_imagem_600: null,
        antes_imagem_800: null,
        antes_imagem_1600: null,
        depois_imagem_200: null,
        depois_imagem_400: null,
        depois_imagem_600: null,
        depois_imagem_800: null,
        depois_imagem_1600: null,
      }
    }

    await global.saveDocsId(val)
  }

  console.log('selectItem', selectItem)
  var value = {
    id: selectItem.value.id,
    collectionName: 'antes_depois',
    files: file,
    type: 'antes',
    select: select.value.value
  }

  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    const base64 = fileReader.result
    selectItem.value.data.antes_imagem_200 = base64
  })

  fileReader.readAsDataURL(file)
  console.log('value', value)

  await global.uploadPhotoURL(value)
}

async function onPhotoURLPickedDepois(event) {
  const files = event.target.files;
  const file = files[0];

  if(!selectItem.value.id) {
    selectItem.value.id = uid()
    var val = {
      id: selectItem.value.id,
      collection: 'antes_depois',
      data: {
        select: select.value.value,
        antes_imagem_200: null,
        antes_imagem_400: null,
        antes_imagem_600: null,
        antes_imagem_800: null,
        antes_imagem_1600: null,
        depois_imagem_200: null,
        depois_imagem_400: null,
        depois_imagem_600: null,
        depois_imagem_800: null,
        depois_imagem_1600: null,
      }
    }

    await global.saveDocsId(val)
  }

  console.log('selectItem', selectItem)
  var value = {
    id: selectItem.value.id,
    collectionName: 'antes_depois',
    files: file,
    type: 'depois',
    select: select.value.value
  }

  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    const base64 = fileReader.result
    selectItem.value.data.depois_imagem_200 = base64
  })

  fileReader.readAsDataURL(file)
  console.log('value', value)


  await global.uploadPhotoURL(value)
}

function setForm(item) {
  selectItem.value = item
  console.log('selectItem:', selectItem.value)
}

function onRemove(i, item) {
  newLista.value.splice(i, 1)
  console.log('selectItem:', item)

  global.deleteDocs({
    collection: 'antes_depois',
    id: item.id
  })
}

function onAdd() {
  let item = {
    id: null,
    data: {
      select: select.value.value,
      antes_imagem_200: null,
      antes_imagem_400: null,
      antes_imagem_600: null,
      antes_imagem_800: null,
      antes_imagem_1600: null,
      depois_imagem_200: null,
      depois_imagem_400: null,
      depois_imagem_600: null,
      depois_imagem_800: null,
      depois_imagem_1600: null,
    }
  }

  newLista.value.push(item)
  console.log('Lista:', newLista.value)
}

onMounted(() => {
  newLista.value = lista.value
})
</script>

<style>

</style>
