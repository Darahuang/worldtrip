<template>
  <Loading :isLoading="isLoading"></Loading>
  <section class="container-fluid products-banner-bg bg-size-cover bg-position-center"></section>
  <section class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <ul
          class="list-unstyled d-flex flex-wrap
           justify-content-md-between category"
        >
          <li class="category-list text-center">
            <a
              href="#"
              class="text-decoration-none category-item h3 d-block mb-0 py-2 px-3"
              :class="{'active': category === ''}"
              @click.prevent="(category = ''), (searchInput = '')"
            >
              全部
            </a>
          </li>
          <li class="category-list text-center" v-for="(item, index) in categories" :key="index">
            <a
              href="#"
              class="text-decoration-none category-item h3 d-block mb-0 py-2 px-3"
               :class="{'active': category === `${item}`}"
              @click.prevent="(category = `${item}`), (searchInput = '')"
            >
              {{ item }}
            </a>
          </li>
        </ul>
        <div class="mb-3 d-flex justify-content-end">
          <input
            type="search"
            class="form-control d-none d-sm-block w-100 w-md-25"
            id="search"
            placeholder="請輸入關鍵字 e.g. 亞洲、東京"
            v-model.lazy="searchInput"
            @input="category = ''"
          />
        </div>
        <div class="row" v-if="filterProducts.length !== 0">
          <div
            class="col-md-6 col-lg-4 mt-5"
            v-for="item in filterProducts"
            :key="item.id"
            data-aos="fade-up"
          >
            <div class="card h-100 cursor products-card">
              <div class="position-relative">
                <div class="overflow-hidden">
                  <img
                    :src="item.imageUrl"
                    class="products-card-img objet-fit-cover objet-position-center"
                    alt="產品圖片"
                    @click="toProduct(item.id)"
                  />
                </div>
                <!-- 手機以上的hover效果 -->
                <ul
                  class="social-icons d-none d-sm-flex
                  justify-content-center
                  text-center list-unstyled"
                >
                  <li>
                    <a href="#" @click.prevent="addToFavorite(item)">
                      <span
                        class="material-icons-outlined text-danger icon fs-3"
                        v-if="myFavorite.find((el) => el.title === item.title)"
                      >
                        favorite
                      </span>
                      <span class="material-icons-outlined icon fs-3" v-else>
                        favorite_border
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" @click.prevent="addToCart(item.id)">
                      <span class="material-icons-outlined icon fs-3"> shopping_cart </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" @click.prevent="toProduct(item.id)">
                      <span class="material-icons-outlined icon fs-3"> zoom_in </span>
                    </a>
                  </li>
                </ul>
                <!-- 手機以下我的最愛樣式 -->
                <div
                  class="favoriteIcon-position favoriteIcon-bg p-2 d-block d-sm-none"
                  @click="addToFavorite(item)"
                >
                  <span
                    class="material-icons-outlined text-danger align-middle "
                    v-if="myFavorite.find((el) => el.title === item.title)"
                  >
                    favorite
                  </span>
                  <span class="material-icons-outlined text-danger align-middle" v-else>
                    favorite_border
                  </span>
                </div>
                <div class="badge bg-secondary badge-position px-3 py-2">
                  {{ item.category }}
                </div>
              </div>
              <div class="card-body text-center" @click="toProduct(item.id)">
                <h2 class="card-title h4">{{ item.title }}</h2>
                <p class="card-text">{{ item.description }}</p>
                <p class="h5 text-danger">{{ $filters.dollarSignThousandth(item.price) }}</p>
              </div>
              <!-- 手機以下加入購物車樣式 -->
              <div class="text-center d-block d-sm-none mb-3">
                <button
                  class="btn btn-slide-right col-6 border-0 p-2"
                  @click="addToCart(item.id)"
                  :disabled="loadingStatus.loadingItem === item.id"
                >
                  <div
                    class="spinner-border spinner-border-sm text-primary"
                    v-if="loadingStatus.loadingItem === item.id"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  立即報名
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="d-flex justify-content-center align-items-center">
          <div class="search-bg bg-size-contain bg-repeat-no-repeat"></div>
          <p class="fw-bold">查無資料,請再次確認!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  reactive, toRefs, inject, computed, watch,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import emitter from '@/methods/emitter';
import Loading from '@/components/Loading.vue';
import goTop from '@/methods/goTop';
import localStorageMethods from '@/methods/localStorageMethods';

export default {
  components: {
    Loading,
  },
  setup() {
    const Message = inject('Message');
    const axios = inject('axios');
    const router = useRouter();
    const route = useRoute();

    const data = reactive({
      products: [],
      isLoading: false,
      loadingStatus: {
        loadingItem: '',
      },
      myFavorite: localStorageMethods.get() || [],
      category: '',
      searchInput: '',
      categories: [],
    });

    function getCategories() {
      const categories = new Set();
      data.products.forEach((item) => {
        categories.add(item.category);
      });
      data.categories = [...categories];
    }

    async function getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/products/all`;
      data.isLoading = true;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          data.products = res.data.products;
          getCategories();
          const { categoryName } = route.params;
          if (categoryName) {
            data.category = categoryName;
          }
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
    getProducts();

    async function addToCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
      data.isLoading = true;
      data.loadingStatus.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      try {
        const res = await axios.post(api, { data: cart });
        if (res.data.success) {
          Message('success', `${res.data.message}`);
          emitter.emit('emit-carts');
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
        data.loadingStatus.loadingItem = '';
      } catch (error) {
        Message('error', '無法報名，請再次確認!');
        data.isLoading = false;
        data.loadingStatus.loadingItem = '';
      }
    }

    function addToFavorite(favoriteItem) {
      const favIndex = data.myFavorite.findIndex((item) => item.id === favoriteItem.id);
      if (favIndex === -1) {
        data.myFavorite.push(favoriteItem);
        Message('success', `${favoriteItem.title}加入收藏清單`);
      } else {
        data.myFavorite.splice(favIndex, 1);
        Message('warning', `${favoriteItem.title}從收藏清單移出`);
      }
    }

    function toProduct(id) {
      router.push(`/product/${id}`);
    }

    const filterProducts = computed(() => {
      if (data.category !== '') {
        return data.products.filter((item) => item.category.indexOf(data.category) !== -1);
      }
      if (data.searchInput !== '') {
        return data.products.filter(
          (item) => item.title.includes(data.searchInput)
          || item.category.includes(data.searchInput),
        );
      }
      return data.products;
    });
    watch(
      () => data.myFavorite,
      () => {
        localStorageMethods.save(data.myFavorite);
        emitter.emit('emit-myFavorite');
      },
      { deep: true },
    );
    const refData = toRefs(data);
    return {
      ...refData,
      getProducts,
      filterProducts,
      addToFavorite,
      toProduct,
      addToCart,
      getCategories,
    };
  },
};
</script>

<style></style>
