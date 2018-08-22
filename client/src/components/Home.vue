<template>

    <v-carousel>
      <v-carousel-item
        v-for="(img,i) in homepageImages"
        :key="i"
        :src="img.src"
      ></v-carousel-item>
    </v-carousel>

</template>

<script>
import webpageStore from '@/stores/webpageStore'

export default {
  computed: {
    homepageImages() {
      return webpageStore.state.homepageImages
    }
  }
}
</script>
