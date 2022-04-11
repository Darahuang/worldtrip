<template>
  <div class="modal fade" tabindex="-1"  aria-hidden="true" ref="modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" v-if="isNew">新增優惠券</h5>
        <h5 v-else>編輯優惠券</h5>
        <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="title" class="form-label">標題</label>
          <input type="text" id="title" class="form-control" placeholder="請輸入標題"
          v-model="tempCoupon.title">
        </div>
        <div class="mb-3">
          <label for="code" class="form-label">優惠碼</label>
          <input type="text" id="code" class="form-control" placeholder="請輸入優惠碼"
          v-model="tempCoupon.code">
        </div>
         <div class="mb-3">
          <label for="due_date" class="form-label">到期日</label>
          <input type="date" id="due_date" class="form-control" v-model="due_date">
        </div>
        <div class="mb-3">
          <label for="percent" class="form-label">折扣百分比</label>
          <input type="number" id="percent" class="form-control" placeholder="請輸入折扣百分比"
          v-model.number="tempCoupon.percent">
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="is_enabled"
          v-model.number="tempCoupon.is_enabled" :true-value="1" :false-value="0">
          <label for="is_enabled" class="form-check-label">是否啟用</label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="hideModal">取消</button>
        <button type="button" class="btn btn-primary"
        v-if="isNew" @click="emitUpdate(tempCoupon)">新增優惠券
        </button>
        <button type="button" class="btn btn-primary"
        v-else @click="emitUpdate(tempCoupon)">
        更新優惠券</button>
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
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['emit-update'],
  setup(props, context) {
    const {
      modal, modalBox, showModal, hideModal,
    } = modalHook();

    const data = reactive({
      tempCoupon: {},
      due_date: '',
    });

    function emitUpdate(item) {
      context.emit('emit-update', item);
    }

    watch(() => props.coupon, () => {
      data.tempCoupon = { ...props.coupon };
      const dateAndTime = new Date(data.tempCoupon.due_date * 1000).toISOString().split('T');
      [data.due_date] = dateAndTime;
    });

    watch(() => data.due_date, () => {
      data.tempCoupon.due_date = Math.floor(new Date(data.due_date) / 1000);
    });
    const refData = toRefs(data);
    return {
      modal, modalBox, showModal, hideModal, emitUpdate, ...refData,
    };
  },
};
</script>

<style>

</style>
