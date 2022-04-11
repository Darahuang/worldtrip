<template>
  <Loading :isLoading="isLoading"></Loading>
  <div class="text-end mt-5">
    <button type="button" class="btn btn-primary btn-block" @click="openModal('new')">
      建立新的產品
    </button>
  </div>
  <div class="table-responsive mt-3">
  <table class="table table-hover">
     <thead>
        <tr>
          <th style="width: 120px">分類</th>
          <th style="width: 400px">產品名稱</th>
          <th style="width: 150px" class="d-none d-sm-table-cell">原價</th>
          <th style="width: 150px">售價</th>
          <th style="width: 150px" class="d-none d-sm-table-cell">是否啟用</th>
          <th style="width: 150px">編輯</th>
        </tr>
      </thead>
      <tbody>
         <tr v-for="item in products" :key="item.id">
           <td>{{ item.category }}</td>
           <td>{{ item.title }}</td>
           <td class="d-none d-sm-table-cell">
            {{ $filters.dollarSignThousandth(item.origin_price) }}
          </td>
           <td>{{ $filters.dollarSignThousandth(item.price) }}</td>
           <td class="d-none d-sm-table-cell">
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
           <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="openModal('edit', item)"
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
  <Pagination :pages="pagination" @emit-page="getProducts"></Pagination>
  <ProductModal ref="productModal" :product="tempProduct" :isNew="isNew"
  @emit-update="updateProduct">
  </ProductModal>
  <DelModal ref="delModal" :item="tempProduct"  @emit-delete="deleteProduct"></DelModal>
</div>
</template>

<script>
import {
  inject, reactive, ref, toRefs,
} from 'vue';
import ProductModal from '@/components/ProductModal.vue';
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/Pagination.vue';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    ProductModal,
    DelModal,
    Loading,
    Pagination,
  },
  setup() {
    const Message = inject('Message');
    const axios = inject('axios');
    const data = reactive({
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      currentPage: 1,
    });
    const productModal = ref(null);
    const delModal = ref(null);

    async function getProducts(page = 1) {
      data.currentPage = page;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/products?page=${data.currentPage}`;
      data.isLoading = true;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          data.products = res.data.products;
          data.pagination = res.data.pagination;
          Message('success', '產品取得成功');
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法取得產品，請再次確認!');
        data.isLoading = false;
      }
    }
    getProducts();

    function openModal(status, item) {
      if (status === 'new') {
        data.isNew = true;
        data.tempProduct = {};
        productModal.value.showModal();
      } else if (status === 'edit') {
        data.isNew = false;
        data.tempProduct = { ...item };
        productModal.value.showModal();
      } else if (status === 'delete') {
        data.tempProduct = item;
        delModal.value.showModal();
      }
    }

    async function updateProduct(item) {
      data.tempProduct = item;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/product`;
      let httpMethod = 'post';
      if (!data.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/product/${data.tempProduct.id}`;
        httpMethod = 'put';
      }
      data.isLoading = true;
      try {
        const res = await axios[httpMethod](api, { data: data.tempProduct });
        if (res.data.success) {
          getProducts(data.currentPage);
          productModal.value.hideModal();
          Message('success', `${res.data.message}`);
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        data.isLoading = false;
        Message('error', '無法修改產品，請再次確認!');
      }
    }
    async function deleteProduct(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/product/${id}`;
      data.isLoading = true;
      try {
        const res = await axios.delete(api);
        if (res.data.success) {
          getProducts(data.currentPage);
          Message('success', `${res.data.message}`);
          delModal.value.hideModal();
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法刪除產品，請再次確認!');
        data.isLoading = false;
      }
    }
    const refData = toRefs(data);
    return {
      ...refData,
      productModal,
      openModal,
      updateProduct,
      delModal,
      deleteProduct,
      getProducts,
    };
  },
};
</script>

<style>

</style>
