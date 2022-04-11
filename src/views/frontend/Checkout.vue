<template>
  <Loading :isLoading="isLoading"></Loading>
  <section class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <ProgressBar :done="done" />
        <div class="row flex-row-reverse">
          <div class="col-lg-4 mb-3 mb-lg-0">
            <div class="bg-primary-light">
              <div class="d-flex p-3" v-for="item in carts.carts" :key="item.id">
                <img
                  :src="item.product.imageUrl"
                  class="cart-img object-fit-cover object-position-center"
                  alt=""
                />
                <div class="ms-3">
                  <h3 class="h5">{{ item.product.title }}</h3>
                  <small>{{ $filters.dollarSignThousandth(item.product.price) }}</small>
                  <small> * {{ item.qty }}{{ item.product.unit }}</small>
                </div>
              </div>
              <div class="p-3">
                <div class="d-flex justify-content-between border-top pt-3">
                  <p class="h6">應付金額:</p>
                  <p v-if="carts.final_total" class="h5 text-primary fw-bold">
                    {{ $filters.dollarSignThousandth(carts.final_total) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <span class="text-danger">*為必填欄位</span>
            <Form v-slot="{ errors, meta }" @submit="createOrder">
              <div class="row mt-3">
                <div class="col-md-6 mb-3">
                  <label for="name" class="form-label">聯絡人姓名</label>
                  <span class="text-danger">*</span>
                  <Field
                    type="text"
                    class="form-control form-input-bg"
                    id="name"
                    placeholder="請輸入姓名"
                    name="姓名"
                    rules="required"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    v-model="form.user.name"
                  />
                  <ErrorMessage name="姓名" class="invalid-feedback" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="email" class="form-label">Email</label>
                  <span class="text-danger">*</span>
                  <Field
                    type="email"
                    class="form-control form-input-bg"
                    id="email"
                    placeholder="請輸入Email"
                    name="Email"
                    rules="email||required"
                    :class="{ 'is-invalid': errors['Email'] }"
                    v-model="form.user.email"
                  />
                  <ErrorMessage name="Email" class="invalid-feedback" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="tel" class="form-label">電話</label>
                  <span class="text-danger">*</span>
                  <Field
                    type="tel"
                    class="form-control form-input-bg"
                    id="tel"
                    placeholder="請輸入手機或家用電話"
                    name="tel"
                    :rules="isPhone"
                    :class="{ 'is-invalid': errors['tel'] }"
                    v-model="form.user.tel"
                  />
                  <ErrorMessage name="tel" class="invalid-feedback" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="payment" class="form-label">付款方式</label>
                  <span class="text-danger">*</span>
                  <Field
                    class="form-select form-input-bg"
                    id="payment"
                    name="付款方式"
                    rules="required"
                    :class="{ 'is-invalid': errors['付款方式'] }"
                    as="select"
                    v-model="form.user.payment_method"
                  >
                  <option value="" disabled>請選擇付款方式</option>
                  <option :value="item" v-for="(item, index) in payment" :key="index">
                    {{ item }}
                    </option>
                  </Field>
                   <ErrorMessage name="付款方式" class="invalid-feedback" />
                </div>
                <div class="col-12 mb-3">
                  <label for="address" class="form-label">聯絡人地址</label>
                  <span class="text-danger">*</span>
                  <Field
                    type="text"
                    class="form-control form-input-bg"
                    id="address"
                    placeholder="請輸入地址"
                    name="地址"
                    rules="required"
                    :class="{ 'is-invalid': errors['地址'] }"
                    v-model="form.user.address"
                  />
                  <ErrorMessage name="地址" class="invalid-feedback" />
                </div>
                <div class="col-12 mt-3">
                  <div class="form-floating">
                    <textarea
                      class="form-control form-input-bg"
                      placeholder="請輸入您的備註"
                      id="message"
                      style="height: 75px"
                      v-model="form.message"
                    ></textarea>
                    <label for="message">請輸入您的備註</label>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between mt-3">
               <router-link to="/carts" class="btn btn-outline-primary">回到上一頁</router-link>
               <button class="btn btn-primary" type="submit" :disabled="!meta.valid">
                 確認送出
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loading from '@/components/Loading.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import goTop from '@/methods/goTop';
import emitter from '@/methods/emitter';
import { reactive, toRefs, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: {
    Loading,
    ProgressBar,
  },
  setup() {
    const Message = inject('Message');
    const axios = inject('axios');
    const route = useRoute();
    const router = useRouter();

    const data = reactive({
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          payment_method: '',
        },
        message: '',
      },
      payment: ['WebATM', 'ATM', 'CVS', 'Barcode', 'Credit', 'ApplePay', 'GooglePay'],
      isLoading: false,
      done: route.name,
      carts: {},
    });
    async function getCarts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
      data.isLoading = true;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          data.carts = res.data.data;
        }
        goTop();
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法取得資料，請再次確認!');
        data.isLoading = false;
      }
    }
    getCarts();

    function isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/ && /^\(?(\d{2})\)?[\s\]?(\d{4})\-?(\d{4})$/ && /^[0-9]{8,10}$/;
      return phoneNumber.test(value) ? true : '手機或家用電話為必填';
    }

    async function createOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/order`;
      data.isLoading = true;
      try {
        const res = await axios.post(api, { data: data.form });
        if (res.data.success) {
          emitter.emit('emit-carts'); // 建立訂單後,購物車會清空,Menu需要重新取得購物車
          router.push(`/payment/${res.data.orderId}`);
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法建立訂單，請再次確認!');
        data.isLoading = false;
      }
    }

    const refData = toRefs(data);

    return {
      ...refData,
      getCarts,
      isPhone,
      createOrder,
    };
  },
};
</script>

<style></style>
