<template>
  <v-layout column justify-center align-center>
    <v-container v-if="locationDashboardAvailable" xs12 sm8 md6>
      <v-row
        class="ma-6"
        v-for="location in locations"
        :key="location.name"
        justify="center"
      >
        <v-btn @click="navigateRoute(location)">
          Access {{ location.name }} Location Dashboard
        </v-btn>
      </v-row>
    </v-container>
    <h2 v-else>No Admin Pages Available</h2>
  </v-layout>
</template>

<script>
import { getJWTCookie } from '../constants/helperFunctions';
export default {
  data() {
    return {
      LocationName: '',
      locationDashboardAvailable: false,
      adminLocationDashboard: '',
      locations: [],
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
        for (let i = 0; i < adminResponse.data.managedLocations.length; i++) {
          const locationResponse = await this.$axios
            .get(`/locations/${adminResponse.data.managedLocations[i]}`, config)
            .catch((error) => {
              console.log(error);
            });

          if (locationResponse) {
            this.LocationName = locationResponse.data.name;
            this.adminLocationDashboard =
              '/' + locationResponse.data.route + '/location-dashboard/';
            this.locationDashboardAvailable = true;
            this.locations.push({
              name: locationResponse.data.name,
              route: '/' + locationResponse.data.route + '/location-dashboard/',
            });
          }
        }
      } else {
        this.locations = [];
        this.adminLocationDashboard = '';
        this.locationDashboardAvailable = false;
        this.$router.push('/');
      }
    } else {
      this.$router.push('/');
    }
  },
  methods: {
    navigateRoute(selectedLocation) {
      this.$router.push(selectedLocation.route);
    },
  },
};
</script>
