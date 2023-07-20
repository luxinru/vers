import './assets/css/common.css'
import './utils/directive'
import 'vant/lib/index.css';
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import filters from './utils/filters'

import {
  Lazyload, Toast, List, NavBar, Form, Field, Calendar, Button, Cell, DatetimePicker, Popup, Uploader, Loading, Overlay
} from 'vant'

Vue.config.productionTip = false

//全局注册 filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(List)
  .use(Toast)
  .use(NavBar)
  .use(Form)
  .use(Field)
  .use(Calendar)
  .use(Button)
  .use(Cell)
  .use(DatetimePicker)
  .use(Popup)
  .use(Uploader)
  .use(Loading)
  .use(Overlay)
  .use(Lazyload, {
    // error: require('./assets/img/img_placeholder.svg'),
    // loading: require('./assets/img/img_placeholder.svg'),
  })



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
