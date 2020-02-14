<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title align-center>
          Log In
        </v-card-title>
        <v-card-text>
          <p v-if="errorMessage !== null">
            {{ errorMessage }}
          </p>
          <v-form ref="form" class="my-3">
            <v-text-field
              v-model="identifier"
              prepend-icon="mdi-account"
              name="Identifier"
              label="Identifier"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :type="'password'"
              prepend-icon="mdi-lock"
              name="Password"
              label="Password"
            ></v-text-field>
            <v-btn v-on:click="logIn">
              Log In
            </v-btn>
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
import { LS_USER_DATA } from '../constants';

export default {
  components: {},

  data() {
    return {
      currentUser: this.$store.getters['users/getUser'],
      errorMessage: '',
      identifier: '',
      password: '',
    };
  },
  methods: {
    async logIn() {
      const data = await this.$axios
        .$post('/auth/local', {
          identifier: this.identifier,
          password: this.password,
        })
        .catch((error) => {
          // Handle error.
          this.errorMessage = error.response;

          if (
            this.errorMessage &&
            this.errorMessage.data &&
            this.errorMessage.data.message.length > 0 &&
            this.errorMessage.data.message[0].messages.length > 0 &&
            this.errorMessage.data.message[0].messages[0] &&
            this.errorMessage.data.message[0].messages[0].message
          ) {
            this.errorMessage = this.errorMessage.data.message[0].messages[0].message;
          }
        });
      // Handle success.
      if (data) {
        // const user = data.user;
        const jwt = data.jwt;
        // Access token like so: console.log(document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1"));
        document.cookie = 'accessToken=' + jwt;
        window.localStorage.setItem(LS_USER_DATA, JSON.stringify(data));
        await this.$router.push('/');
      }
    },
  },
};
</script>
