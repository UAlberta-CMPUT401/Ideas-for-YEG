<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <LocationCard
        v-bind:locations="locations"
        v-bind:href="href"
        v-bind:nuxt="nuxt"
      />
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
      locations: [
        {
          title: 'Edmonton',
          src:
            'https://rentals.ca/blog/wp-content/uploads/2018/08/42276507674_d792f146ca_z.jpg',
          flex: 12,
        },
      ],
      href: '/idea-dashboard',
      nuxt: true,
    };
  },
};
</script>
