<template>
  <div id="app" class="d-flex flex-column min-vh-100">
  
    <Header />

    <Navigation />

    <main class="container my-4 flex-grow-1">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
