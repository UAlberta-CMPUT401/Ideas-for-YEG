<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import store from '../store/index';
import * as UserMutationTypes from '../store/modules/users/mutation-types';
import Navbar from '../components/Navbar';

export default {
  store,
  components: {
    Navbar,
  },

  mounted() {
    this.$store.commit(`users/${UserMutationTypes.GET_AUTH}`);
  },
};
</script>
