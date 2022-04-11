<template>
  <Loading :isLoading="isLoading"></Loading>
  <div class="text-end mt-5">
    <button type="button" class="btn btn-primary btn-block" @click="openModal('new')">
      新增貼文
    </button>
  </div>
  <div class="table-responsive mt-3">
  <table class="table table-hover">
     <thead>
        <tr>
          <th style="width: 150px">標題</th>
          <th style="width: 150px">作者</th>
          <th class="d-none d-sm-table-cell">描述</th>
          <th style="width: 150px" class="d-none d-sm-table-cell">建立時間</th>
          <th style="width: 150px">是否公開</th>
          <th style="width: 150px">編輯</th>
        </tr>
      </thead>
      <tbody>
         <tr v-for="item in articles" :key="item.id">
           <td>{{ item.title }}</td>
           <td>{{ item.author }}</td>
           <td class="d-none d-sm-table-cell">{{ item.description }}</td>
           <td class="d-none d-sm-table-cell">{{ $filters.date(item.create_at) }}</td>
           <td>
            <span v-if="item.isPublic" class="text-success">已上架</span>
            <span v-else class="text-muted">未上架</span>
          </td>
           <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="getArticle(item.id)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="openModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </td>
         </tr>
      </tbody>
  </table>
  <Pagination :pages="pagination" @emit-page="getArticles"></Pagination>
  <ArticleModal ref="articleModal" :article="tempArticle" :isNew="isNew"
  @emit-update="updateArticle">
  </ArticleModal>
  <DelModal ref="delModal" :item="tempArticle"  @emit-delete="deleteArticle"></DelModal>
</div>
</template>

<script>
import {
  inject, reactive, ref, toRefs,
} from 'vue';
import ArticleModal from '@/components/ArticleModal.vue';
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/Pagination.vue';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    ArticleModal,
    DelModal,
    Loading,
    Pagination,
  },
  setup() {
    const Message = inject('Message');
    const axios = inject('axios');

    const data = reactive({
      articles: [],
      pagination: {},
      tempArticle: {},
      isNew: false,
      isLoading: false,
      currentPage: 1,
    });

    const articleModal = ref(null);
    const delModal = ref(null);

    async function getArticles(page = 1) {
      data.currentPage = page;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/articles?page=${data.currentPage}`;
      data.isLoading = true;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          data.articles = res.data.articles;
          data.pagination = res.data.pagination;
          Message('success', '文章取得成功');
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法取得文章，請再次確認!');
        data.isLoading = false;
      }
    }
    getArticles();

    function openModal(status, item) {
      if (status === 'new') {
        data.isNew = true;
        data.tempArticle = {
          create_at: Math.floor(Date.now() / 1000),
          isPublic: false,
          tag: [],
        };
        articleModal.value.showModal();
      } else if (status === 'edit') {
        data.isNew = false;
        data.tempArticle = { ...item };
        articleModal.value.showModal();
      } else if (status === 'delete') {
        data.tempArticle = item;
        delModal.value.showModal();
      }
    }

    async function updateArticle(item) {
      data.tempArticle = item;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/article`;
      let httpMethod = 'post';
      if (!data.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/article/${data.tempArticle.id}`;
        httpMethod = 'put';
      }
      data.isLoading = true;
      try {
        const res = await axios[httpMethod](api, { data: data.tempArticle });
        if (res.data.success) {
          getArticles(data.currentPage);
          articleModal.value.hideModal();
          Message('success', `${res.data.message}`);
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法更新文章，請再次確認!');
        data.isLoading = false;
      }
    }
    async function getArticle(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/article/${id}`;
      data.isLoading = true;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          openModal('edit', res.data.article);
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法取得文章，請再次確認!');
        data.isLoading = false;
      }
    }
    async function deleteArticle(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/article/${id}`;
      data.isLoading = true;
      try {
        const res = await axios.delete(api);
        if (res.data.success) {
          getArticles(data.currentPage);
          Message('success', `${res.data.message}`);
          delModal.value.hideModal();
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法刪除文章，請再次確認!');
        data.isLoading = false;
      }
    }
    const resData = toRefs(data);
    return {
      ...resData,
      articleModal,
      openModal,
      updateArticle,
      delModal,
      deleteArticle,
      getArticles,
      getArticle,
    };
  },
};
</script>

<style>

</style>
