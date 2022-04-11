<template>
<Loading :isLoading ="isLoading"></Loading>
  <section class="container-fluid article-banner bg-size-cover bg-position-center"
  :style="{'background-image': `url(${article.image})`}">
  </section>
  <section class="container">
    <h2 class="fw-bold my-4">{{ article.title }}</h2>
    <div v-html="article.content"></div>
  </section>
</template>

<script>
import {
  reactive, toRefs, inject,
} from 'vue';
import goTop from '@/methods/goTop';
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    Loading,
  },
  setup() {
    const Message = inject('Message');
    const axios = inject('axios');

    const route = useRoute();

    const data = reactive({
      article: {},
      id: '',
      isLoading: false,
    });

    data.id = route.params.id;
    async function getArticle(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/article/${id}`;
      data.isLoading = true;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          data.article = res.data.article;
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
        goTop();
      } catch (error) {
        Message('error', '無法取得該貼文，請再次確認!');
        data.isLoading = false;
        goTop();
      }
    }
    getArticle(data.id);

    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>

<style>

</style>
