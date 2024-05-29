<template>
  <div v-if="currentUser" class="row justify-center relative-position">

    <input
      ref="photoInput"
      debounce="500"
      type="file"
      @change="onPhotoURLPicked"
      name="photo"
      style="display: none"
      accept="image/*"
    />

    <div style="width: 80vw; max-width: 1200px">
      <div>
        <h1
          v-if="entidade && 'label' in entidade"
          class="primaryGradiente text-center text-weight-bolder"
          style="width: 80vw; max-width: 400px"
        >
          {{ entidade.label }}
        </h1>
      </div>
      <div class="row items-start justify-around">
        <q-form @submit="onSubmit" @reset="onReset" v-if="form && form.data" class="q-gutter-md">
          <div v-if="form && 'title' in form.data">
            <div class="text-h6 q-pa-xs bg-accent text-white q-my-md rounded-borders">Title:</div>
            <!-- Titulo principal -->
            <q-editor
              v-model="form.data.title"
              ref="editorRef"
              toolbar-text-color="white"
              toolbar-toggle-color="yellow-8"
              toolbar-bg="primary"
              :toolbar="[
                [
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    list: 'only-icons',
                    options: ['left', 'center', 'right', 'justify'],
                  },
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    options: ['left', 'center', 'right', 'justify'],
                  },
                ],
                [
                  'bold',
                  'italic',
                  'strike',
                  'underline',
                  'subscript',
                  'superscript',
                ],
                [
                  {
                    label: $q.lang.editor.formatting,
                    icon: $q.iconSet.editor.formatting,
                    list: 'no-icons',
                    options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                  },
                  {
                    label: $q.lang.editor.fontSize,
                    icon: $q.iconSet.editor.fontSize,
                    fixedLabel: true,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'size-1',
                      'size-2',
                      'size-3',
                      'size-4',
                      'size-5',
                      'size-6',
                      'size-7',
                    ],
                  },
                  {
                    label: $q.lang.editor.defaultFont,
                    icon: $q.iconSet.editor.font,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'default_font',
                      'arial',
                      'arial_black',
                      'comic_sans',
                      'courier_new',
                      'impact',
                      'lucida_grande',
                      'times_new_roman',
                      'verdana',
                    ],
                  },
                  'removeFormat',
                ],

                ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                ['viewsource'],
              ]"
              :fonts="{
                arial: 'Arial',
                arial_black: 'Arial Black',
                comic_sans: 'Comic Sans MS',
                courier_new: 'Courier New',
                impact: 'Impact',
                lucida_grande: 'Lucida Grande',
                times_new_roman: 'Times New Roman',
                verdana: 'Verdana',
              }"
            >
            </q-editor>
          </div>
          <div v-if="form && form.data && 'subtitle' in form.data">
            <div class="text-h6 q-pa-xs bg-accent text-white q-my-md rounded-borders">Subtitle:</div>
            <!-- Texto principal -->
            <q-editor
              v-model="form.data.subtitle"
              ref="editorRef"
              toolbar-text-color="white"
              toolbar-toggle-color="yellow-8"
              toolbar-bg="primary"
              :toolbar="[
                [
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    list: 'only-icons',
                    options: ['left', 'center', 'right', 'justify'],
                  },
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    options: ['left', 'center', 'right', 'justify'],
                  },
                ],
                [
                  'bold',
                  'italic',
                  'strike',
                  'underline',
                  'subscript',
                  'superscript',
                ],
                [
                  {
                    label: $q.lang.editor.formatting,
                    icon: $q.iconSet.editor.formatting,
                    list: 'no-icons',
                    options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                  },
                  {
                    label: $q.lang.editor.fontSize,
                    icon: $q.iconSet.editor.fontSize,
                    fixedLabel: true,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'size-1',
                      'size-2',
                      'size-3',
                      'size-4',
                      'size-5',
                      'size-6',
                      'size-7',
                    ],
                  },
                  {
                    label: $q.lang.editor.defaultFont,
                    icon: $q.iconSet.editor.font,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'default_font',
                      'arial',
                      'arial_black',
                      'comic_sans',
                      'courier_new',
                      'impact',
                      'lucida_grande',
                      'times_new_roman',
                      'verdana',
                    ],
                  },
                  'removeFormat',
                ],

                ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                ['viewsource'],
              ]"
              :fonts="{
                arial: 'Arial',
                arial_black: 'Arial Black',
                comic_sans: 'Comic Sans MS',
                courier_new: 'Courier New',
                impact: 'Impact',
                lucida_grande: 'Lucida Grande',
                times_new_roman: 'Times New Roman',
                verdana: 'Verdana',
              }"
            >
            </q-editor>
          </div>

          <!-- Botão principal -->

          <div v-if="form && form.data && 'btn' in form.data">
            <div class="text-h6 q-pa-xs bg-accent text-white q-my-md rounded-borders">Label do Botão:</div>
            <q-input
              v-model="form.data.btn"
              outlined
              type="text"
              label="Label do botão"
            />
          </div>
          <div v-if="form && form.data && 'link' in form.data">
            <div class="text-h6 q-pa-xs bg-accent text-white q-my-md rounded-borders">Link do Botão:</div>
            <q-input
              v-model="form.data.link"
              outlined
              type="text"
              label="Link do botão"
            />
          </div>

           <!-- Texto secundario -->

           <div v-if="form && form.data && 'text' in form.data">
            <div class="text-h6 q-pa-xs bg-accent text-white q-my-md rounded-borders">Texto secundário:</div>
            <q-editor
              v-model="form.data.text"
              ref="editorRef"
              toolbar-text-color="white"
              toolbar-toggle-color="yellow-8"
              toolbar-bg="primary"
              :toolbar="[
                [
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    list: 'only-icons',
                    options: ['left', 'center', 'right', 'justify'],
                  },
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    options: ['left', 'center', 'right', 'justify'],
                  },
                ],
                [
                  'bold',
                  'italic',
                  'strike',
                  'underline',
                  'subscript',
                  'superscript',
                ],
                [
                  {
                    label: $q.lang.editor.formatting,
                    icon: $q.iconSet.editor.formatting,
                    list: 'no-icons',
                    options: [
                      'p',
                      'h1',
                      'h2',
                      'h3',
                      'h4',
                      'h5',
                      'h6',
                      'code',
                    ],
                  },
                  {
                    label: $q.lang.editor.fontSize,
                    icon: $q.iconSet.editor.fontSize,
                    fixedLabel: true,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'size-1',
                      'size-2',
                      'size-3',
                      'size-4',
                      'size-5',
                      'size-6',
                      'size-7',
                    ],
                  },
                  {
                    label: $q.lang.editor.defaultFont,
                    icon: $q.iconSet.editor.font,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'default_font',
                      'arial',
                      'arial_black',
                      'comic_sans',
                      'courier_new',
                      'impact',
                      'lucida_grande',
                      'times_new_roman',
                      'verdana',
                    ],
                  },
                  'removeFormat',
                ],

                ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                ['viewsource'],
              ]"
              :fonts="{
                arial: 'Arial',
                arial_black: 'Arial Black',
                comic_sans: 'Comic Sans MS',
                courier_new: 'Courier New',
                impact: 'Impact',
                lucida_grande: 'Lucida Grande',
                times_new_roman: 'Times New Roman',
                verdana: 'Verdana',
              }"
            >
            </q-editor>
          </div>

            <!-- Lista -->
          <div class="row items-start">

            <q-list class="col-auto q-pa-md" v-if="form && form.data && 'lista' in form.data">
              <div class="text-bold q-mb-md" v-if="entidade && 'label' in entidade">Lista de {{ entidade.label }}:</div>

              <div v-for="(item, i) in form.data.lista" :key="i" class="q-mt-md">
                <q-item
                  v-if="item"
                  class="borda bg-grey-3"
                  :class="item == selectItem ? 'bordaSecondary' : ''"
                  clickable
                  v-ripple
                  @click="setForm(item)"
                >
                  <q-item-section>
                    <q-img
                      v-if="item && item.data && 'img' in item.data"
                      :src="item.data.img"
                      width="200px"
                      spinner-color="primary"
                      spinner-size="82px"
                    />
                    <div v-if="item && item.data && 'title' in item.data">
                      {{ item.data.title }}
                    </div>
                  </q-item-section>
                </q-item>
              </div>
            </q-list>

            <div class="col-8 q-gutter-md">
              <div v-if="selectItem && 'img' in selectItem" class="row items-start q-gutter-md">
                <div class="bg-grey-3">
                  <q-img
                    width="300px"
                    v-if="selectItem.img"
                    :src="selectItem.img"
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
                </div>
                <div class="col-md-12 q-gutter-md">
                  <div v-if="selectItem && 'title' in selectItem">
                    <q-input
                      outlined
                      v-model="selectItem.title"
                      type="text"
                      label="Title"
                    />
                  </div>

                  <div v-if="selectItem && 'text' in selectItem">
                    <q-editor
                      v-model="selectItem.data.text"
                      ref="editorRef"
                      toolbar-text-color="white"
                      toolbar-toggle-color="yellow-8"
                      toolbar-bg="primary"
                      :toolbar="[
                        [
                          {
                            label: $q.lang.editor.align,
                            icon: $q.iconSet.editor.align,
                            fixedLabel: true,
                            list: 'only-icons',
                            options: ['left', 'center', 'right', 'justify'],
                          },
                          {
                            label: $q.lang.editor.align,
                            icon: $q.iconSet.editor.align,
                            fixedLabel: true,
                            options: ['left', 'center', 'right', 'justify'],
                          },
                        ],
                        [
                          'bold',
                          'italic',
                          'strike',
                          'underline',
                          'subscript',
                          'superscript',
                        ],
                        [
                          {
                            label: $q.lang.editor.formatting,
                            icon: $q.iconSet.editor.formatting,
                            list: 'no-icons',
                            options: [
                              'p',
                              'h1',
                              'h2',
                              'h3',
                              'h4',
                              'h5',
                              'h6',
                              'code',
                            ],
                          },
                          {
                            label: $q.lang.editor.fontSize,
                            icon: $q.iconSet.editor.fontSize,
                            fixedLabel: true,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                              'size-1',
                              'size-2',
                              'size-3',
                              'size-4',
                              'size-5',
                              'size-6',
                              'size-7',
                            ],
                          },
                          {
                            label: $q.lang.editor.defaultFont,
                            icon: $q.iconSet.editor.font,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                              'default_font',
                              'arial',
                              'arial_black',
                              'comic_sans',
                              'courier_new',
                              'impact',
                              'lucida_grande',
                              'times_new_roman',
                              'verdana',
                            ],
                          },
                          'removeFormat',
                        ],

                        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                        ['viewsource'],
                      ]"
                      :fonts="{
                        arial: 'Arial',
                        arial_black: 'Arial Black',
                        comic_sans: 'Comic Sans MS',
                        courier_new: 'Courier New',
                        impact: 'Impact',
                        lucida_grande: 'Lucida Grande',
                        times_new_roman: 'Times New Roman',
                        verdana: 'Verdana',
                      }"
                    >
                    </q-editor>
                  </div>

                  <div v-if="selectItem && 'link' in selectItem">
                    <q-input outlined v-model="selectItem.link" type="text" label="Link" />
                  </div>
                </div>
                <div>
                  <q-btn color="negative" label="Excluir" @click="onRemove(form.data.lista, selectItem)" />
                </div>
              </div>
            </div>

            <div>
              <q-btn color="primary" icon="add" label="Adicionar" @click="onAdd(form.data.lista)" />
            </div>
          </div>

          <div class="q-my-xl">
            <q-btn label="Salvar" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
    </div>
    <div class="q-py-xl"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useGlobalStore } from "../../stores/globalStore";
