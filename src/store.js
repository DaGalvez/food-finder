import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    basket: {
      show: false,
      items: [],
    }
  },
  mutations: {
    toggleBasket (state) {
      state.basket.show = !state.basket.show
    },
    addBasketItem (state, item) {
      state.basket.items.push(item)
    },
    removeBasketItem(state, itemIndex) {
      state.basket.items.splice(itemIndex, 1)
    }
  },
  actions: {
    toggleBasket (context) {
      context.commit('toggleBasket');
    },
    addBasketItem(context, item) {
      context.commit('addBasketItem', item)
    },
    removeBasketItem(context, itemIndex) {
      context.commit('removeBasketItem', itemIndex)
    }
  },
})


// api key: FBblnKj2CXcqdkpanPbSuaJ1Sqd2q9IMEDNMWIRWF