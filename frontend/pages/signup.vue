<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title align-center>
          Sign Up
        </v-card-title>
        <v-card-text>
          <v-form ref="form" class="my-3">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              prepend-icon="mdi-account"
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
const EMAIL_VALIDATION_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 32;

export default {
  components: {},

  data() {
    return {
      currentUser: this.$store.getters['users/getUser'],
      email: '',
      password: '',
      passwordConf: '',
      emailRules: [
        (v) => EMAIL_VALIDATION_REGEX.test(v) || 'Email must be valid',
      ],
      passwordRules: [
        (v) =>
          v.length >= PASSWORD_MIN_LENGTH ||
          `Password must be at least ${PASSWORD_MIN_LENGTH} long`,
        (v) =>
          v.length <= PASSWORD_MAX_LENGTH ||
          `Password cannot exceed ${PASSWORD_MAX_LENGTH} long`,
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
    signUp() {
      if (this.$refs.form.validate()) {
        console.log(`${this.email} ${this.password} ${this.passwordConf}`);
      }
    },
  },
};
</script>
