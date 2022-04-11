<template>
  <Loading :isLoading="isLoading"></Loading>
  <div class="table-responsive my-5">
  <table class="table table-hover">
     <thead>
        <tr>
          <th class="d-none d-sm-table-cell">購買時間</th>
          <th class="d-none d-sm-table-cell">Email</th>
          <th>購買品項</th>
          <th>應付金額</th>
          <th class="d-none d-sm-table-cell">是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
         <tr v-for="item in orders" :key="item.id" :class="{ 'text-muted': !item.is_paid }">
           <td class="d-none d-sm-table-cell">{{ $filters.date(item.create_at) }}</td>
           <td class="d-none d-sm-table-cell">{{ item.user.email }}</td>
           <td>
             <ul class="list-unstyled mb-0">
              <li v-for="product in item.products" :key="product.id" class="mb-1">
                {{ product.product.title }} 人數: {{product.qty}} {{product.product.unit}}
              </li>
             </ul>
          </td>
           <td>{{ $filters.dollarSignThousandth(item.total) }}</td>
           <td class="d-none d-sm-table-cell">
             <div class="form-check form-switch">
               <input class="form-check-input" type="checkbox" role="switch"
               :id="item.id" v-model="item.is_paid"  @change="updateOrder(item)">
               <label class="form-check-label" :for="item.id">{{item.is_paid ? '已付款': '未付款' }}
               </label>
             </div>
          </td>
           <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="openModal('check', item)"
              >
                檢視
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
  <Pagination :pages="pagination" @emit-page = "getOrders"></Pagination>
  <OrderModal :order ="tempOrder" @emit-change = "updateOrder" ref="orderModal"></OrderModal>
  <DelModal :item="tempOrder" @emit-delete="deleteOrder" ref="delModal"></DelModal>
</div>
</template>

<script>
import {
  inject, reactive, ref, toRefs,
} from 'vue';

import Pagination from '@/components/Pagination.vue';
import OrderModal from '@/components/OrderModal.vue';
import DelModal from '@/components/DelModal.vue';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    Loading,
    Pagination,
    OrderModal,
    DelModal,
  },
  setup() {
    const Message = inject('Message');
    const axios = inject('axios');
    const data = reactive({
      orders: [],
      pagination: {},
      tempOrder: {},
      isLoading: false,
      currentPage: 1,
    });
    const orderModal = ref(null);
    const delModal = ref(null);

    async function getOrders(page = 1) {
      data.currentPage = page;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/orders?page=${data.currentPage}`;
      data.isLoading = true;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          data.orders = res.data.orders;
          data.pagination = res.data.pagination;
          Message('success', '訂單取得成功');
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法取得產品，請再次確認!');
        data.isLoading = false;
      }
    }
    getOrders();

    function openModal(status, item) {
      if (status === 'check') {
        data.tempOrder = { ...item };
        orderModal.value.showModal();
      } else if (status === 'delete') {
        data.tempOrder = { ...item };
        delModal.value.showModal();
      }
    }

    async function updateOrder(item) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      data.isLoading = true;
      try {
        const res = await axios.put(api, { data: paid });
        if (res.data.success) {
          getOrders(data.currentPage);
          Message('success', `${res.data.message}`);
          orderModal.value.hideModal();
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法修改訂單，請再次確認!');
        data.isLoading = false;
      }
    }

    async function deleteOrder(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/order/${id}`;
      try {
        const res = await axios.delete(api);
        data.isLoading = true;
        if (res.data.success) {
          getOrders(data.currentPage);
          Message('success', '訂單刪除成功');
          orderModal.value.hideModal();
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法修改訂單，請再次確認!');
        data.isLoading = false;
      }
    }
    const refData = toRefs(data);
    return {
      ...refData,
      orderModal,
      openModal,
      updateOrder,
      delModal,
      deleteOrder,
      getOrders,
    };
  },
};
</script>

<style>

</style>
