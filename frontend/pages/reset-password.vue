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
          Password Reset Confirmation
        </v-card-title>
        <v-card-text>
          <v-form ref="form" class="my-3" v-model="valid">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="New Password"
              :type="'password'"
              prepend-icon="mdi-lock"
              outlined
              rounded
              dense
            ></v-text-field>
            <v-text-field
              v-model="passwordConf"
              :rules="passwordConfRules"
              label="Confirm Password"
              :type="'password'"
              prepend-icon="mdi-lock"
              outlined
              rounded
              dense
            ></v-text-field>
            <v-divider></v-divider>
            <div class="text-center">
              <v-btn
                v-on:click="resetPassword"
                :disabled="!valid"
                text
                color="error"
                href="/login"
              >
                Reset Password
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 32;
export default {
  consts: [PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH],

  components: {},

  data() {
    return {
      password: '',
      passwordConf: '',
      valid: false,
      message: 'Password has been reset!',
      timeout: 3000,
      snackbar: false,
      passwordRules: [
        (v) =>
          v.length >= PASSWORD_MIN_LENGTH ||
          `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
        (v) =>
          v.length <= PASSWORD_MAX_LENGTH ||
          `Password cannot exceed ${PASSWORD_MAX_LENGTH} characters`,
      ],
      passwordConfRules: [
        (v) => v === this.password || 'Passwords do not match',
      ],
    };
  },
  methods: {
    async resetPassword() {
      // reset password (graphql mutation)
      // redirect to login page
      await this.$axios
        .$post('http://localhost:1337/auth/reset-password', {
          code: this.$route.query.code,
          password: this.password,
          passwordConfirmation: this.passwordConf,
        })
        .then((response) => {
          // Handle success.
          console.log('Your password has been changed.');
        })
        .catch((error) => {
          // Handle error.
          console.log('An error occurred:', error);
        });

      this.snackbar = true;
    },
  },
};
</script>
