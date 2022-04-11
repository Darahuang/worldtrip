<template>
  <Loading :isLoading ="isLoading"></Loading>
  <section class="container my-5" v-if="myFavorite.length !== 0">
    <h2 class="text-center text-primary fw-bold h1 mb-4">
      <span class="material-icons-outlined h1 align-middle text-secondary">
        favorite
      </span>
      收藏清單
    </h2>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="row">
          <div class="col-md-4" v-for="item in myFavorite" :key="item.id">
            <div class="card products-card h-100 cursor">
              <div class="position-relative">
              <div class="overflow-hidden ">
                <img :src="item.imageUrl" class="products-card-img" alt="產品圖片"
                @click="toProduct(item.id)">
              </div>
                 <span class="material-icons-outlined text-danger
                 favoriteIcon-bg p-2 favoriteIcon-position"
                 @click="removeFavorite(item)">
                    favorite
                 </span>
               <span class="badge bg-secondary badge-position p-2">{{ item.category}}</span>
              </div>
               <div class="card-body text-center" @click="toProduct(item.id)">
                <h2 class="card-title h4">{{ item.title }}</h2>
                <p class="card-text">{{ item.description }}</p>
                <p class="h5 text-danger">{{ $filters.dollarSignThousandth(item.price) }}</p>
                <button class="btn btn-slide-right col-6 p-2 border-0 mt-2"
                        @click="addToCart(item.id)"
                        :disabled ="loadingStatus.loadingItem === item.id">
                <div class="spinner-border text-white spinner-border-sm"
                     v-if="loadingStatus.loadingItem === item.id"
                     role="status">
                   <span class="visually-hidden">Loading...</span>
                </div>
                立即報名
                </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else class="container">
    <div class="d-flex flex-column justify-content-center align-items-center vh-100">
      <div class="favorite-img bg-size-contain bg-repeat-no-repeat"></div>
       <p class="fw-bold h4 text-center mb-4">
        收藏清單目前沒有商品，<br />
        立刻挑選喜愛的行程吧！
      </p>
       <router-link to="/products" class="btn btn-slide-right border-0 px-5 py-2">
        挑選行程
      </router-link>
    </div>

  </section>
</template>

<script>
import Loading from '@/components/Loading.vue';
import {
  reactive, toRefs, watch, inject,
} from 'vue';
import { useRouter } from 'vue-router';
import localStorageMethods from '@/methods/localStorageMethods';
import emitter from '@/methods/emitter';

export default {
  components: {
    Loading,
  },
  setup() {
    const Message = inject('Message');
    const axios = inject('axios');
    const router = useRouter();

    const data = reactive({
      isLoading: false,
      myFavorite: localStorageMethods.get() || [],
      loadingStatus: {
        loadingItem: '',
      },
    });
    function removeFavorite(item) {
      const favIndex = data.myFavorite.findIndex((el) => el.title === item.title);
      if (favIndex !== -1) {
        data.myFavorite.splice(favIndex, 1);
        Message('warning', `${item.title}從收藏清單移出`);
      }
    }
    function toProduct(id) {
      router.push(`/product/${id}`);
    }
    async function addToCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      data.isLoading = true;
      data.loadingStatus.loadingItem = id;
      try {
        const res = await axios.post(api, { data: cart });
        if (res.data.success) {
          emitter.emit('emit-carts');
          Message('success', `${res.data.message}`);
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
    watch(() => data.myFavorite, () => {
      localStorageMethods.save(data.myFavorite);
      emitter.emit('emit-myFavorite');
    }, { deep: true });
    const refData = toRefs(data);
    return {
      ...refData,
      removeFavorite,
      addToCart,
      toProduct,
    };
  },
};
</script>

<style>

</style>
