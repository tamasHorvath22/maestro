import Vue from 'vue'
import App from './App.vue'
import VueRourer from 'vue-router';
import Routes from './routes';import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMinus, faPlus, faUserPlus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueMaterial)
Vue.use(VueRourer);


const router = new VueRourer({
  routes: Routes,
  mode: 'history'
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
