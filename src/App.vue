<template>
  <v-app id="app">
    <!-- header -->
    <router-view name="header" />

    <!-- basket -->
    <router-view name="basket" />

    <!-- views -->
    <v-container>
      <router-view
        name="default"
        @prompt-snackbar="promptSnackbar"
      />
    </v-container>

    <!-- notification snacks -->
    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      top
    >
      {{ snackbar.text }}
      <v-btn
        :color="snackbar.color"
        text
        @click="snackbar.show = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    snackbar: {
      show: false,
      text: '',
      timeout: 2500,
      color: 'blue',
    }
  }),
  methods: {
    promptSnackbar({ show, text, color }) {
      this.snackbar.show = show
      this.snackbar.text = text
      this.snackbar.color = color
    },
  },
};
</script>
