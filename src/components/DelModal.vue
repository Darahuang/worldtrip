<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white" v-if="item.title">
            刪除 {{ item.title }}
          </h5>
          <h5 class="modal-title text-white" v-else>刪除訂單</h5>
          <button
            type="button"
            class="btn-close"
            @click="hideModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p v-if="item.title">
            是否刪除 <strong class="text-danger">{{ item.title }}</strong> (刪除後將無法恢復)。
          </p>
          <p v-else>
            是否刪除
            <strong class="text-danger">訂單編號 {{ item.id }}</strong> (刪除後將無法恢復)。
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" @click="hideModal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="emitDelete(item.id)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import modalHook from '../hooks/modal';

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['emit-delete'],
  setup(props, context) {
    const {
      modal, showModal, hideModal,
    } = modalHook();

    function emitDelete(id) {
      context.emit('emit-delete', id);
    }

    return {
      modal, showModal, hideModal, emitDelete,
    };
  },
};
</script>

<style>

</style>
