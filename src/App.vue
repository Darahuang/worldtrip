<template>
  <router-view/>
</template>

<script>
import { provide } from 'vue';
import message from './methods/sweetalertMessage';

export default {
  setup() {
    const Message = message;
    provide('Message', Message);
    return { Message };
  },
};
</script>
<style lang="scss">
@import './assets/stylesheets/all.scss';
@import url("https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp");
</style>
