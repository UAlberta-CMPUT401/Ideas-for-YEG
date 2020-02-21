<template>
  <v-container fluid>
    <v-row no-gutters justify="center">
      <v-col
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
      // Get the jwt
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);

      // Remove the selected category from the category list
      let categoryArray = categories.category;
      const index = categoryArray.indexOf(category);
      if (index !== -1) categoryArray.splice(index, 1);

      // Format the JSON for insertion into the graphql
      categoryArray = JSON.stringify(categoryArray);
      categoryArray.replace(/\\"/g, '\uFFFF');
      categoryArray = categoryArray
        .replace(/\"([^"]+)\":/g, '$1:') // eslint-disable-line
        .replace(/\uFFFF/g, '\\"');

      // Send the graphql post
      const response = await this.$axios
        .$post(
          '/graphql',
          {
            query: `mutation {
              updateCategory(
                input: {
                  where: { id: "${categories.location.id}" }
                  data: {
                    name: "${categories.name}",
                    location: "${categories.location.id}",
                    category: ${categoryArray},
                  }
              })
              {
                category {
                  name
                  location {
                    id
                    name
                  }
                  category {
                    name
                    id
                  }
                }
              }
            }
          `,
          },
          {
            headers: {
              Authorization: 'Bearer ' + userData.jwt,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        )
        .catch((err) => {
          console.log(err.response);
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
