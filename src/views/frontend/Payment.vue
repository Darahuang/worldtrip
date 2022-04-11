<template>
  <Loading :isLoading="isLoading"></Loading>
  <section class="container my-5" v-if="!order.is_paid">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <ProgressBar :done="done"></ProgressBar>
        <h2 class="topic mb-3">訂單細節</h2>
        <div class="border mb-5 bg-primary-light">
          <div class="d-flex align-items-center p-3" v-for="item in order.products" :key="item.id">
            <img
              :src="item.product.imageUrl"
              class="cart-img object-fit-cover object-position-center"
              alt="產品圖片"
            />
            <div class="flex-grow-1 d-flex flex-column flex-sm-row justify-content-between ms-3">
              <h3 class="h5">{{ item.product.title }} *{{ item.qty }} {{ item.product.unit }}</h3>
              <h3 class="h6">{{ $filters.dollarSignThousandth(item.final_total) }}</h3>
            </div>
          </div>
          <div class="border-top d-flex justify-content-end align-items-center p-3">
            <span>訂單金額</span>
            <h3 class="ms-3 text-primary fw-bold h4" v-if="order.total">
              {{ $filters.dollarSignThousandth(order.total) }}
            </h3>
          </div>
        </div>

        <h2 class="topic mb-3">客戶資料</h2>
        <div class="row border align-items-center" v-if="order.user">
          <div class="col-md-6">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th style="width: 120px" class="px-3">姓名</th>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th style="width: 120px" class="px-3">電話:</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th style="width: 120px" class="px-3">信箱:</th>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th style="width: 120px" class="px-3">地址:</th>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                  <th style="width: 120px" class="px-3">付款方式:</th>
                  <td>{{ order.user.payment_method }}</td>
                </tr>
                <tr>
                  <th style="width: 120px" class="px-3">付款狀態:</th>
                  <td>
                    <span v-if="!order.is_paid" class="text-danger">未付款</span>
                    <span v-else class="text-success">已付款</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-6 d-none d-md-block">
            <div
              class="user-bg bg-size-contain bg-repeat-no-repeat bg-position-center float-end"
            ></div>
          </div>
        </div>
        <button
          class="btn btn-primary btn-slide-right border-0 py-2 px-5 float-end mt-3"
          @click="payOrder"
        >
          確認付款
        </button>
      </div>
    </div>
  </section>
  <section v-else class="container my-5">
    <div class="row vh-100 align-items-center position-relative">
      <div class="col-md-6 z-index">
        <div class="px-3">
          <h2 class="text-primary fw-bold h1">
            <span class="material-icons-outlined h1 align-middle text-secondary"> paid </span
            >付款完成
          </h2>
          <h3 class="h5 mb-3 fw-bold">行程資訊</h3>
          <table class="table table-borderless">
            <tbody>
              <template v-for="item in order.products" :key="item.id">
                <tr>
                  <th style="width: 80px" class="fw-normal">行程名稱</th>
                  <td>
                    {{ item.product.title }}
                  </td>
                </tr>
                <tr>
                  <th style="width: 80px" class="fw-normal">參加人數</th>
                  <td>{{ item.qty }}{{ item.product.unit }}</td>
                </tr>
                <tr>
                  <th style="width: 80px" class="fw-normal">付款金額</th>
                  <td>{{ $filters.dollarSignThousandth(item.final_total) }}</td>
                </tr>
              </template>
            </tbody>
          </table>
          <hr />
          <h3 class="h5 mb-3 fw-bold">付款資訊</h3>
          <table class="table table-borderless" v-if="order.user">
            <tbody>
              <tr>
                <td>姓名</td>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <td>連絡電話</td>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <td>連絡地址</td>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <td style="width: 80px">付款狀態</td>
                <td>
                  <span v-if="order.is_paid" class="text-success">已付款</span>
                  <span v-else class="text-danger">未付款</span>
                </td>
              </tr>
              <tr>
                <td>付款日</td>
                <td>{{ $filters.date(order.paid_date) }}</td>
              </tr>
              <tr>
                <td>付款方式</td>
                <td>{{ order.user.payment_method }}</td>
              </tr>
            </tbody>
          </table>
          <router-link to="/products" class="btn btn-slide-right float-end border-0 px-5"
            >挑選行程</router-link
          >
        </div>
      </div>
      <div
        class="col-md-6 payment-bg payment-bg-md-position bg-size-cover bg-position-center"
      ></div>
    </div>
  </section>
</template>

<script>
import Loading from '@/components/Loading.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import goTop from '@/methods/goTop';
import { reactive, inject, toRefs } from 'vue';
import { useRoute } from 'vue-router';

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
      done: route.name,
      orderId: '',
      order: {},
    });

    data.orderId = route.params.orderId;
    async function getOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/order/${data.orderId}`;
      data.isLoading = true;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          data.order = res.data.order;
        }
        goTop();
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法取得訂單，請再次確認!');
        data.isLoading = false;
      }
    }
    getOrder();

    async function payOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/pay/${data.orderId}`;
      data.isLoading = true;
      try {
        const res = await axios.post(api);
        if (res.data.success) {
          getOrder();
          Message('success', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '付款未完成，請再次確認');
        data.isLoading = false;
      }
    }
    const refData = toRefs(data);
    return {
      ...refData,
      payOrder,
      getOrder,
    };
  },
};
</script>

<style></style>
