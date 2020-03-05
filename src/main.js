import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify';
import { store } from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import "bootstrap/dist/css/bootstrap.css";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

Vue.use(Vuetify, {
  iconfont: 'fa'
 })


Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
