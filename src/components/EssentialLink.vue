<template>
  <q-item
    class="q-py-none"
    clickable
    @click="onRouter(item.link)"
  >
    <q-item-section>
      <q-item-label class="text-h6 text-center" :class="name == item.link? 'text-weight-bolder':'text-weight-light'">{{ item.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps(['link'])
const item = computed(() => props.link)
const router = useRouter()
const route = useRoute()

const name = computed(() => route.name)

function onRouter(item) {
  router.push({name: item})
}


</script>
