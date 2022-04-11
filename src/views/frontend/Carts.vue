<template>
  <Loading :isLoading="isLoading"></Loading>
  <section class="container my-5" v-if="carts.total !== 0">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <ProgressBar :done="done"></ProgressBar>
        <div class="row">
          <div class="col-lg-8 mb-3 mb-lg-0">
            <a
              href="#"
              class="d-block text-end text-decoration-none mb-3 link-dark link-hover "
              @click.prevent="deleteAll"
            >
              清空購物清單
            </a>
              <div class="d-flex border p-3 mb-3" v-for="item in carts.carts" :key="item.id">
                <img
                  :src="item.product.imageUrl"
                  alt="產品圖片"
                  class="d-none d-sm-block cart-img object-fit-cover object-position-center"
                />
                <div class="flex-grow-1 ms-3 d-flex justify-content-between">
                  <div>
                    <h3 class="h5">{{ item.product.title }}</h3>
                    <small>{{ $filters.dollarSignThousandth(item.product.price) }}</small>
                    <small> * {{ item.qty }}{{ item.product.unit }}</small>
                    <div class="input-group input-group-sm my-3">
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        :disabled="item.qty <=1"
                        @click="updateCart(item, item.qty - 1)"
                      >
                        <span class="material-icons-outlined align-middle"> remove </span>
                      </button>
                      <input
                        type="number"
                        class="form-control text-center bg-transparent"
                        min="1"
                        v-model.number="item.qty"
                        @change="updateCart(item, item.qty)"
                      />
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        @click="updateCart(item, item.qty + 1)"
                      >
                        <span class="material-icons-outlined align-middle"> add </span>
                      </button>
                    </div>
                  </div>
                 <div class="text-end ms-3">
                    <a href="#" class="text-danger" @click.prevent="deleteCart(item.id)">
                      <span class="material-icons">delete_forever</span>
                    </a>
                    <p class="mt-5 h6">{{ $filters.dollarSignThousandth(item.final_total) }}</p>
                  </div>
                </div>
              </div>
          </div>
          <div class="col-lg-4">
            <div class="card rounded-0">
              <div class="card-header">訂單資訊</div>
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <p>行程總額:</p>
                  <p v-if="carts.carts">{{$filters.dollarSignThousandth(carts.final_total)}}</p>
                </div>
                <div class="input-group">
                  <input type="text" v-model="coupon" class="form-control" placeholder="請輸入優惠碼">
                  <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                    套用優惠碼
                  </button>
                </div>
                <div class="text-primary my-3">
                  <span class="material-icons-outlined align-text-bottom">
                    star
                  </span>
                  <span v-if="carts.total !== carts.final_total">已套用優惠券</span>
                  <span v-else>輸入<span class="text-danger">anniversary</span>可享95折優惠</span>
                </div>
                <div class="d-flex justify-content-between border-bottom">
                  <p>折扣金額:</p>
                  <p v-if="carts.final_total">
                    {{ $filters.dollarSignThousandth( carts.total - carts.final_total ) }}
                  </p>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <p class="card-text">應付金額:</p>
                  <p v-if="carts.final_total" class="h5 text-primary fw-bold">
                    {{ $filters.dollarSignThousandth(carts.final_total) }}
                  </p>
                </div>
              </div>
              <routerLink to="/checkout" class="btn btn-slide-right border-0 rounded-0">前往結帳
              </routerLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else class="container">
    <div class="d-flex flex-column align-items-center justify-content-center vh-100">
    <div class="cart-bg bg-size-cover bg-repeat-no-repeat"></div>
    <p class="fw-bold h4 text-center mb-4">
      購物車目前沒有商品，<br>
      立刻挑選喜愛的行程吧！
    </p>
    <router-link to="/products" class="btn btn-slide-right border-0 px-5 py-2">挑選行程</router-link>
    </div>
  </section>
</template>

<script>
import Loading from '@/components/Loading.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import emitter from '@/methods/emitter';
import { reactive, inject, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import goTop from '@/methods/goTop';

export default {
  components: {
    Loading,
    ProgressBar,
  },
  setup() {
    const Message = inject('Message');
    const axios = inject('axios');
    const route = useRoute();

    const data = reactive({
      isLoading: false,
      carts: {},
      done: route.name,
      coupon: '',
    });

    async function getCarts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
      data.isLoading = true;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          data.carts = res.data.data;
        } else {
          Message('error', '無法取得購物車內容，請再次確認!');
        }
        goTop();
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法取得購物車內容，請再次確認!');
        data.isLoading = false;
      }
    }
    getCarts();

    async function updateCart(item, qty) {
      if (qty <= 0) {
        Message('warning', '人數至少1位');
        return;
      }
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart/${item.id}`;
      const cart = {
        product_id: item.product_id,
        qty,
      };
      data.isLoading = true;
      try {
        const res = await axios.put(api, { data: cart });
        if (res.data.success) {
          getCarts();
          Message('success', `${res.data.message}`);
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法報名，請再次確認!');
        data.isLoading = false;
      }
    }
    async function deleteCart(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart/${id}`;
      data.isLoading = true;
      try {
        const res = await axios.delete(api);
        if (res.data.success) {
          emitter.emit('emit-carts');
          getCarts();
          Message('success', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法清除購物清單，請再次確認!');
        data.isLoading = false;
      }
    }
    async function deleteAll() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/carts`;
      data.isLoading = true;
      try {
        const res = await axios.delete(api);
        if (res.data.success) {
          emitter.emit('emit-carts');
          getCarts();
          Message('success', `${res.data.message}`);
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法清除購物清單，請再次確認!');
        data.isLoading = false;
      }
    }
    async function addCouponCode() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/coupon`;
      data.isLoading = true;
      const coupon = {
        code: data.coupon,
      };
      try {
        const res = await axios.post(api, { data: coupon });
        if (res.data.success) {
          getCarts();
          Message('success', `${res.data.message}`);
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法使用優惠券，請再次確認!');
        data.isLoading = false;
      }
    }

    const refData = toRefs(data);
    return {
      ...refData,
      getCarts,
      updateCart,
      deleteCart,
      deleteAll,
      addCouponCode,
    };
  },
};
</script>

<style></style>
