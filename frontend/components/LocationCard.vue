<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col v-for="location in locations" :key="location.name" cols="10">
        <v-card
          d-flex
          justify-center
          class="mx-auto"
          max-width="700"
          v-on:click="locationSaveAndRedirect(location)"
        >
          <v-img
            :src="location.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="location.name"></v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/*
Code used by looking at the following code snippet: https://codesandbox.io/s/github/nuxt/nuxt.js/tree/dev/examples/custom-routes?from-embed
*/
import { LS_CURR_LOCATION } from '../constants/constants';

export default {
  props: {
    locations: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    // Store the location in memory
    locationSaveAndRedirect(location) {
      window.localStorage.setItem(LS_CURR_LOCATION, JSON.stringify(location));
      this.$store.commit('currLocation/update', location);

      this.$router.push(location.code + '/idea-dashboard/');
    },
  },
};
</script>

<style scoped></style>
