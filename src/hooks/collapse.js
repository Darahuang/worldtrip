import {
  ref, onMounted, reactive,
} from 'vue';
import Collapse from 'bootstrap/js/dist/collapse';

export default function () {
  let collapseBox = reactive({});
  const collapse = ref(null);
  onMounted(() => {
    collapseBox = new Collapse(collapse.value, {
      toggle: false,
    });
  });
  function toggleCollapse() {
    collapseBox.toggle();
  }
  return {
    toggleCollapse, collapseBox, collapse,
  };
}
