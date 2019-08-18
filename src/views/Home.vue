<template>
  <v-row wrap>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          Nutrition
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search foods"
            single-line
            hide-details
          />
        </v-card-title>
        <v-card-text>
          <v-data-table>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      search: '',
    }
  }
}
</script>
