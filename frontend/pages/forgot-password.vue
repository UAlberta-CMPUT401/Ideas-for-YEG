<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ message }}
        <v-btn color="pink" text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
      <v-card>
        <v-card-title align-center>
          Password Reset
        </v-card-title>
        <v-card-text>
          <v-form ref="form" class="my-3" v-model="valid">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              prepend-icon="mdi-email-outline"
              name="Email"
              label="Email"
              filled
              rounded
              dense
            ></v-text-field>
            <v-btn v-on:click="confirm" text :disabled="!valid" color="success">
              Send Password Reset Link
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
const EMAIL_VALIDATION_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default {
  consts: [EMAIL_VALIDATION_REGEX],

  components: {},

  data() {
    return {
      message:
        'Thanks! Please check your email for a link to reset your password.',
      timeout: 3000,
      snackbar: false,

      valid: false,
      email: '',
      emailRules: [
        (v) => EMAIL_VALIDATION_REGEX.test(v) || 'Email must be valid',
      ],
    };
  },

  methods: {
    async confirm() {
      // check if email is linked to an account
      // if no, display message
      // if yes, send login reset link
      const data = await this.$axios
        .$post('/auth/forgot-password', {
          email: this.email,
          url: 'http://localhost:3000/reset-password',
        })
        .then((response) => {
          // Handle success.
          console.log('Your user received an email');
        })
        .catch((error) => {
          // Handle error.
          console.log('An error occurred:', error);
        });

      this.snackbar = true;

      if (data) {
        //
      }
      await this.$router.push('/');
    },
  },
};
</script>
