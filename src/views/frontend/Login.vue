<template>
  <section class="login-bg bg-size-cover bg-position-center d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <h2 class="text-center text-white fw-bold">登入後台頁面</h2>
          <Form @submit="login" v-slot="{ errors, meta }">
            <div class="mb-3">
              <label for="account" class="form-label text-white fw-bold">帳號</label>
              <Field
                type="email"
                id="account"
                name="帳號"
                rules="email|required"
                :class="{ 'is-invalid': errors['帳號'] }"
                class="form-control rounded-pill login-input p-2"
                placeholder="請輸入帳號"
                v-model="username"
              />
              <ErrorMessage name="帳號" class="invalid-feedback" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label text-white fw-bold">密碼</label>
              <Field
                type="password"
                id="password"
                name="密碼"
                rules="required"
                :class="{ 'is-invalid': errors['密碼'] }"
                class="form-control rounded-pill login-input p-2"
                placeholder="請輸入密碼"
                v-model="password"
              />
              <ErrorMessage name="密碼" class="invalid-feedback" />
            </div>
            <button
              class="btn btn-primary col-12 rounded-pill p-2 my-3"
              :disabled="!meta.valid"
              type="submit"
            >
              登入
            </button>
            <router-link to="/" class="text-decoration-none nav-link-primary">
              <span class="material-icons-outlined align-middle"> arrow_back </span>
              回到WorldTrip
            </router-link>
            <p ref="fail" class="text-danger h6 mt-3 fw-bold"></p>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  reactive, inject, ref, toRefs,
} from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const Message = inject('Message');
    const axios = inject('axios');

    const router = useRouter();

    const data = reactive({
      username: '',
      password: '',
    });

    const fail = ref(null);

    async function login() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      try {
        const res = await axios.post(api, data);
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `starlightselection = ${token}; expires=${new Date(expired)}`;
          router.push('/admin');
        } else {
          fail.value.textContent = '登入失敗，請再次嘗試';
        }
      } catch (error) {
        Message('error', '無法登入，請再次確認!');
      }
    }

    const resData = toRefs(data);

    return {
      ...resData,
      login,
      fail,
    };
  },
};
</script>

<style></style>
