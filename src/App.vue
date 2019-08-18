<template>
  <v-app id="app">
    <!-- header -->
    <router-view name="header" />

    <!-- basket -->
    <router-view name="basket" />

    <!-- views -->
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
