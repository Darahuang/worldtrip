<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
      <router-link class="navbar-brand font-logo d-block" to="/">
        <h1 class="h2">WorldTrip</h1>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        @click="buttonToggle"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" ref="collapse">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item" @click="menuToggle">
            <router-link to="/admin" class="nav-link">產品列表</router-link>
          </li>
          <li class="nav-item" @click="menuToggle">
            <router-link to="/admin/orders" class="nav-link">訂單列表</router-link>
          </li>
          <li class="nav-item" @click="menuToggle">
            <router-link to="/admin/coupons" class="nav-link">優惠券</router-link>
          </li>
          <li class="nav-item" @click="menuToggle">
            <router-link to="/admin/articles" class="nav-link">貼文</router-link>
          </li>
          <li class="nav-item" @click="menuToggle">
            <a href="#" class="nav-link" @click.prevent="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

import {
  inject,
} from 'vue';
import { useRouter } from 'vue-router';
import collapseHook from '../hooks/collapse';

export default {
  setup() {
    const { toggleCollapse, collapse } = collapseHook();
    const Message = inject('Message');
    const axios = inject('axios');
    const router = useRouter();

    function buttonToggle() {
      toggleCollapse();
    }

    function menuToggle() {
      if (window.innerWidth < 992) {
        toggleCollapse();
      }
    }

    async function logout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      try {
        const res = await axios.post(api);
        if (res.data.success) {
          document.cookie = 'starlightselection = ; expires = ; path=/';
          Message('success', `${res.data.message}`);
          router.push('/');
        }
      } catch (error) {
        Message('error', '無法登出，請再次確認');
      }
    }

    return {
      collapse,
      menuToggle,
      logout,
      buttonToggle,
    };
  },
};
</script>
