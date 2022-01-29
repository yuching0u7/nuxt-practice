<template>
  <div>
    <the-header @sidenavToggle="displaySidenav = !displaySidenav" />
    <the-sidenav @close="displaySidenav = false" :show="displaySidenav" />
    <nuxt />
  </div>
</template>

<script>
  import TheHeader from '@/components/Navigation/TheHeader.vue'
  import TheSidenav from '@/components/Navigation/TheSidenav.vue'
  export default {
    components: {
      TheHeader,
      TheSidenav
    },
    data() {
      return {
        displaySidenav: false
      }
    }
  }

</script>

<style>
  body {
    font-family: 'Baloo Bhaijaan 2', cursive;
  }

  h1 {
    font-family: 'Supermercado One', cursive;
    margin: 0;
    padding: 0;
  }

</style>
