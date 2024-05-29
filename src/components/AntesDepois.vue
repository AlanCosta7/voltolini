<template>
  <div style="max-width: 400px; width: auto; margin: 50px auto;">
    <VueCompareImage :sliderPositionPercentage="0.8" :left-image="beforeSrc" :right-image="afterSrc" />
  </div>
</template>

<script setup>
import { VueCompareImage } from 'vue3-compare-image'
import { computed } from "vue";

const props = defineProps(['beforeSrc', 'afterSrc'])
let beforeSrc = computed(() => props.beforeSrc)
let afterSrc = computed(() => props.afterSrc)

</script>
