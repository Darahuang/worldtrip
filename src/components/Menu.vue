<template>
  <nav class="navbar navbar-expand-lg navbar-light sticky-top" :class="navbarStyle">
    <div class="container-fluid">
      <h1 class="mb-0">
        <router-link to="/" class="navbar-brand font-logo d-block fs-2 text-primary">
          <img src="../assets/imgs/svg_f_traffic_40_0nbg.svg" alt="logo圖片" class="logo-svg" />
          WorldTrip
        </router-link>
      </h1>
      <button
        class="navbar-toggler border border-2 border-primary shadow-none"
        type="button"
        @click="toggleCollapse(), show = !show"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span v-if="show" class="material-icons-outlined text-primary"> menu
        </span>
        <span v-else class="material-icons-outlined text-primary">
        close
        </span>
      </button>
      <div class="collapse navbar-collapse" ref="collapse">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item" @click="toggle(), changeSelected('about')">
            <router-link
              to="/about"
              class="nav-link nav-link-primary nav-link-padding"
              :class="{ active: selected === 'about' }"
            >
              關於我們
            </router-link>
          </li>
          <li class="nav-item" @click="toggle(), changeSelected('product')">
            <router-link
              to="/products"
              class="nav-link nav-link-primary nav-link-padding"
              :class="{ active: selected === 'product' }"
            >
              行程列表
            </router-link>
          </li>
          <li class="nav-item" @click="toggle(), changeSelected('faq')">
            <router-link
              to="/faq"
              class="nav-link nav-link-primary nav-link-padding"
              :class="{ active: selected === 'faq' }"
            >
              常見問題
            </router-link>
          </li>
        </ul>
        <div class="d-flex position-relative">
          <router-link
            to="/carts"
            class="nav-link nav-link-primary nav-link-padding"
            @click="toggle"
          >
            <span class="material-icons-outlined"> shopping_cart </span>
            <span
              class="rounded-circle bg-danger text-white px-2 shoppingCart-icon-position"
              v-if="carts.carts"
            >
              {{ carts.carts.length }}
            </span>
          </router-link>
          <router-link
            to="/savedItems"
            class="nav-link nav-link-primary nav-link-padding"
            @click="toggle"
          >
            <span class="material-icons-outlined"> favorite </span>
            <span
              class="rounded-circle bg-danger text-white px-2 favorite-icon-position"
              v-if="myFavorite"
            >
              {{ myFavorite.length }}
            </span>
          </router-link>
          <router-link
            to="/login"
            class="nav-link nav-link-primary nav-link-padding"
            @click="toggle"
          >
            <span class="material-icons-outlined"> account_circle </span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {
  inject, reactive, onMounted, onBeforeUnmount, toRefs,
} from 'vue';
import localStorageMethods from '@/methods/localStorageMethods';
import collapseHook from '../hooks/collapse';
import emitter from '../methods/emitter';

export default {
  setup() {
    const Message = inject('Message');
    const axios = inject('axios');

    const { collapse, toggleCollapse } = collapseHook();

    const data = reactive({
      show: true,
      navbarStyle: '',
      carts: {},
      myFavorite: localStorageMethods.get() || [],
      selected: '',
    });

    async function getCarts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          data.carts = res.data.data;
        }
      } catch (error) {
        Message('error', '無法取得購物車數量，請再次確認!');
      }
    }
    getCarts();

    function toggle() {
      if (window.innerWidth < 992) {
        data.show = !data.show;
        toggleCollapse();
      }
    }

    function changeSelected(text) {
      data.selected = text;
    }

    function navbarColorChange() {
      if (window.scrollY > 0) {
        data.navbarStyle = 'bg-primary-light navbar-dark';
      } else {
        data.navbarStyle = 'bg-white navbar-light';
      }
    }
    onMounted(() => {
      emitter.on('emit-carts', () => {
        getCarts();
      });
      emitter.on('emit-myFavorite', () => {
        data.myFavorite = localStorageMethods.get();
      });
      window.addEventListener('scroll', navbarColorChange);
    });

    onBeforeUnmount(() => {
      emitter.off('emit-carts');
      emitter.off('emit-myFavorite');
      window.removeEventListener('scroll', navbarColorChange);
    });

    const refData = toRefs(data);

    return {
      collapse,
      toggleCollapse,
      toggle,
      getCarts,
      changeSelected,
      ...refData,
    };
  },
};
</script>

<style></style>
