import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import CKEditor from '@ckeditor/ckeditor5-vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import rules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import { date, dollarSignThousandth } from './methods/format';

import App from './App.vue';
import router from './router';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});

setLocale('zh_TW');

const app = createApp(App);

app.use(VueAxios, axios);
app.use(CKEditor);
app.AOS = AOS.init();

app.provide('axios', app.config.globalProperties.axios);
app.use(router);
app.config.globalProperties.$filters = {
  date,
  dollarSignThousandth,
};
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('Loading', Loading);
app.mount('#app');
