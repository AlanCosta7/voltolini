<template>
  <q-page >
    <div class="row items-center justify-around space">
        <div class="col-sm-4 col-xs-10">
            <Form />
        </div>
        <q-space v-if="mobile" class="col-xs-10 col-sm-10 q-pa-xl" />
        <div class="col-sm-4 col-xs-10">
            <q-responsive :ratio="1">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d792159.8370097042!2d-76.04601966732437!3d39.143466099250176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c705764d0cd63b%3A0x941d2d128c04e878!2sDelaware%2C%20EUA!5e0!3m2!1spt-BR!2sbr!4v1703671411354!5m2!1spt-BR!2sbr"  style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </q-responsive>
        </div>
    </div>
  </q-page>
</template>

<script setup>
import Form from "../components/Form.vue";
import { computed } from 'vue'
import { useGlobalStore } from '../stores/globalStore'


const global = useGlobalStore()
const mobile = computed(() => global.mobile)

</script>

<style>
.space {
    margin: 100px 0 100px 0;
}
</style>