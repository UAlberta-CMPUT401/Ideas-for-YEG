<template>
  <div>
    <v-snackbar v-model="snackbarSuccess" absolute top right color="success">
      <span>{{ snackbarMessage }}</span>
    </v-snackbar>
    <v-snackbar v-model="snackbarError" absolute top right color="error">
      <span>{{ snackbarMessage }}</span>
    </v-snackbar>

    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
        <v-card class="mx-auto divider" width="400" outlined>
          <v-card-title align-center class="justify-center">
            Change Your Avatar
          </v-card-title>
          <v-list-item three-line class="justify-center">
            <v-list-item-avatar
              tile
              size="150"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
            ></v-file-input>
          </v-card-actions>
        </v-card>

        <v-card class="mx-auto divider" width="400" outlined>
          <v-card-title align-center class="justify-center">
            Change Your Password
          </v-card-title>
          <v-card-text>
            <p v-if="errorMessage !== null" class="red--text">
              {{ errorMessage }}
            </p>
            <v-form ref="form" class="my-3">
              <v-text-field
                v-model="currentPassword"
                :rules="passwordRules"
                :type="'password'"
                prepend-icon="mdi-lock"
                name="Password"
                label="Current Password"
              ></v-text-field>
              <v-text-field
                v-model="newPassword"
                :rules="passwordRules"
                :type="'password'"
                prepend-icon="mdi-lock"
                name="Password"
                label="New Password"
              ></v-text-field>
              <v-text-field
                v-model="passwordConf"
                :rules="passwordConfRules"
                :type="'password'"
                prepend-icon="mdi-lock"
                name="ConfirmPassword"
                label="Confirm New Password"
              ></v-text-field>
              <v-btn v-on:click="changePassword">Change Password</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 32;

export default {
  consts: [PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH],

  data() {
    return {
      error: false,
      success: false,
      snackbarMessage: '',
      currentPassword: '',
      newPassword: '',
      passwordConf: '',
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
    changePassword() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
.divider {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
