<template>
    <q-item>
      <q-item-section>
        <video controls style="width: 100%; max-width: 300px; height: 100%;" >
          <source :src="video" type="video/mp4">
        </video>

      </q-item-section>
    </q-item>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(['video'])
const video = computed(() => props.video)

</script>

<style>

</style>
