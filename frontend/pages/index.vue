<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome {{ currentUser }}
        </v-card-title>
        <v-card-text>
          <nuxt-link to="/">
            CLick To Login
          </nuxt-link>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/idea-dashboard">
            Continue on to the Idea Dashboard Via Button
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue';
import VuetifyLogo from '~/components/VuetifyLogo.vue';

export default {
  components: {
    Logo,
    VuetifyLogo,
  },

  data() {
    return {
      currentUser: this.$store.getters['users/getUser'],
    };
  },
};
</script>
