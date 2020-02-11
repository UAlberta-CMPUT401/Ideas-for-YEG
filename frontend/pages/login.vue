<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title align-center>
          Log In
        </v-card-title>
        <v-card-text>
          <v-banner v-if="errorMessage" color="red">
            {{ errorMessage }}
          </v-banner>
          <v-form ref="form" class="my-3">
            <v-text-field
              v-model="identifier"
              :error="identifierError"
              prepend-icon="mdi-account"
              name="Identifier"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :type="'password'"
              :error="passwordError"
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
import * as UserMutationTypes from '../store/modules/users/mutation-types';

export default {
  components: {},

  data() {
    return {
      currentUser: this.$store.getters['users/getUser'],
      errorMessage: '',
      identifierError: false,
      passwordError: false,
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
            this.errorMessage = this.errorMessage.data.message[0].messages[0].message.toLowerCase();

            if (
              this.errorMessage.includes('identifier') ||
              this.errorMessage.includes('username')
            ) {
              this.identifierError = true;
            }
            if (this.errorMessage.indexOf('password')) {
              this.passwordError = true;
            }
            if (
              !(
                this.errorMessage.includes('identifier') ||
                this.errorMessage.includes('username')
              )
            ) {
              this.identifierError = false;
            }
            if (!this.errorMessage.indexOf('password')) {
              this.passwordError = false;
            }

            this.errorMessage =
              this.errorMessage.charAt(0).toUpperCase() +
              this.errorMessage.substring(1);
          }
        });
      // Handle success.
      if (data) {
        // const user = data.user;
        this.errorMessage = '';
        this.identifierError = false;
        this.passwordError = false;

        const jwt = data.jwt;
        // Access token like so: console.log(document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1"));
        document.cookie = 'accessToken=' + jwt;

        this.$store.commit(`users/${UserMutationTypes.GET_AUTH}`);
        await this.$router.push('/');
      }
    },
  },
};
</script>
