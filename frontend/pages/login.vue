<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title align-center>
          Log In
        </v-card-title>
        <v-card-text>
          <v-form ref="form" class="my-3">
            <v-text-field
              v-model="email"
              prepend-icon="mdi-account"
              name="Email"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :type="'password'"
              prepend-icon="mdi-lock"
              name="Password"
              label="Password"
            ></v-text-field>
            <v-btn v-on:click="logIn">Log In</v-btn>
          </v-form>
          <nuxt-link to="/signup">
            Don't have an account yet? Click here to sign up
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
      email: '',
      password: '',
    };
  },
  methods: {
    logIn() {
      console.log(`${this.email} ${this.password}`);
    },
  },
};
</script>
