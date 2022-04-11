<template>
   <Menu />
  <div class="wrapper">
    <router-view></router-view>
  </div>
  <Footer />
  <Sidebar />
  <GoTop />
</template>

<script>
import Menu from '@/components/Menu.vue';
import Footer from '@/components/Footer.vue';
import GoTop from '@/components/GoTop.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Menu,
    GoTop,
    Footer,
    Sidebar,
  },
};
</script>

<style>

</style>
