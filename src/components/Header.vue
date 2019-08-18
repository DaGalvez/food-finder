<template>
  <div>
    <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-app-bar-nav-icon />
      <v-toolbar-title>Nom nom App</v-toolbar-title>
      <v-spacer />
      <v-btn
        :to="{ path: 'about' }"
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