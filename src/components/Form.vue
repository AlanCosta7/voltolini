<template>
  <div class="fit">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <div class="text-black text-weight-light fit">We want to hear from you! Whether to discuss ideas, schedule a visit or simply answer questions, we are here to turn your projects into reality. Fill out the form below or contact us directly by phone or email.</div>
      <div class="row justify-between items-center">
        <div class="col-5">
          <q-input bg-color="white" dense lazy-rules :rules="[val => (val && val.length > 0) || 'What is your full name?']" color="positive" outlined v-model="form.name" type="text" label="Full Name:" />
        </div>
        <div class="col-5">
          <q-input bg-color="white" dense lazy-rules :rules="[val => (val && val.length > 0) || 'What is your cell phone number?']" color="positive" outlined v-model="form.tel" type="text" label="Cellphone number:" />
        </div>
      </div>
      <div>
          <q-input bg-color="white" dense lazy-rules :rules="[val => (val && val.length > 0) || 'What is your email?']" color="positive" outlined v-model="form.email" type="email" label="Email:" />
      </div>
      <div>
          <q-input bg-color="white" dense lazy-rules :rules="[val => (val && val.length > 0) || 'How can we help you?']" color="positive" outlined v-model="form.msg" type="textarea" label="Tell us a little bit about your project:" />
      </div>
      <div class="row items-center">
        <q-btn label="Send" dense class="q-px-md text-white" type="submit" color="primary"/>
        <q-btn label="Clear" dense type="reset" color="black" flat class="q-ml-sm q-px-md" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useGlobalStore } from '../stores/globalStore'
const global = useGlobalStore()

let form = ref({
  name: '',
  tel: '',
  email: '',
  msg: '',
})

async function onSubmit() {
  let val = {
    functions: 'sendContato',
    data: form.value
  }
  console.log(val)
  let result = await global.sendHttpCall(val)
  console.log(result)

  if(!result.error) {
    await global.handleCallback({
      message: 'Sent successfully.',
      type: 'positive'
    })
    onReset()

  } else {
    await global.handleCallback({
      message: 'Error sending your message.',
      type: 'negative'
    })
  }
}

function onReset() {
  form.value = {
    name: '',
    tel: '',
    email: '',
    msg: '',
  }
}



</script>

<style scoped>

</style>
