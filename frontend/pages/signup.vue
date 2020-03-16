<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title align-center>
          Sign Up
        </v-card-title>
        <v-card-text>
          <p v-if="errorMessage !== null" class="red--text">
            {{ errorMessage }}
          </p>
          <v-form ref="form" class="my-3">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              prepend-icon="mdi-account"
              name="Username"
              label="Username"
            ></v-text-field>
            <v-text-field
              v-model="firstName"
              :rules="firstNameRules"
              prepend-icon="mdi-account"
              name="First name"
              label="First Name"
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              :rules="lastNameRules"
              prepend-icon="mdi-account"
              name="Last Name"
              label="Last Name"
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              prepend-icon="mdi-email"
              name="Email"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :type="'password'"
              prepend-icon="mdi-lock"
              name="Password"
              label="Password"
            ></v-text-field>
            <v-text-field
              v-model="passwordConf"
              :rules="passwordConfRules"
              :type="'password'"
              prepend-icon="mdi-lock"
              name="ConfirmPassword"
              label="Confirm Password"
            ></v-text-field>
            <v-btn v-on:click="signUp">Sign Up</v-btn>
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
import { LS_USER_DATA } from '../constants/constants';

const EMAIL_VALIDATION_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 32;
const USERNAME_MIN_LENGTH = 6;
const USERNAME_MAX_LENGTH = 16;
const FIRST_NAME_MAX_LENGTH = 32;
const FIRST_NAME_MIN_LENGTH = 1;
const LAST_NAME_MAX_LENGTH = 32;
const LAST_NAME_MIN_LENGTH = 1;

export default {
  // Define constants in page export for unit testing
  consts: [
    EMAIL_VALIDATION_REGEX,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    FIRST_NAME_MAX_LENGTH,
    FIRST_NAME_MIN_LENGTH,
    LAST_NAME_MAX_LENGTH,
    LAST_NAME_MIN_LENGTH,
  ],

  components: {},

  data() {
    return {
      errorMessage: '',
      currentUser: this.$store.getters['users/getUser'],
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConf: '',
      usernameRules: [
        (v) =>
          v.length >= USERNAME_MIN_LENGTH ||
          `Username must be at least ${USERNAME_MIN_LENGTH} characters long`,
        (v) =>
          v.length <= USERNAME_MAX_LENGTH ||
          `Username cannot exceed ${USERNAME_MAX_LENGTH} characters`,
      ],
      emailRules: [
        (v) => EMAIL_VALIDATION_REGEX.test(v) || 'Email must be valid',
      ],
      firstNameRules: [
        (v) =>
          v.length >= FIRST_NAME_MIN_LENGTH ||
          `First name must be at least ${FIRST_NAME_MIN_LENGTH} characters long`,
        (v) =>
          v.length <= FIRST_NAME_MAX_LENGTH ||
          `First name must be at most ${FIRST_NAME_MIN_LENGTH} characters long`,
      ],
      lastNameRules: [
        (v) =>
          v.length >= LAST_NAME_MIN_LENGTH ||
          `Last name must be at least ${LAST_NAME_MIN_LENGTH} characters long`,
        (v) =>
          v.length <= LAST_NAME_MAX_LENGTH ||
          `Last name must be at most ${LAST_NAME_MIN_LENGTH} characters long`,
      ],
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
    /*
    Validate input, then make a request to the backend.
     */

    // Request API.
    async signUp() {
      if (this.$refs.form.validate()) {
        const data = await this.$axios
          .$post('/auth/local/register', {
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
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
          // Send email confirmation
          this.$axios
            .$post('/auth/send-email-confirmation', {
              email: this.email,
            })
            .then((response) => {
              // Handle success.
              console.log('Your user received an email');
            })
            .catch((error) => {
              // Handle error.
              console.log('An error occured:', error);
              this.errorMessage = 'Could not send email confirmation';
            });

          // const user = data.user;
          const jwt = data.jwt;
          // Remove jwt property before storing into localStorage
          delete data.jwt;
          if (process.browser) {
            // Access token like so: console.log(document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1"));
            document.cookie = 'accessToken=' + jwt;
            window.localStorage.setItem(LS_USER_DATA, JSON.stringify(data));
            this.$store.commit('userData/update', data);
            await this.$router.push('/signupSuccess');
          }
        }
      }
    },
  },
};
</script>
