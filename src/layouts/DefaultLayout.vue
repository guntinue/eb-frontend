<script setup>
import Header from '@/components/common/Header.vue';
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
</script>

<template>
  <div class="layout-container">
    <Header />
    <Navbar />
    <main class="main-content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.main-content {
  min-height: calc(100vh - 200px);
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
