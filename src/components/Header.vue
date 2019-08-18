<template>
  <div>
    <v-toolbar
      dark
      prominent
      src="https://cdn.pixabay.com/photo/2017/06/07/06/13/food-2379472_1280.jpg"
    >
      <v-spacer />
      <v-btn
        class="text-lowercase"
        :to="{ path: 'about' }"
        color="orange"
      >About</v-btn>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
    }
  }
}
</script>