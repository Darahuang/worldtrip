<template>
  <DashboardMenu />
  <div class="container-fluid px-4">
    <div class="row justify-content-center">
      <div class="col-md-10">
          <router-view v-if="check"></router-view>
      </div>
    </div>
  </div>

</template>

<script>
import { inject, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import DashboardMenu from '@/components/DashboardMenu.vue';

export default {
  components: {
    DashboardMenu,
  },
  setup() {
    const data = reactive({
      check: false,
    });
    const router = useRouter();
    const Message = inject('Message');
    const axios = inject('axios');
    // 讀取token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)starlightselection\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    axios.defaults.headers.common.Authorization = `${token}`;
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    axios.post(api)
      .then((res) => {
        if (res.data.success) {
          data.check = true;
          Message('success', '登入成功');
        } else {
          router.push('/login');
        }
      });
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>

<style>

</style>
