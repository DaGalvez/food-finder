<template>
  <div>
    <v-navigation-drawer
      v-model="showBasket"
      app
      clipped
      left
      class="pa-5"
      width="500"
      temporary
      @input="updateStore"
    >
      <h1 class="mb-5">Your Cart <span class="grey--text subtitle-1 ml-2">({{ basketItems.length }})</span></h1>
      <v-divider class="mb-5" />
      <v-list v-if="basketItems.length > 0">
        <v-list-item
          three-line
          v-for="(item, index) in basketItems"
          :key="item.name"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.calories }} kcal</v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-btn
                text
                class="caption mt-2 text-capitalize"
                color="red"
                @click="removeFromBasket(index)"
              >remove</v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
          
        </v-list-item>
      </v-list>
      <v-alert
        v-else
        type="warning"
      >Your cart is empty.
      </v-alert>

      <template #append>
        <div class="text-center grey--text text--darken-1">
          <b>Total Calories: </b> {{ totalCalorieCount }}
        </div>
      </template>
      
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
    }
  },
  computed: {
    showBasket() {
      return this.$store.state.basket.show
    },
    basketItems() {
      return this.$store.state.basket.items
    },
    totalCalorieCount() {
      return this.$store.getters.calorieCount
    }
  },
  methods: {
    removeFromBasket(itemIndex) {
      this.$store.dispatch('removeBasketItem', itemIndex)
    },
    updateStore(state) {
      if (state) return
      this.$store.dispatch('toggleBasket');
    }
  }
}
</script>