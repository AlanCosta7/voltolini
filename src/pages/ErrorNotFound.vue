<template>
  <div class="fullscreen bg-blue text-white text-center flex flex-center">
    <q-img
      src="../assets/01-CAPA-SITE.png"
      :ratio="16/9"
      width="100%"
      spinner-color="primary"
      spinner-size="82px"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
