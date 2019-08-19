<template>
  <div>
    <v-toolbar
      dark
      prominent
      src="https://cdn.pixabay.com/photo/2017/06/07/06/13/food-2379472_1280.jpg"
    >
      <v-spacer />

      <v-badge
          :bottom="false"
          :color="'blue'"
          :left="false"
          :overlap="true"
          class="align-self-center"
        >
          <template
            v-if="basketItems.length > 0"
            v-slot:badge>
            <span>{{ basketItems.length }}</span>
          </template>
      
      <v-icon @click="toggleBasket">shopping_basket</v-icon>
      </v-badge>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: 'Header',
  computed: {
    basketItems() {
      return this.$store.state.basket.items
    },
  },
  methods: {
    toggleBasket() {
      this.$store.dispatch('toggleBasket')
    }
  }
}
</script>