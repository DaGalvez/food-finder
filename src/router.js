import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Header from './components/Header.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
        header: Header
      },
    },
    {
      path: '/about',
      name: 'about',
      components: {
        default: About,
        
      }
    }
  ]
})
