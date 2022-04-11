<template>
   <div
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title" v-if="isNew">新增產品</h5>
          <h5 class="modal-title" v-else>編輯產品</h5>
          <button
            type="button"
            class="btn-close"
            @click="hideModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="imageUrl"
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl"
                />
              </div>
              <div class="mb-3">
                <div
                  class="spinner-border text-primary spinner-border-sm me-2"
                  role="status"
                  v-if="loadingStatus"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <label for="formFile" class="form-label">或 上傳圖片</label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  @change="uploadImage"
                  ref="files"
                />
              </div>
              <img :src="tempProduct.imageUrl" class="img-fluid" alt="產品圖片" />
              <div class="mt-5" v-if="tempProduct.imagesUrl">
                <div class="mb-3" v-for="(image, index) in tempProduct.imagesUrl" :key="index">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imagesUrl[index]"
                  />
                  <img :src="image" class="img-fluid" alt="產品圖片" v-if="image" />
                  <button
                    type="button"
                    class="btn btn-outline-danger mt-3"
                    @click="tempProduct.imagesUrl.splice(index, 1)"
                  >
                    移除
                  </button>
                </div>
                <div
                  v-if="
                    tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] ||
                      !tempProduct.imagesUrl.length
                  "
                >
                  <button
                    type="button"
                    class="btn btn-outline-primary col-12 mt-3"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>
              <div class="row gx-3">
                <div class="col-md-6 mb-3">
                  <label for="category" class="form-label">分類</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    placeholder="請輸入分類"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="unit" class="form-label">單位</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="price" class="form-label">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    placeholder="請輸入售價"
                    v-model.number="tempProduct.price"
                  />
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="3"
                  placeholder="請輸入產品描述"
                  v-model="tempProduct.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">行程安排</label>
                <textarea
                  class="form-control"
                  id="itinerary "
                  rows="7"
                  placeholder="請輸入景點行程"
                  v-model="tempProduct.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="condition" class="form-label">成團條件</label>
                <textarea
                  class="form-control"
                  id="condition"
                  rows="3"
                  placeholder="請輸入成團條件"
                  v-model="tempProduct.condition"
                >
                </textarea>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="is_enabled"
                  v-model="tempProduct.is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" @click="hideModal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="emitUpdate(tempProduct)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref, reactive, watch, toRefs, inject,
} from 'vue';
import modalHook from '../hooks/modal';

export default {
  props: {
    product: {
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
      modal, showModal, hideModal,
    } = modalHook();
    const axios = inject('axios');
    const Message = inject('Message');

    const data = reactive({
      tempProduct: {},
      loadingStatus: false,
    });
    const files = ref(null);

    async function uploadImage() {
      data.loadingStatus = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/upload`;
      const img = files.value.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', img);
      try {
        const res = await axios.post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (res.data.success) {
          this.tempProduct.imageUrl = res.data.imageUrl;
          Message('success', '上傳圖片成功');
        } else {
          Message('error', `${res.data.message}`);
        }
        data.loadingStatus = false;
      } catch (error) {
        Message(error, '無法上傳圖片，請再次確認!');
        data.loadingStatus = false;
      }
    }

    function emitUpdate(item) {
      context.emit('emit-update', item);
    }

    watch(() => props.product, () => {
      data.tempProduct = { ...props.product };
      if (!data.tempProduct.imagesUrl) {
        data.tempProduct.imagesUrl = [];
      }
      if (!data.tempProduct.imageUrl) {
        data.tempProduct.imageUrl = '';
      }
    });
    const resData = toRefs(data);

    return {
      modal, showModal, hideModal, ...resData, emitUpdate, files, uploadImage,
    };
  },
};

</script>

<style></style>
