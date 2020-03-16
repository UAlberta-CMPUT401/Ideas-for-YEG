<template>
  <div>
    <v-snackbar v-model="snackbarSuccess" absolute top right color="success">
      <span>{{ snackbarMessage }}</span>
    </v-snackbar>
    <v-snackbar v-model="snackbarError" absolute top right color="error">
      <span>{{ snackbarMessage }}</span>
    </v-snackbar>

    <v-overlay :value="loading">
      <v-progress-circular
        :size="200"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-overlay>

    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
        <v-card class="mx-auto divider" width="400" outlined>
          <v-card-title align-center class="justify-center">
            Change Your Avatar
          </v-card-title>
          <v-list-item three-line class="justify-center">
            <v-list-item-avatar tile size="150" color="grey"
              ><v-img :src="currentAvatar"></v-img
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-file-input
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
              ref="file"
              v-model="image"
              @change.self="changeAvatar"
              :clearable="false"
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
            </v-form>
            <v-btn v-on:click="changePassword">Change Password</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { DEFAULT_AVATAR_IMG_PATH } from '../constants/constants';
import { getJWTCookie } from '../constants/helperFunctions';

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 32;
const PICTURE_UPLOAD_ERROR =
  'Error with uploading new profile avatar. Please try again';

export default {
  consts: [PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH],

  data() {
    return {
      snackbarError: false,
      snackbarSuccess: false,
      snackbarMessage: '',
      image: '',
      currentAvatar: DEFAULT_AVATAR_IMG_PATH,
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
      loading: false,
    };
  },

  async mounted() {
    const config = {
      headers: {
        Authorization: 'Bearer ' + getJWTCookie(),
        'Content-Type': 'application/json',
      },
    };

    const userResponse = await this.$axios
      .$get('/users/me', config)
      .catch((error) => console.log(error));

    if (userResponse) {
      this.currentAvatar = userResponse.avatar
        ? `${this.$axios.defaults.baseURL}${userResponse.avatar.url}`
        : DEFAULT_AVATAR_IMG_PATH;
    }
  },

  methods: {
    async changeAvatar(event) {
      this.loading = true;
      const formData = new FormData();

      formData.append(`files`, this.image, this.image.name);

      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);

      const config = {
        headers: {
          Authorization: 'Bearer ' + getJWTCookie(),
          'Content-Type': 'application/json',
        },
      };

      const imageResponse = await this.$axios
        .$post('/upload', formData, {
          headers: {
            Authorization: 'Bearer ' + getJWTCookie(),
            'Content-Type': 'multipart/form-data',
          },
        })
        .catch((error) => {
          console.log(error);
        });

      if (!imageResponse) {
        this.snackbarMessage = PICTURE_UPLOAD_ERROR;
        this.snackbarError = true;
        this.loading = false;
        return;
      }

      const request = {
        avatar: imageResponse[0].id,
      };

      const updateUserResponse = await this.$axios
        .$put(`/users/${userData.user.id}`, request, config)
        .catch((error) => console.log(error));

      if (updateUserResponse) {
        this.currentAvatar = `${this.$axios.defaults.baseURL}${updateUserResponse.avatar.url}`;
        this.loading = false;
        this.snackbarMessage = 'Profile avatar successfully changed';
        this.snackbarSuccess = true;
      } else {
        this.loading = false;
        this.snackbarError = true;
        this.snackbarMessage = PICTURE_UPLOAD_ERROR;
      }
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
