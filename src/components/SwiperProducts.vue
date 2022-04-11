<template>
 <section class="container mt-6" data-aos="fade-down">
   <h2 class="topic mb-4">熱銷行程</h2>
   <Swiper
    :slidesPerView="1"
    :spaceBetween="10"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      }"
    :loop="true"
    :modules="modules"
    :breakpoints="{
      '576': {
          slidesPerView: 2,
          spaceBetween: 10
        },
        '768': {
          slidesPerView: 4,
          spaceBetween: 10
        }
      }"
    class="mySwiper"
      >
   <SwiperSlide v-for="item in products" :key="item.id" class="h-auto">
     <div class="cursor shadow-sm popular-card card h-100" @click="emitProduct(item.id)">
       <div class="overflow-hidden">
         <img :src="item.imageUrl" class="popular-card-img object-fit-cover
         object-position-center" alt="產品圖片">
       </div>
       <div class="p-4">
         <h3 class="h4 text-primary mb-0 text-start mb-2">{{ item.title }}</h3>
            <p class="mb-2">{{ item.description }}</p>
            <p class="text-danger mb-0 text-end">
              {{ $filters.dollarSignThousandth(item.price) }}
            </p>
       </div>
     </div>
   </SwiperSlide>
 </Swiper>
 </section>

</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper';

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
      modules: [Autoplay],
      emitProduct,
    };
  },
};
</script>

<style>

</style>
