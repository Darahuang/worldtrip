import {
  ref, onMounted, reactive,
} from 'vue';
import Modal from 'bootstrap/js/dist/modal';

export default function () {
  const modal = ref(null);
  let modalBox = reactive({});
  onMounted(() => {
    modalBox = new Modal(modal.value, {
      backdrop: 'static',
    });
  });
  function showModal() {
    modalBox.show();
  }
  function hideModal() {
    modalBox.hide();
  }
  return {
    modal, showModal, hideModal,
  };
}