import { Dialog, uid } from "quasar";

const global = useGlobalStore();
const props = defineProps(["form"]);

let form = computed(() => props.form[0]);

watch(form.value, async (newDoc, oldDoc) => {
  console.log('form', newDoc)
})

let entidade = computed(() => {
  return {
    label: form.value?.data?.label,
    collectionName: form.value?.data?.collectionName
  }
});

let selectItem = ref({
  img: './',
})

let currentUser = computed(() => global.currentUser);

const photoInput = ref(null)

function setForm(item) {
  selectItem.value = item
  console.log('selectItem:', selectItem.value)
}

function onReset() {
  selectItem.value = null
}

async function onSubmit() {
  console.log("form:", form.value);

  if (form.value.id) {
    let val = {
      collection: entidade.value.collectionName,
      doc: form.value.data,
      id: form.value.id,
    };
    console.log("onSubmit", val);
    await global.updateDocs(val);
    onReset();
  } else {
    let val = {
      collection: entidade.value.collectionName,
      doc: form.value.data,
    };
    await global.saveDoc(val);
    onReset();
  }
}

function onPickPhoto() {
  photoInput.value.click();
}

async function onPhotoURLPicked(event) {
  const files = event.target.files;
  const file = files[0];

  if(!form.value.id) {
    form.value.id = uid()
  }
  const id = form.value.id
  console.log('form', form)
  var value = {
    id: id,
    collectionName: entidade.value.collectionName,
    files: file,
  }

  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    const base64 = fileReader.result
    selectItem.value.img = base64
  })

  fileReader.readAsDataURL(file)
  console.log('value', value)

  // let result = await global.uploadPhotoURL(value)
  // selectItem.value.img = result
  // console.log('result', result)
  // var val = {
  //   id: id,
  //   collection: entidade.value.collectionName,
  //   data: form.value.data
  // }

  // await global.saveDocsId(val)
  // setForm(form.value)
}

function onAdd(lista) {
  let item = {
    img: './',
  }

  lista.forEach(el => {
    if(el && 'img' in el) {
      item.img = null
    }
    if(el && 'title' in el) {
      item.title = null
    }
    if(el && 'text' in el) {
      item.text = null
    }
  });
  console.log('lista', lista)
  lista.push(item)
}

function onRemove(lista, item) {
  let i = lista.indexOf((v) => v == item)
  console.log('i', i)
  lista.splice(i, 1)
  onReset()
}

onMounted(() => {
  console.log("Form:", form.value, entidade.value)
});

</script>

<style>
.bordaSecondary {
  border: solid 3px #1d79f2;
}
</style>
