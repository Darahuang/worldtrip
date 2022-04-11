<template>
  <section class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="row align-items-center">
          <div class="col-md-6" data-aos="fade-right">
            <h3 class="fw-bold mb-3 title-border">成立</h3>
            <p class="lh-base">
              WorldTrip，成立的初衷是希望以讓大家能透過旅行感受到幸福和滿足感，根據顧客的需求來規劃出
              各種多樣化的旅遊路線，嚴選國外的當地特色行程，精準而完整地呈現出不同國家的文化背景。
            </p>
            <h3 class="fw-bold mb-3 title-border">理念</h3>
            <p class="lh-base">
              「以顧客需求為出發，勇於創新並開發多元的旅遊路線」-這是從成立就不變的宗旨，來打造出令顧客滿意的旅遊產品。為了讓旅遊更加精緻豐富，近年來也推出各式各樣的「主題旅遊」，
              讓顧客們能夠根據自己的興趣來找到喜愛的旅遊方式。
            </p>
          </div>
          <div class="col-md-6" data-aos="fade-left">
            <div class="row">
              <div class="col-6">
                <div class="bg-size-cover bg-position-center about-height about-bg"></div>
              </div>
              <div class="col-6 mt-md-6">
                <div class="bg-size-cover bg-position-center about-height about-bg2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <SwiperCustomer></SwiperCustomer>
  <section class="container mt-6" data-aos="fade-down">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <h3 class="fw-bold mb-3 title-border">經營指針</h3>
        <ul class="row list-unstyled">
          <li class="col-6 col-md-3">
            <div class="feature text-center">
              <span class="material-icons-outlined feature-icon"> public </span>
              <h3 class="h4 text-primary">嚴選的行程</h3>
              <p>為您把關行程品質</p>
            </div>
          </li>
          <li class="col-6 col-md-3">
            <div class="feature text-center">
              <span class="material-icons-outlined feature-icon"> airplane_ticket </span>
              <h3 class="h4 text-primary">多樣化的選擇</h3>
              <p>滿足顧客的需求</p>
            </div>
          </li>
          <li class="col-6 col-md-3">
            <div class="feature text-center">
              <span class="material-icons-outlined feature-icon"> volunteer_activism </span>
              <h3 class="h4 text-primary">核心價值</h3>
              <p>誠實、負責</p>
            </div>
          </li>
          <li class="col-6 col-md-3">
            <div class="feature text-center">
              <span class="material-icons-outlined feature-icon"> outlined_flag </span>
              <h3 class="h4 text-primary">未來願景</h3>
              <p>打造全方位旅遊服務平台</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section class="container-fluid mt-6 info-bg bg-size-cover bg-position-center">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col-md-8">
         <h3 class="text-center fw-bold">獲得優惠及最新消息</h3>
         <Form v-slot="{ errors }" @submit="subscribe" class="text-center">
           <Field
           type="email"
           name="email"
           rules="email|required"
          :class="{'is-invalid': errors['email']}"
           id="subscribe-email"
           class="form-control d-inline w-50 me-3 align-middle"
           placeholder="請輸入您的Email"
           v-model="email"
           >
           </Field>
           <button class="btn btn-slide-right border-0" type="submit">確認送出</button>
            <ErrorMessage name="email" class="invalid-feedback fw-bold"></ErrorMessage>
         </Form>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, toRefs, inject } from 'vue';
import goTop from '@/methods/goTop';
import SwiperCustomer from '@/components/SwiperCustomer.vue';

export default {
  components: {
    SwiperCustomer,
  },
  setup() {
    const Message = inject('Message');
    const data = reactive({
      email: '',
    });
    goTop();
    function subscribe() {
      Message('success', '訂閱成功');
    }
    const refData = toRefs(data);
    return {
      ...refData,
      subscribe,
    };
  },

};
</script>

<style></style>
