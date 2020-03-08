<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title align-center>
          Sign Up Success!
        </v-card-title>
        <v-card-text align="center">
          <p>
            You are now successfully signed up! Please verify your email before
            logging in
          </p>
          <p>
            <nuxt-link to="/">
              Return to Homepage
            </nuxt-link>
          </p>
          <v-btn text="true" v-on:click="resendEmail"
            >Didn't get an email? Click here to resend</v-btn
          >
          <p v-if="resMessage">{{ resMessage }}</p>
          <p v-if="errMessage" class="red--text">{{ errMessage }}</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { LS_USER_DATA } from '../constants/constants';

export default {
  data() {
    return {
      resMessage: '',
      errMessage: '',
    };
  },
  methods: {
    // resend email to the user
    resendEmail() {
      const userJSON = window.localStorage.getItem(LS_USER_DATA);
      if (userJSON !== null) {
        const userData = JSON.parse(userJSON);
        this.$axios
          .$post('/auth/send-email-confirmation', {
            email: userData.user.email,
          })
          .then((response) => {
            // Handle success.
            this.resMessage = 'Email successfully sent!';
          })
          .catch((error) => {
            // Handle error.
            this.errMessage =
              'Could not send email confirmation: ' +
              error.response.data.message;
          });
      }
    },
  },
};
</script>
