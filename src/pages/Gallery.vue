<template>
  <q-page>
    <div class="row items-center justify-around q-pa-xl">
      <div class="col-sm-5 col-xs-12">
        <Componentes />
      </div>
      <div class="col-sm-5 col-xs-12 q-pa-md staggtext" v-intersection="onIntersection">
        <p class="">
          <b>Custom Remodel:</b> Immerse yourself in the art of transformation as we customize spaces to align seamlessly with your vision. Our Custom Remodel service is a testament to our commitment to turning your dreams into reality, with precision and creativity.
        </p>
        <p>
          <b>Hardscape:</b> Extend the beauty of your living space to the outdoors with our Hardscape solutions. We blend design and durability to craft outdoor environments that stand the test of time, providing a harmonious blend of nature and sophistication.
        </p>
        <p>
          <b>Painting Services:</b> Experience the power of color and expression with our Painting Services. Our skilled artists bring walls to life, infusing each stroke with personality and vibrancy. Your interiors will become a canvas that tells a unique story.
        </p>
        <p>
          <b>Accent Wall:</b> Make a bold statement with our Accent Wall designs. Whether it's a focal point or a subtle touch, we specialize in creating visually stunning features that elevate the overall aesthetic of your space.
        </p>
        <p>
          <b>Bath Remodel:</b> Indulge in the luxury of a personalized sanctuary with our Bath Remodel services. From modern elegance to timeless classics, we craft bathrooms that seamlessly blend comfort and style, enhancing your daily routines.
        </p>
        <p>
          <b>Flooring:</b> Step into a world of possibilities with our Flooring solutions. We offer a diverse range of materials and designs to suit your preferences, ensuring that every step you take is on a foundation of quality and style.
        </p>
        <p>
          <b>Kitchen:</b> The kitchen is the heart of your home, where you show love for your family and friends and spend quality time with your loved ones Renovating your kitchen brings a significant value to your home, this is one of the biggest investments you can make for your family and your home.
        </p>
        <p>
          <b>Other:</b> Explore a universe of possibilities with our diverse services. Whatever your refurbishment or project needs, we stand ready to meet them. From optimizing spaces to creative and innovative solutions, our multidisciplinary teams offer varied expertise to cater to your unique preferences and challenges. We are committed to excellence, turning each project into a masterpiece of design and functionality.
        </p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import Componentes from "../components/Componentes.vue";
import anime from 'animejs/lib/anime.es.js';

function onIntersection (entry) {
  if(entry.isIntersecting) {
    setAnime(true)
  } else {
    setAnime(false)
  }
}

function setAnime(item) {

    if(item) {
      anime({
        targets: '.staggtext',
        opacity: 1,
        duration: 1000,
        easing: 'easeInOutQuad',
        delay: 500
      });
    }

}
</script>

<style scoped>
.staggtext {
  opacity: 0;
}
</style>
