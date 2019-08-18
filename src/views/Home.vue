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
            no-data-text="test"
            no-results-text="No results"
          >
            <template #body="{ items }">
              <tr
                v-for="item in items"
                :key="item.name"
                mb-1
              >
                <td style="max-width: 300px;">{{ item.name }}</td>
                <td>{{ item.manu }}</td>
                <td>{{ item.group }}</td>
                <td>
                  <v-icon
                    small
                    @click="viewInfo(item)"
                  >info</v-icon>
                  <v-icon
                    small
                    @click="addToBasket(item)"
                  >add</v-icon>
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
  methods: {
    async addToBasket(item) {
      let itemToAdd = item;
      
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
        
        if (!this.$store.state.basket.show) {
          this.$store.dispatch('toggleBasket')
        }
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
          alert('Unable to find food. Try searching for something else!');
          return;
        }
        this.food = data.list.item;
        this.isLoading = false
      } catch (err) {
        alert('Oops! An error occurred when attempting to fetch your food data.');
        console.log(err);
      }
    },
    async viewInfo(food) {
      console.log(food);
      try {
        this.foodInfoDialog.show = true;
        const { data } = await this.axios.get('https://api.nal.usda.gov/ndb/V2/reports', {
          params :{
            api_key: this.apiKey,
            ndbno: food.ndbno,
          }
        })
        console.log(data);
        this.foodInfoDialog.name = food.name 
        this.foodInfoDialog.nutrients = data.foods[0].food.nutrients
        console.log(this.foodInfoDialog.nutrients)
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>
