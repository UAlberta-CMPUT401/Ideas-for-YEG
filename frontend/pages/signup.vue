<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title align-center>
          Sign Up
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="mdi-account"
              name="Email"
              label="Email"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-lock"
              name="Password"
              label="Password"
            ></v-text-field>
          </v-form>
          <nuxt-link to="/login">
            Already have an account? Click here to log in
          </nuxt-link>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      currentUser: this.$store.getters['users/getUser'],
    };
  },
};
</script>
