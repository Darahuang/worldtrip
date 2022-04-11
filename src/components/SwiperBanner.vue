<template>
  <section data-aos="fade-down">
    <Swiper
      :slidesPerView="1"
      :loop="true"
      :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="item in products.slice(5,10)" :key="item.id">
        <div class="cursor" @click="emitProduct(item.id)">
          <div class="position-relative">
            <img :src="item.imageUrl" class="banner-img-height
            object-fit-cover object-position-center" alt="產品圖片">
            <div class="p-2 p-md-4 bg-light opacity-75 position-absolute bottom-10 start-50
            translate-middle-x w-75 w-md-50 w-lg-35">
            <h3 class="text-primary mb-0 text-center mb-2 fw-bold">{{item.title}}</h3>
            <p class="mb-2 h5 text-center">{{item.description}}</p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </Swiper>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination, Navigation } from 'swiper';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    products: {
      type: Array,
    },
  },
  emits: ['emit-product'],

  setup(props, context) {
    function emitProduct(id) {
      context.emit('emit-product', id);
    }

    return {
      modules: [Autoplay, Pagination, Navigation],
      emitProduct,
    };
  },
};
</script>

<style></style>
