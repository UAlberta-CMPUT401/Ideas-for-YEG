<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-btn
        v-if="locationDashboardAvailable"
        class="mr-4"
        @click="navigateRoute()"
      >
        Access {{ LocationName }} Location Dashboard
      </v-btn>
      <h2 v-else>No Admin Pages Available</h2>
    </v-flex>
  </v-layout>
</template>

<script>
import { getJWTCookie } from '../constants/helperFunctions';
export default {
  data() {
    return {
      LocationName: '',
      locationDashboardAvailable: false,
      adminLocationDashboards: '',
    };
  },
  async mounted() {
    const config = {
      headers: {
        Authorization: 'Bearer ' + getJWTCookie(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const adminResponse = await this.$axios
      .get(`/locations/admin`, config)
      .catch((error) => {
        console.log(error);
      });

    if (adminResponse) {
      if (adminResponse.data.managedLocations.length > 0) {
        const locationResponse = await this.$axios
          .get(`/locations/${adminResponse.data.managedLocations[0]}`, config)
          .catch((error) => {
            console.log(error);
          });

        if (locationResponse) {
          this.LocationName = locationResponse.data.name;
          this.adminLocationDashboard =
            '/' + locationResponse.data.route + '/location-dashboard/';
          this.locationDashboardAvailable = true;
        }
      } else {
        this.adminLocationDashboard = '';
        this.locationDashboardAvailable = false;
        this.$router.push('/');
      }
    } else {
      this.$router.push('/');
    }
  },
  methods: {
    navigateRoute() {
      // TODO: Implement different versions based on the location admin's role eventually
      this.$router.push(this.adminLocationDashboard);
    },
  },
};
</script>
