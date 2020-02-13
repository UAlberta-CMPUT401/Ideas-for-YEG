<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <LocationCard v-bind:locations="locations" />
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
    /**
     * default location image from rentals blog
     * https://rentals.ca/blog/wp-content/uploads/2018/08/42276507674_d792f146ca_z.jpg
     */
    return {
      locations: [
        {
          name: 'Edmonton',
          src:
            'https://rentals.ca/blog/wp-content/uploads/2018/08/42276507674_d792f146ca_z.jpg',
          code: 'YEG',
        },
      ],
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
          src:
            'https://rentals.ca/blog/wp-content/uploads/2018/08/42276507674_d792f146ca_z.jpg', // `http://localhost:1337${location.image.url}`,
        };
      });
    }
  },
};
</script>
