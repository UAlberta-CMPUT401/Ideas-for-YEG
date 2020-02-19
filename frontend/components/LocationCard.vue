<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col v-for="location in locations" :key="location.name" cols="10">
        <v-card d-flex justify-center class="mx-auto" max-width="700">
          <NuxtLink :to="location.code + '/idea-dashboard/'">
            <v-img
              :src="location.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="location.name"></v-card-title>
            </v-img>
          </NuxtLink>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/*
Code used by looking at the following code snippet: https://codesandbox.io/s/github/nuxt/nuxt.js/tree/dev/examples/custom-routes?from-embed
*/
export default {
  props: {
    locations: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style scoped></style>
