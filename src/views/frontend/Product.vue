<template>
  <Loading :isLoading="isLoading"></Loading>
  <section
    class="container-fluid product-banner bg-size-cover bg-position-center"
    :style="{ 'background-image': `url(${product.imageUrl})` }"
  ></section>
  <section class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="row">
          <div class="col-md-6 d-none d-md-block">
            <img
              :src="product.imageUrl"
              class="product-img object-fit-cover object-position-center"
              alt="產品圖片"
            />
          </div>
          <div class="col-md-6">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link class="text-decoration-none" to="/">首頁</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link class="text-decoration-none" to="/products">行程列表</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
              </ol>
            </nav>
            <div class="p-4 card">
              <div class="d-flex justify-content-between align-items-center">
                <h2 class="fw-bold h1 mb-0">{{ product.title }}</h2>
                <div class="cursor p-3" @click="addToMyFavorite(product)">
                  <span
                    class="material-icons-outlined text-danger fs-2 algin-middle"
                    v-if="myFavorite.find((el) => el.title === product.title)"
                  >
                    favorite
                  </span>
                  <span class="material-icons-outlined text-danger fs-2 algin-middle" v-else>
                    favorite_border
                  </span>
                </div>
              </div>
              <p class="h5 mt-2">{{ product.description }}</p>
              <ul class="list-unstyled mt-2 mb-0" v-html="product.condition"></ul>
              <div
                class="d-flex justify-content-between align-items-center mt-2"
                v-if="product.price"
              >
                <del class="text-muted">
                  {{ $filters.dollarSignThousandth(product.origin_price) }}
                </del>
                <p class="h5 fw-bold">
                  {{ $filters.dollarSignThousandth(product.price) }}
                </p>
              </div>
              <hr class="border-top my-2" />
              <form class="row mt-3">
                <div class="col-lg-6">
                  <div class="input-group input-group-sm mb-3">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click="qty -= 1"
                      :disabled="qty <= 1"
                    >
                      <span class="material-icons-outlined align-middle"> remove </span>
                    </button>
                    <input
                      type="text"
                      class="form-control text-center"
                      v-model.number="qty"
                      min="1"
                    />
                    <button class="btn btn-outline-secondary" type="button" @click="qty += 1">
                      <span class="material-icons-outlined align-middle"> add </span>
                    </button>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="text-end">
                    <p class="h5 lh-base text-danger fw-bold" v-if="product.price">
                      <span class="h6">總額</span>
                      {{ $filters.dollarSignThousandth(product.price * qty) }}
                    </p>
                  </div>
                </div>
                <div class="col-12">
                  <button
                    class="btn btn-slide-right border-0 w-100 p-2"
                    @click="addToCart(product.id, qty)"
                  >
                    立即報名
                  </button>
                </div>
              </form>
            </div>
          </div>
            <h2 class="text-center midline my-5">行程特色</h2>
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <p v-html="product.content"></p>
              </div>
            </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container my-5">
    <h2 class="text-center mb-5 midline">猜您喜歡</h2>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-3" v-for="item in relatedProducts.slice(0,4)"
          :key="item.id">
            <div class="random-card cursor shadow-sm h-100" @click="toProduct(item.id)">
              <div class="position-relative">
                <img :src="item.imageUrl" class="random-card-img
                objet-fit-cover objet-position-center" alt="產品圖片">
                <div class="random-card-overlay d-flex align-items-center justify-content-center">
                  <!-- 手機以上的hover效果 -->
                  <span class="material-icons-outlined zoomIn-icon fs-1 text-white
                  d-none d-sm-block">
                    zoom_in
                  </span>
                </div>
              </div>
              <div class="p-3">
                <h3 class="h4 text-primary">{{item.title}}</h3>
                <p class="mb-2">{{item.description}}</p>
                <p class="mb-0 text-danger text-end">
                  {{$filters.dollarSignThousandth(item.price)}}
                </p>
                <div class="text-center my-2">
                <button class="btn btn-primary d-inline-block d-sm-none w-100"
                @click="toProduct(item.id)">查看更多
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loading from '@/components/Loading.vue';
import {
  reactive, toRefs, inject, watch, computed,
} from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import emitter from '@/methods/emitter';
import goTop from '@/methods/goTop';
import localStorageMethods from '@/methods/localStorageMethods';

export default {
  components: {
    Loading,
  },
  setup() {
    const Message = inject('Message');
    const axios = inject('axios');
    const route = useRoute();
    const router = useRouter();

    const data = reactive({
      isLoading: false,
      product: {},
      id: '',
      myFavorite: localStorageMethods.get('favorite') || [],
      products: [],
      qty: 1,
      relatedProducts: [],
    });

    async function getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/products/all`;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          data.products = res.data.products;
        } else {
          Message('error', `${res.data.message}`);
        }
      } catch (error) {
        Message('error', '無法取得產品，請再次確認!');
      }
    }

    data.id = route.params.id;
    async function getProduct(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/product/${id}`;
      data.isLoading = true;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          data.product = res.data.product;
          getProducts();
        } else {
          Message('error', `${res.data.message}`);
        }
        goTop();
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法取得產品，請再次確認!');
        data.isLoading = false;
      }
    }
    getProduct(data.id);

    function addToMyFavorite(item) {
      const favIndex = data.myFavorite.findIndex((el) => el.title === item.title);
      if (favIndex === -1) {
        data.myFavorite.push(item);
        Message('success', `${item.title}加入收藏清單`);
      } else {
        data.myFavorite.splice(favIndex, 1);
        Message('warning', `${item.title}從收藏清單移出`);
      }
    }

    function toProduct(id) {
      router.push(`/product/${id}`);
    }

    const relatedProducts = computed(() => {
      let filterProducts = [];
      filterProducts = data.products.filter((item) => item.category === data.product.category
      && item.title !== data.product.title);
      filterProducts.sort(() => Math.random() - 0.5);
      return filterProducts;
    });
    watch(
      () => data.myFavorite,
      () => {
        localStorageMethods.save(data.myFavorite);
        emitter.emit('emit-myFavorite');
      },
      { deep: true },
    );

    // 使用動態路由切換頁面在同一元件上,不會重新渲染元件,使用下列解決方法
    onBeforeRouteUpdate((to, from) => {
      if (to.params.id !== from.params.id) {
        getProduct(to.params.id);
      }
    });

    const refData = toRefs(data);
    return {
      ...refData,
      addToMyFavorite,
      toProduct,
      relatedProducts,
    };
  },
};
</script>

<style></style>
