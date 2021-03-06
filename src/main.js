import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import Paginate from 'vuejs-paginate'
import store from './store'
import messagePlugin from './common/message.plugin'
import titlePlugin from './common/title.plugin'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import tooltipDirective from './directives/tooltip.directive'
import Loader from './components/app/Loader'
import './registerServiceWorker'

import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.component('Loader', Loader)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyBYsb6Ivprd6hCywk0yXz0XRtFPeluyEKg',
  authDomain: 'myvuecrm.firebaseapp.com',
  databaseURL: 'https://myvuecrm.firebaseio.com',
  projectId: 'myvuecrm',
  storageBucket: 'myvuecrm.appspot.com',
  messagingSenderId: '482502564925',
  appId: '1:482502564925:web:1f87e771db3e6ebfde5e54',
  measurementId: 'G-JYB5VK41KT'
})

let app
// onAuthStateChanged ищет какие то локадьные данные пользователя. Эт для пожддержания сессии
// Это метод может срабатывать во время работы приложения, поэтому добавили эту проверку
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
