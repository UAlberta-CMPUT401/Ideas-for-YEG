<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title align-center>
          Log In
        </v-card-title>
        <v-card-text>
          <p v-if="errorMessage !== null" class="red--text">
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

      <v-overlay :value="loading">
        <v-progress-circular
          :size="200"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
    </v-flex>
  </v-layout>
</template>

<script>
import { LS_USER_DATA } from '../constants/constants';

export default {
  components: {},

  data() {
    return {
      currentUser: this.$store.getters['users/getUser'],
      errorMessage: '',
      identifier: '',
      password: '',
      loading: false,
    };
  },
  mounted() {
    const self = this;
    window.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        self.logIn.bind(self);
        self.logIn();
      }
    });
  },
  methods: {
    async logIn() {
      this.loading = true;

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
            this.loading = false;
          }
        });

      // Handle success.
      if (data) {
        // const user = data.user;
        const jwt = data.jwt;

        // ensure that data is being saved to the client, not the sever
        if (process.browser) {
          // Access token like so: console.log(document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1"));
          document.cookie = 'accessToken=' + jwt;
          window.localStorage.setItem(LS_USER_DATA, JSON.stringify(data));
          this.$store.commit('userData/update', data);
          await this.$router.push('/');
        }
      }

      this.loading = false;
    },
  },
};
</script>
