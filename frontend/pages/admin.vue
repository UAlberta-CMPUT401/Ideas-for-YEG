<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-btn v-if="true" class="mr-4" @click="navigateRoute()">
        Access Location Dashboard
      </v-btn>
      <h2 v-else>No Admin Pages Available</h2>
    </v-flex>
  </v-layout>
</template>

<script>
import { LS_USER_DATA } from '../constants/constants';
export default {
  data() {
    return {
      adminLocation: '',
    };
  },
  beforeMount() {
    // Check if user is signed in and a admin role
    if (process.browser) {
      const userJSON = window.localStorage.getItem(LS_USER_DATA);
      if (userJSON !== null) {
        const userData = JSON.parse(userJSON);
        if (userData.user.role.type !== 'authenticated') {
          this.$router.push('/');
        } else {
          // TODO: Implement user location admin based routing here
        }
      } else {
        this.$router.push('/');
      }
    }
  },
  methods: {
    navigateRoute() {
      // TODO: Implement different versions based on the location admin's role eventually
      this.$router.push('/yeg/location-dashboard/');
    },
  },

  middleware: 'currLocationDefined',
};
</script>
