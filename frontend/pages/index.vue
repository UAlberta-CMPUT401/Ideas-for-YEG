<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <LocationCard v-if="locations.length > 0" v-bind:locations="locations" />
      <h2 v-else>No Locations Have Been Added Yet</h2>
    </v-flex>
  </v-layout>
</template>

<script>
import LocationCard from '../components/LocationCard';
import {
  DEFAULT_LOCATION_IMG_PATH,
  LS_CURR_LOCATION,
} from '../constants/constants';

export default {
  components: {
    LocationCard,
  },

  data() {
    return {
      locations: [],
    };
  },

  async mounted() {
    if (window.localStorage.getItem(LS_CURR_LOCATION)) {
      await this.$router.push(
        '/' +
          JSON.parse(window.localStorage.getItem(LS_CURR_LOCATION)).code +
          '/idea-dashboard',
      );
    }
    const response = await this.$axios.$get('/locations').catch((err) => {
      console.log(err);
    });

    if (response) {
      this.locations = response.map((location) => {
        return {
          name: location.name,
          code: location.route,
          src: location.image
            ? `${this.$axios.defaults.baseURL}${location.image.url}`
            : DEFAULT_LOCATION_IMG_PATH,
        };
      });
    }
  },

  middleware: 'currLocationDefined',
};
</script>
