<template>
  <Loading :isLoading="isLoading"></Loading>
  <div class="text-end mt-5">
    <button type="button" class="btn btn-primary btn-block" @click="openModal('new')">
      建立新的優惠券
    </button>
  </div>
  <div class="table-responsive mt-3">
  <table class="table table-hover">
     <thead>
        <tr>
          <th class="d-none d-sm-table-cell">名稱</th>
          <th class="d-none d-sm-table-cell">優惠碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
         <tr v-for="item in coupons" :key="item.id">
           <td class="d-none d-sm-table-cell">{{ item.title }}</td>
           <td class="d-none d-sm-table-cell">{{ item.code }}</td>
           <td class="d-none d-sm-table-cell">
            {{ item.percent }}
          </td>
           <td>{{ $filters.date(item.due_date) }}</td>
           <td>
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
  <Pagination :pages="pagination" @emit-page="getCoupons"></Pagination>
  <CouponModal ref="couponModal" :coupon="tempCoupon" :isNew="isNew"
  @emit-update="updateCoupon">
  </CouponModal>
  <DelModal ref="delModal" :item="tempCoupon"  @emit-delete="deleteCoupon"></DelModal>
</div>
</template>

<script>
import {
  inject, reactive, ref, toRefs,
} from 'vue';
import CouponModal from '@/components/CouponModal.vue';
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/Pagination.vue';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    CouponModal,
    DelModal,
    Loading,
    Pagination,
  },
  setup() {
    const Message = inject('Message');
    const axios = inject('axios');

    const data = reactive({
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: false,
      isLoading: false,
      currentPage: 1,
    });

    const couponModal = ref(null);
    const delModal = ref(null);

    async function getCoupons(page = 1) {
      data.currentPage = page;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/coupons?page=${data.currentPage}`;
      data.isLoading = true;
      try {
        const res = await axios.get(api);
        if (res.data.success) {
          data.coupons = res.data.coupons;
          data.pagination = res.data.pagination;
          Message('success', '取得優惠券成功');
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法取得優惠券，請再次確認!');
        data.isLoading = false;
      }
    }
    getCoupons();

    function openModal(status, item) {
      if (status === 'new') {
        data.isNew = true;
        data.tempCoupon = {
          due_date: Math.floor(new Date().getTime() / 1000),
          is_enabled: false,
        };
        couponModal.value.showModal();
      } else if (status === 'edit') {
        data.isNew = false;
        data.tempCoupon = { ...item };
        couponModal.value.showModal();
      } else if (status === 'delete') {
        data.tempCoupon = item;
        delModal.value.showModal();
      }
    }

    async function updateCoupon(item) {
      data.tempCoupon = item;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/coupon`;
      let httpMethod = 'post';
      if (!data.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/coupon/${data.tempCoupon.id}`;
        httpMethod = 'put';
      }
      data.isLoading = true;
      try {
        const res = await axios[httpMethod](api, { data: data.tempCoupon });
        if (res.data.success) {
          getCoupons(data.currentPage);
          couponModal.value.hideModal();
          Message('success', `${res.data.message}`);
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法修改優惠券，請再次確認!');
        data.isLoading = false;
      }
    }

    async function deleteCoupon(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/coupon/${id}`;
      data.isLoading = true;
      try {
        const res = await axios.delete(api);
        if (res.data.success) {
          getCoupons(data.currentPage);
          Message('success', '優惠券刪除成功');
          delModal.value.hideModal();
        } else {
          Message('error', `${res.data.message}`);
        }
        data.isLoading = false;
      } catch (error) {
        Message('error', '無法刪除優惠券，請再次確認!');
        data.isLoading = false;
      }
    }

    const resData = toRefs(data);
    return {
      ...resData,
      couponModal,
      openModal,
      updateCoupon,
      delModal,
      deleteCoupon,
      getCoupons,
    };
  },
};
</script>

<style>

</style>
