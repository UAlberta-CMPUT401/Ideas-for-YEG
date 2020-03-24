<template>
  <v-container fluid>
    <v-card-title align-center>
      Category Management
    </v-card-title>
    <v-row v-if="categories.category.length > 0" no-gutters justify="center">
      <v-col
        align="center"
        xs12
        sm4
        v-for="category in categories.category"
        :key="category.name"
        justify="center"
      >
        <v-card class="ma-2" width="200" max-height="50" color="#bdbdbd">
          <v-list-item align="center" justify="center" class="ma-1 pa-0">
            <v-list-item-content width="100" class="ma-1 pa-1">
              <v-list-item-title class="nameSpacing">{{
                category.name
              }}</v-list-item-title>
            </v-list-item-content>
            <div class="ma-0 pa-0" width="32">
              <v-list-item
                v-on:click="deleteCategory(categories, category)"
                width="32"
                align="center"
              >
                <v-icon color="black" width="32">mdi-close</v-icon>
              </v-list-item>
            </div>
          </v-list-item>

          <v-list-item class="grow btnSpacing">
            <v-spacer class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex">
            </v-spacer>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/**
 * Template Credits: https://vuetifyjs.com/en/components/cards
 * MIT License
 * https://github.com/vuetifyjs/vuetify
 */
import { getJWTCookie } from '../constants/helperFunctions';
export default {
  props: {
    categories: {
      id: '',
      name: '',
      location: Object,
      category: {
        type: Array,
        default: () => {
          return [];
        },
      },
    },
  },
  methods: {
    async deleteCategory(categories, category) {
      // Remove the selected category from the category list
      const categoryArray = categories.category;
      const index = categoryArray.indexOf(category);
      if (index !== -1) categoryArray.splice(index, 1);

      const config = {
        headers: {
          Authorization: 'Bearer ' + getJWTCookie(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const categoryRequest = {
        category: categoryArray,
      };
      const response = await this.$axios
        .$put(`/categories/${categories.id}`, categoryRequest, config)
        .catch((err) => {
          console.log(err);
        });
      if (response) {
        console.log(response);
      }
    },
  },
};
</script>

<style scoped>
.btnSpacing {
  padding: 0 8px;
}

.nameSpacing {
  font-size: large;
}
</style>
