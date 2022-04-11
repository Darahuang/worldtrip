<template>
  <section class="p-4 mt-6 bg-primary-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <h3 class="fw-bold mb-3 title-border">客戶好評</h3>
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
            class="mySwiper"
          >
            <SwiperSlide v-for="(item, index) in customers" :key="index">
                <div class="position-relative customer">
                  <img :src="item.imageUrl" class="img-fluid rounded-pill"
                  alt="客戶圖片" />
                  <span class="material-icons-outlined align-middle customer-icon">
                    format_quote
                  </span>
                </div>
                <p class="text-center text-dark mt-3">{{ item.comment }}</p>
                <div class="d-flex justify-content-center">
                  <div class="me-0 me-sm-3 text-secondary">
                    <span class="material-icons-outlined"> star </span>
                    <span class="material-icons-outlined"> star </span>
                    <span class="material-icons-outlined"> star </span>
                    <span class="material-icons-outlined"> star </span>
                    <span class="material-icons-outlined"> star </span>
                  </div>
                  <p class="text-dark">{{ item.name }}</p>
                </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
import { reactive, toRefs } from 'vue';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const data = reactive({
      customers: [
        {
          name: '王美美',
          imageUrl:
            'https://storage.googleapis.com/vue-course-api.appspot.com/starlightselection/1628989357381.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=VDoD7l00WfHYVuj3pQOCu4FQDm6w%2B2lbS601A58%2BoXD3hR%2BCDkxmMe6vmn9%2BU4vXv9zDu8HPmMEgiufORBYtYrGupmKw72yG4%2Bsi0%2B5thopnB%2BhAoATSVz3SB4OWWyKS1FxwLR0hEDwSq%2FXWDRMFA1wISC7CrYStFEf%2BgLuZ%2FFPq4TD7TtGh8UEo2oo7ILX7ozcSWGixiw7J6M0suLWGPdPOy46kn3trGj6lLDogSMj%2FzdICTa0A8DRyDSjyupBX1I1y5%2BILgavfKwVMZ4Z%2FB5G7taGYbKkmMpH4xMmc3hEkr0dinWOISycv%2FbPGR3xUsJczziAv9lJaPA86KaA6dQ%3D%3D',
          comment: '旅遊能夠讓我們接觸不同的文化開拓視野，要旅遊找WorldTrip!',
        },
        {
          name: '林麗麗',
          imageUrl:
            'https://storage.googleapis.com/vue-course-api.appspot.com/starlightselection/1628989328560.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hfQ%2BclohwcVjPsY7aoZq%2BL3fAMRf%2BnISOYk%2BGfhoKEDx1hKnYJkO%2B5Q6NlpjTmWA7PtS3rsgfo8iFKyddm0%2FFyVPBo0jva5nPrfQU3Ig4hxVN%2FmbwS88bL2cLc4SQyAjkWiSpz63mbjc4mYjbKXJFn3WqdllnImiqRYzMO%2F51cXCfRu32T7leJ57pb6WOVgsZ7uRSO4zAEtbd%2BkZ1QhWqsixFtLUODvwFMpzjLIZ0qRz68TdrGZRqp2PsULoVIPKIsywKf5GaMZc%2BLEe0ZpGd3jcavrAjWZB3roW4%2BY4u%2BYAeul3YYOhMm0FTzV7c%2BKEQv7BvmspIaSCmwTRo%2BZ1mg%3D%3D',
          comment: '休息是為了走更長遠的路，旅行也是! WorldTrip安排的行程真的很棒!',
        },
        {
          name: '陳嘉嘉',
          imageUrl:
            'https://storage.googleapis.com/vue-course-api.appspot.com/starlightselection/1628989298688.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=onaJGEO6DqmhjJWSwxUl7fBw7Irha%2FSZX7uJzNVCmQIURdzIUmlAHM%2F2Nlieom5i2DtYBsN9pwhJoonPtLs0Q%2BIiCwYWkUfY2%2Bu4Jqbmx8ystkdhdCVpmPU3He2a4dV37fAVUtme425Yn0HpOZCps4CmlRAsB7caJrVFC%2BSMXN5cVpQZN91fCCxGjufjnixvuRWZo3YekGie4UCAVWkywftx5YKK3g46awAz9sPgNfMjRdh02h1yZc%2BXYaqa8hxZApoTDYcYfx0NiC8u%2FTvJf5Fyg%2F7opVzlsiMXR1dp9RJyF3S1xolsN1H%2FHPc5%2BaMBN6rPbh0VINJhucQ9KNMEKA%3D%3D',
          comment: '旅行讓繁忙的我有喘息休息的機會，旅遊的事放心交給WorldTrip!',
        },
        {
          name: '黃玲玲',
          imageUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
          comment: '擺脫工作、生活上的煩惱，放下一切去旅行吧! WorldTrip值得信賴。',
        },
      ],
    });
    const refData = toRefs(data);
    return {
      ...refData,
      modules: [Autoplay],
    };
  },
};
</script>

<style></style>
