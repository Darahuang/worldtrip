<template>
  <div class="modal fade" tabindex="-1" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-white">訂單細節</h5>
          <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-5">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th style="width: 80px">姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-sm-7">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody v-if="tempOrder">
                  <tr>
                    <th style="width: 80px">訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>{{ $filters.date(tempOrder.paid_date) }}</td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <span v-if="tempOrder.is_paid" class="text-success">以付款</span>
                      <span v-else class="text-muted">未付款</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <tbody v-if="tempOrder">
                  <tr v-for="product in tempOrder.products" :key="product.id">
                    <th>{{ product.product.title }}</th>
                    <td>{{ product.qty }}/{{ product.product.unit }}</td>
                    <td class="text-end">{{ $filters.dollarSignThousandth(product.total) }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="form-check float-end">
                <input type="checkbox" class="form-check-input" value=""
                id="payment" v-model="tempOrder.is_paid">
                <label for="payment" class="form-check-label">
                  {{tempOrder.is_paid ? '已付款' : '未付款'}}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" @click="hideModal">取消</button>
          <button type="button" class="btn btn-primary" @click="emitChange(tempOrder)">修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch, toRefs } from 'vue';
import modalHook from '../hooks/modal';

export default {
  props: {
    order: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['emit-change'],
  setup(props, context) {
    const data = reactive({
      tempOrder: {},
    });

    const {
      modal, modalBox, showModal, hideModal,
    } = modalHook();
    function emitChange(item) {
      context.emit('emit-change', item);
    }
    watch(
      () => props.order,
      () => {
        data.tempOrder = { ...props.order };
      },
    );

    const resData = toRefs(data);
    return {
      modal,
      modalBox,
      showModal,
      hideModal,
      ...resData,
      emitChange,
    };
  },
};
</script>

<style></style>
