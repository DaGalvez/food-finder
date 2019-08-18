<template>
  <v-app id="app">
    <router-view name="header" />
    <v-container>
      <router-view name="default" />
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
