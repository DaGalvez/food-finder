<template>
  <v-row wrap>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          Food Finder
          <v-spacer />
          <v-text-field
            v-model="search"
            label="Search foods"
            single-line
            hide-details
          />
          <v-btn
            text
            icon
            @click="fetchFoodsList"
          >
            <v-icon>search</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :loading="isLoading"
            :headers="headers"
            :items="food"
            must-sort
          >
            <template #body="{ items }">
              <tr
                v-for="(item, i) in items"
                :key="i"
                mb-1
              >
                <td style="max-width: 300px;">{{ item.name }}</td>
                <td>{{ item.manu }}</td>
                <td>{{ item.group }}</td>
                <td>
                  <v-btn
                    fab
                    icon
                    small
                    class="mr-2"
                    @click="viewInfo(item)"
                  >
                    <v-icon small>info</v-icon>
                  </v-btn>
                  
                  <v-btn
                    fab
                    icon
                    small
                    @click="addToBasket(item)"
                  >
                    <v-icon small>add_shopping_cart</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      
      <!-- food info dialog -->
      <v-dialog
        v-model="foodInfoDialog.show"
        max-width="750px"
      >
        <v-card>
          <v-card-title>
            {{ foodInfoDialog.name }}
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="foodInfoDialog.search"
              label="Search by nutrient"
            />
            <v-data-table
              :headers="foodInfoDialog.headers"
              :items="foodInfoDialog.nutrients"
              :search="foodInfoDialog.search"
              must-sort
              :items-per-page="5"
            >
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // in prod this would be store in
      // an encrypted file via `git-secret`
      apiKey: 'vJ4ZIsrG1w7KxT6g6hmztEUu2rR8VlKRSEOkinqb',
      food: [],
      foodInfoDialog: {
        search: '',
        show: false,
        name: '',
        headers: [
          {
            text: 'Name',
            value: 'name',
          },
          {
            text: 'Unit',
            value: 'unit',
          },
          {
            text: 'Value',
            value: 'value',
          },
        ],
      },
      headers: [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Manufacturer',
          value: 'manu'
        },
        {
          text: 'Group',
          value: 'group'
        },
        {
          text: 'Actions',
          value: 'action',
          sortable: false
        }
      ],
      isLoading: false,
      search: '',
    }
  },
  mounted() {
    this.fetchFoodsList()
  },
  methods: {
    async addToBasket(item) {
      let itemToAdd = item;
      
      try {
        const { data } = await this.axios.get('https://api.nal.usda.gov/ndb/V2/reports', {
          params :{
            api_key: this.apiKey,
            ndbno: item.ndbno,
          }
        })
        let [{ value }] = data.foods[0].food.nutrients.filter( ({ name }) => {
          return name === 'Energy'
        })
        
        itemToAdd.calories = Number(value);

        this.$store.dispatch('addBasketItem', itemToAdd)
        
        // example event emission, could've done in vuex
        this.promptSnackbar('Added item to shopping cart!', 'blue')
      } catch (err) {
        this.promptSnackbar(`Oops! Couldn't add item to shopping cart.`, 'red')
      }
      
      
        
    },
    promptSnackbar(text, color) {
      this.$emit('prompt-snackbar', {
        show: true,
        text,
        color,
      })
    },
    async fetchFoodsList() {
      try {
        this.isLoading = true
        const { data } = await this.axios.get('https://api.nal.usda.gov/ndb/search/', {
          params: {
            api_key: this.apiKey,
            q: this.search,
          }
        })

        if (data.list === undefined) {
          this.isLoading = false
          this.promptSnackbar(`Unable to find food. Try searching for something else!.`, 'orange')
          return;
        }
        this.food = data.list.item;
        this.isLoading = false
      } catch (err) {
        this.promptSnackbar(`An error occurred when attempting to fetch your food data.`, 'red')
      }
    },
    async viewInfo(food) {
      try {
        this.foodInfoDialog.show = true;
        const { data } = await this.axios.get('https://api.nal.usda.gov/ndb/V2/reports', {
          params :{
            api_key: this.apiKey,
            ndbno: food.ndbno,
          }
        })
        this.foodInfoDialog.name = food.name 
        this.foodInfoDialog.nutrients = data.foods[0].food.nutrients
      } catch (err) {
        this.promptSnackbar(`An error occurred when attempting to fetch your food data.`, 'red')
      }
    },
  },
}
</script>
