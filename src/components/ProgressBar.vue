<template>
  <div class="container mb-5">
    <ul class="list-unstyled row">
      <li class="progressBar-step progressBar-icon1 col-4"
      :class="{ 'progressBar-done': done === 'Carts' || step2
      ||step3 }">
      <p class="fs-7">確認購物車</p>
      </li>
      <li class="progressBar-step progressBar-icon2 col-4"
      :class="{ 'progressBar-done': done === 'Checkout' || step3 }">
      <p class="fs-7">填寫資料</p>
      </li>
      <li class="progressBar-step progressBar-icon3 col-4"
      :class="{ 'progressBar-done': done === 'Payment' }">
        <p class="fs-7">確認訂單</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    done: {
      type: String,
    },
  },
  setup(props) {
    const step2 = computed(() => props.done === 'Checkout');
    const step3 = computed(() => props.done === 'Payment');
    return {
      step2,
      step3,
    };
  },
};
</script>

<style></style>
