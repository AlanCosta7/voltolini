<template>
  <q-layout view="hHh lpR fff" class="">
    <q-header >
      <q-toolbar class="bg-black">
        <q-toolbar-title>
          Admin
        </q-toolbar-title>
        <q-btn aria-label="Sair" color="secondary" text-color="black" icon="logout" label="Sair" @click="onRouter('logout')" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Loading } from 'quasar'
import { onMounted, computed, watch } from 'vue'
import { useGlobalStore } from '../stores/globalStore'

const global = useGlobalStore()
let currentUser = computed(() => global.currentUser)

watch(currentUser, async (newDoc, oldDoc) => {
  redirectToApp()
})

const router = useRouter()

async function onRouter(item, data=null) {
  if(item == 'logout') {
    global.signOut()
  } else {
    router.push({name: item})
  }
}

function redirectToApp() {
  Loading.show({
    message: '<h3>Carregando...</h3>',
    html: true
  })

  if(!currentUser.value) {
    setTimeout(() => {
      Loading.hide();
      router.push({name: 'auth'})
    }, 3000);
  } else {
    setTimeout(() => {
      Loading.hide();
      router.push({name: 'admin'})
      global.getAdmin()
    }, 3000);
  }

}

onMounted(async() => {
  await global.isOnAuthStateChanged()
  global.promiseAll()
  redirectToApp()
})

</script>

<style>
.bg-transparent {
  background-color: transparent;
}
</style>
