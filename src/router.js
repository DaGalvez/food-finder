import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Header from './components/Header.vue'
import Basket from './components/Basket.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
        header: Header,
        basket: Basket,
      },
    },
  ]
})
