<template>
  <Loading :isLoading="isLoading"></Loading>
  <SwiperBanner :products="products" @emit-product="toProduct"></SwiperBanner>
  <Category></Category>
  <section class="container mt-6">
    <h2 class="topic mb-4">精選行程</h2>
    <ul class="list-unstyled row g-0">
      <li class="col-md-4" v-if="products[2]" data-aos="fade-down">
        <div
          class="card selected-card cursor border-0 rounded-0 overflow-hidden position-relative"
          @click="toProduct(products[2].id)"
        >
          <img
            :src="products[2].imagesUrl[0]"
            class="selected-card-height-special object-fit-cover object-position-center"
            alt="產品圖片"
          />
          <div class="selected-card-overlay"></div>
          <h3 class="selected-card-title text-white">{{ products[2].title }}</h3>
        </div>
      </li>
      <li class="col-md-4" v-if="products[0]">
        <ul class="list-unstyled row g-0">
          <li
            class="col-sm-6 col-md-12"
            v-if="products[0]"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <div
              class="card selected-card cursor border-0 rounded-0 overflow-hidden position-relative"
              @click="toProduct(products[0].id)"
            >
              <img
                :src="products[0].imageUrl"
                class="selected-card-img object-fit-cover object-position-center"
                alt="產品圖片"
              />
              <div class="selected-card-overlay"></div>
              <h3 class="selected-card-title text-white">{{ products[0].title }}</h3>
            </div>
          </li>
          <li
            class="col-sm-6 col-md-12"
            v-if="products[1]"
            data-aos="fade-down"
            data-aos-delay="400"
          >
            <div
              class="card selected-card cursor border-0 rounded-0 overflow-hidden position-relative"
              @click="toProduct(products[1].id)"
            >
              <img
                :src="products[1].imageUrl"
                class="selected-card-img object-fit-cover object-position-center"
                alt="產品圖片"
              />
              <div class="selected-card-overlay"></div>
              <h3 class="selected-card-title text-white">{{ products[1].title }}</h3>
            </div>
          </li>
        </ul>
      </li>
      <li class="col-md-4" v-if="products[3]">
        <ul class="list-unstyled row g-0">
          <li
            class="col-sm-6 col-md-12"
            v-if="products[3]"
            data-aos="fade-down"
            data-aos-delay="500"
          >
            <div
              class="card selected-card cursor border-0 rounded-0 overflow-hidden position-relative"
              @click="toProduct(products[3].id)"
            >
              <img
                :src="products[3].imageUrl"
                alt="產品圖片"
                class="selected-card-img object-fit-cover object-position-center"
              />
              <div class="selected-card-overlay"></div>
              <h3 class="selected-card-title text-white">{{ products[3].title }}</h3>
            </div>
          </li>
          <li
            class="col-sm-6 col-md-12"
            v-if="products[4]"
            data-aos="fade-down"
            data-aos-delay="600"
          >
            <div
              class="card selected-card cursor border-0 rounded-0 overflow-hidden position-relative"
              @click="toProduct(products[4].id)"
            >
              <img
                :src="products[4].imageUrl"
                alt="產品圖片"
                class="selected-card-img object-fit-cover object-position-center"
              />
              <div class="selected-card-overlay"></div>
              <h3 class="selected-card-title text-white">{{ products[4].title }}</h3>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </section>
  <SwiperProducts :products="products" @emit-product="toProduct"></SwiperProducts>
  <section class="container mt-6">
    <h2 class="topic mb-4">旅遊須知</h2>
    <ul class="row list-unstyled">
      <li class="col-sm-6 col-md-4 mt-4"
      v-for="item in articles" :key="item.id" data-aos="fade-up">
        <div class="notice-card hover-up card h-100">
          <div class="overflow-hidden">
            <img
              :src="item.image"
              alt="文章圖片"
              class="notice-card-img object-fit-cover object-position-center cursor"
              @click="toArticle(item.id)"
            />
          </div>
          <div class="p-3">
            <span
              class="badge bg-secondary p-2 mt-2 me-2 text-dark"
              v-for="(item, index) in item.tag"
              :key="index"
            >
              {{ item }}
            </span>
            <div class="d-flex justify-content-between align-items-center">
              <router-link
                :to="{ name: 'Article', params: {id: `${item.id}`} }"
                class="link-dark link-hover text-decoration-none h4 my-2"
              >
                {{ item.title }}
              </router-link>
              <span>{{ $filters.date(item.create_at) }}</span>
            </div>
            <p>{{ item.description }}</p>
            <div class="text-end">
              <button class="btn btn-outline-primary" type="button" @click="toArticle(item.id)">
                更多內容
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
  <section
    class="container-fluid mt-6 second-banner bg-size-center bg-position-center position-relative"
  >
    <div class="overlay"></div>
    <div class="container h-100 position-relative">
      <div
        class="d-flex flex-column flex-md-row h-100 align-items-center
        justify-content-center justify-content-md-between"
      >
        <h3 class="text-white">與我們一起探索世界吧!</h3>
        <router-link class="btn btn-outline-white col-3" to="/products">立刻出發</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import SwiperBanner from '@/components/SwiperBanner.vue';
import Category from '@/components/Category.vue';
import Loading from '@/components/Loading.vue';
import SwiperProducts from '@/components/SwiperProducts.vue';
import { reactive, toRefs, inject } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    SwiperBanner,
    Loading,
    Category,
    SwiperProducts,
  },
  setup() {
    const Message = inject('Message');
    const axios = inject('axios');
    const router = useRouter();

    const data = reactive({
      products: [],
      isLoading: false,
      articles: [],
    });

    async function getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/products/?page=${page}`;
      data.isLoading = true;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          data.products = res.data.products;
        } else {
          Message('error', '無法取得產品，請再次確認!');
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法取得產品，請再次確認!');
        data.isLoading = false;
      }
    }
    getProducts();

    function toProduct(id) {
      router.push(`/product/${id}`);
    }

    async function getArticles(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/articles/?page=${page}`;
      data.isLoading = true;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          data.articles = res.data.articles;
        } else {
          Message('error', '無法取得文章，請再次確認!');
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法取得文章，請再次確認!');
        data.isLoading = false;
      }
    }
    getArticles();

    function toArticle(id) {
      router.push(`/article/${id}`);
    }

    const refData = toRefs(data);

    return {
      ...refData,
      toProduct,
      toArticle,
    };
  },
};
</script>

<style></style>
