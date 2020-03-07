<template>
  <v-row justify="center">
    <v-dialog v-model="openDialog" persistent max-width="600px">
      <template #activator="{ on: openDialog }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            <v-btn
              class="ma-2"
              dark
              outlined
              large
              fab
              color="black"
              v-on="{ ...tooltip, ...openDialog }"
            >
              <v-icon>mdi-hand-heart</v-icon>
            </v-btn>
          </template>
          <span>Volunteer</span>
        </v-tooltip>
      </template>

      <v-card>
        <v-card-title class="headline"
          >Confirm to Sign Up As A Volunteer</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="openDialog = false" color="blue darken-1" text>
            Cancel
          </v-btn>
          <v-btn @click="signupOnClick()" color="green" text>
            Sign Me Up!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {
  VOLUNTEER_SUCCESS_MESSAGE,
  VOLUNTEER_FAILURE_MESSAGE,
} from '../constants/constants';

export default {
  props: {
    ideaId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      openDialog: false,
    };
  },

  methods: {
    async signupOnClick() {
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);

      if (!userData) {
        this.error = true;
        return;
      }

      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.jwt,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const volunteerResponse = await this.$axios
        .$put(`/ideas/volunteer/${this.$props.ideaId}`, {}, config)
        .catch((error) => console.log(error));

      if (volunteerResponse) {
        this.$emit(
          'dialogOperationCallback',
          VOLUNTEER_SUCCESS_MESSAGE,
          true,
          false,
        );
        this.openDialog = false;
      } else {
        this.$emit(
          'dialogOperationCallback',
          VOLUNTEER_FAILURE_MESSAGE,
          false,
          true,
        );
      }
    },
  },
};
</script>
