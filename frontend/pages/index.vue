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
    const response = await this.$axios.$get('/locations').catch((err) => {
      console.log(err);
    });

    if (response) {
      this.locations = response.map((location) => {
        return {
          name: location.name,
          code: location.route,
          // temporarily use this now as localhost photos are hit/miss
          src: `http://localhost:1337${location.image.url}`, // ,
        };
      });
    }
  },
};
</script>
