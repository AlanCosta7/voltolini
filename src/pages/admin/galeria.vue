<template>
  <div>
    <input
      ref="photoInput"
      debounce="500"
      type="file"
      @change="onPhotoURLPicked"
      name="photo"
      style="display: none"
      accept="image/*"
    />

    <!-- Lista -->
    <div class="row items-start">
      <div class="col-12">
        <q-list class="q-pa-md">
          <div class="text-bold q-mb-md">Lista de {{ select.label }}:</div>
          <div class="row items-start justify-around">
            <div v-for="(item, i) in newLista" :key="i" class="col-auto q-mt-md">
              <q-item
                v-if="item"
                class="borda bg-grey-3"
                :class="item == selectItem ? 'bordaSecondary' : ''"
              >
                <q-item-section>
                  <q-img
                    :src="item.data.imagem_200"
                    width="200px"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                </q-item-section>
                <div>
                  <div>
                    <div class="text-center text-h6">
                      {{ item.data.index }}
                    </div>
                    <q-btn color="negative" icon="delete" round @click="onRemove(i, item)" />
                  </div>
                  <div>
                    <q-btn color="primary" icon="edit" round @click="setForm(item)" />
                  </div>
                </div>
              </q-item>
            </div>
          </div>
        </q-list>
      </div>

      <div class="col-12 q-gutter-md">
        <div class="row items-start q-gutter-md">
          <div class="bg-grey-3">
            <q-img
              width="300px"
              v-if="selectItem && selectItem.data && selectItem.data.imagem_200"
              :src="selectItem.data.imagem_200"
              @click="onPickPhoto"
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
              @click="onPickPhoto"
              flat
              style="width: 300px; height: 180px"
              class="flex flex-center bg-negative text-white cursor-pointer"
            >
              <div>Clique aqui para add uma imagem</div>
            </q-card>

            <div>
              <q-input v-model="selectItem.data.index" type="number" label="Index" />
            </div>
            <div>
              <q-btn color="primary" icon="check" label="Salvar" @click="save(selectItem)" />
            </div>
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
const photoInput = ref(null)

let lista = computed(() => props.lista.sort((a, b) => Number(a.data.index) - Number(b.data.index)));
let select = computed(() => props.select);

let newLista = ref([])

watch(select, async (newDoc, oldDoc) => {
  if(newDoc) {
    console.log('lista', lista.value)
    newLista.value = lista.value
  }
})

let selectItem = ref({
  id: null,
  data: {
    select: null,
    index: 0,
    imagem_200: null,
    imagem_400: null,
    imagem_600: null,
    imagem_800: null,
    imagem_1600: null
  }
})

function onPickPhoto() {
  photoInput.value.click();
}

async function onPhotoURLPicked(event) {
  const files = event.target.files;
  const file = files[0];

  if(!selectItem.value.id) {
    selectItem.value.id = uid()
    var val = {
      id: selectItem.value.id,
      collection: 'galeria',
      data: {
        select: select.value.value,
        index: 0,
        imagem_200: null,
        imagem_400: null,
        imagem_600: null,
        imagem_800: null,
        imagem_1600: null
      }
    }

    await global.saveDocsId(val)
  }

  console.log('selectItem', selectItem)

  var value = {
    id: selectItem.value.id,
    collectionName: 'galeria',
    type: 'all',
    files: file,
    select: select.value.value
  }

  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    const base64 = fileReader.result
    selectItem.value.data.imagem_200 = base64
  })

  fileReader.readAsDataURL(file)
  console.log('value', value)


  await global.uploadPhotoURL(value)
}

function setForm(item) {
  selectItem.value = item
  console.log('selectItem:', selectItem.value)
}

async function onRemove(i, item) {
  console.log('selectItem:', item)
  newLista.value.splice(i, 1)

  global.deleteDocs({
    collection: 'galeria',
    id: item.id
  })

}

function onAdd() {
  let item = {
    id: null,
    data: {
      select: select.value.value,
      index: 0,
      imagem_200: null,
      imagem_400: null,
      imagem_600: null,
      imagem_800: null,
      imagem_1600: null
    }
  }

  newLista.value.push(item)
  console.log('Lista:', newLista.value)
}

function save(item) {
  console.log('save', item)
  global.saveDocsId({
    collection: 'galeria',
    id: item.id,
    data: item.data
  })
}

onMounted(() => {
  newLista.value = lista.value
})
</script>

<style>

</style>
