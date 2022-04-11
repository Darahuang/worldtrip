<template>
  <div v-if="show">
    <a href="#" @click.prevent="goTop" class="d-block icon-goTop link-dark">
      <span class="material-icons-outlined fs-1 align-middle">
      expand_less
    </span>
    </a>
  </div>
</template>

<script>
import {
  reactive, onMounted, onBeforeUnmount, toRefs,
} from 'vue';

export default {
  setup() {
    const data = reactive({
      show: false,
    });

    function showBtn() {
      if (window.scrollY > 400) {
        data.show = true;
      } else {
        data.show = false;
      }
    }

    function goTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    onMounted(() => {
      window.addEventListener('scroll', showBtn);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', showBtn);
    });

    const refData = toRefs(data);

    return {
      showBtn,
      goTop,
      ...refData,
    };
  },
};
</script>

<style></style>
