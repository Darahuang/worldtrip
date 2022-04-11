<template>
  <div class="modal fade" tabindex="-1"  aria-hidden="true" ref="modal">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <h5 class="modal-title" v-if="isNew">新增貼文</h5>
        <h5 v-else>編輯貼文</h5>
        <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input type="text" class="form-control" id="title"
              placeholder="請輸入標題" v-model="tempArticle.title">
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">輸入圖片網址</label>
              <input type="text" class="form-control" id="image"
              placeholder="請輸入圖片網址" v-model="tempArticle.image">
            </div>
            <div class="mb-3">
              <label for="author" class="form-label">作者</label>
              <input type="text" class="form-control" id="author"
              placeholder="請輸入作者名字" v-model="tempArticle.author">
            </div>
            <div class="mb-3">
              <label for="create_at" class="form-label">文章建立日期</label>
              <input type="date" class="form-control" id="create_at" v-model="create_at">
            </div>
          </div>
           <div class="col-sm-8">
              <label for="tag" class="form-label">標籤</label>
              <div class="row gx-2 mb-3">
                <div class="col-md-3 mb-1" v-for="(item, index) in tempArticle.tag" :key="index">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control" id="tag"
                    placeholder="請輸入標籤" v-model="tempArticle.tag[index]">
                    <button type="button" class="btn btn-outline-danger"
                    @click="tempArticle.tag.splice(index, 1)">
                      <span class="material-icons-outlined">
                        close
                      </span>
                    </button>
                  </div>
                </div>
                <div class="col-md-2 mb-1">
                  <button type="button" class="btn btn-outline-primary"
                  @click="tempArticle.tag.push('')">新增標籤</button>
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <textarea  id="description" rows="3" class="form-control"
                v-model="tempArticle.description"></textarea>
              </div>
              <div class="mb-3">
                <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="tempArticle.content"
                ></ckeditor>
              </div>
               <div class="mb-3">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" value="" id="isPublic" checked
                  v-model="tempArticle.isPublic">
                  <label for="isPublic" class="form-check-label">是否公開</label>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="hideModal">取消</button>
        <button type="button" class="btn btn-primary" @click="emitUpdate(tempArticle)">確認</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import modalHook from '../hooks/modal';

export default {
  props: {
    article: {
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
      tempArticle: {},
      create_at: '',
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'typing', 'bold', 'italic', '|', 'link'], // The configuration of the editor.
      },
    });

    function emitUpdate(item) {
      context.emit('emit-update', item);
    }

    watch(() => props.article, () => {
      data.tempArticle = { ...props.article };
      const dateAndTime = new Date(data.tempArticle.create_at * 1000).toISOString().split('T');
      [data.create_at] = dateAndTime;
    });
    watch(() => data.create_at, () => {
      data.tempArticle.create_at = Math.floor(new Date(data.create_at) / 1000);
    });
    const refData = toRefs(data);
    return {
      modal, modalBox, showModal, hideModal, ...refData, emitUpdate,
    };
  },

};
</script>

<style>

</style>
