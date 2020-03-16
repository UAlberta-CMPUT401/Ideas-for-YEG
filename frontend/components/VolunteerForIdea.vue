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
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="openDialog = false" color="blue darken-1" text>
            Cancel
          </v-btn>
          <v-btn @click="volunteerOnClick()" color="green" text>
            {{ primaryAction }}
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
  MUST_LOGIN_MESSAGE,
  VOLUNTEER_REMOVAL_MESSAGE,
} from '../constants/constants';

const REMOVE_VOLUNTEER = 'Remove your username from the list of volunteers?';
const ADD_VOLUNTEER = 'Confirm to Sign Up As A Volunteer';
const ADD_PRIMARY_ACTION = 'Sign Me Up!';
const REMOVE_PRIMARY_ACTION = 'Yes';

export default {
  props: {
    ideaId: {
      type: String,
      required: true,
    },
    allVolunteers: {
      type: Array,
      required: true,
    },
    ideaCreatorEmail: {
      type: String,
      required: true,
    },
    ideaTitle: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      openDialog: false,
      title: ADD_VOLUNTEER,
      primaryAction: ADD_PRIMARY_ACTION,
    };
  },

  updated() {
    const userJSON = window.localStorage.getItem('userData');
    const userData = JSON.parse(userJSON);

    if (!userData) {
      this.notLoggedIn();
      return;
    }

    let isVolunteerAlready = false;

    for (const user of this.$props.allVolunteers) {
      if (user.username === userData.user.username) {
        isVolunteerAlready = true;
        break;
      }
    }

    if (isVolunteerAlready) {
      this.title = REMOVE_VOLUNTEER;
      this.primaryAction = REMOVE_PRIMARY_ACTION;
    } else {
      this.title = ADD_VOLUNTEER;
      this.primaryAction = ADD_PRIMARY_ACTION;
    }
  },

  methods: {
    notLoggedIn() {
      this.$emit('dialogOperationCallback', MUST_LOGIN_MESSAGE, false, true);
      this.openDialog = false;
    },

    async volunteerOnClick() {
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);

      if (!userData) {
        this.notLoggedIn();
        return;
      }

      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.jwt,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const emailRequest = {
        email: this.$props.ideaCreatorEmail,
        idea_title: this.$props.ideaTitle,
        volunteer: userData.user.username,
      };

      const volunteerResponse = await this.$axios
        .$put(`/ideas/volunteer/${this.$props.ideaId}`, {}, config)
        .catch((error) => console.log(error));

      if (volunteerResponse) {
        let displayMessage = VOLUNTEER_SUCCESS_MESSAGE;

        if (this.title === REMOVE_VOLUNTEER) {
          displayMessage = VOLUNTEER_REMOVAL_MESSAGE;
        }

        if (displayMessage === VOLUNTEER_SUCCESS_MESSAGE) {
          const emailApi = this.$axios.create({});
          const baseURL =
            process.env.NODE_ENV !== 'production'
              ? 'http://localhost:1311/'
              : 'http://162.246.157.122:1311/';
          emailApi.setBaseURL(baseURL);

          const emailResponse = await emailApi
            .post(`email_volunteer`, emailRequest, config)
            .catch((error) => console.log(error));

          if (emailResponse) {
            this.$emit('dialogOperationCallback', displayMessage, true, false);
          } else {
            this.$emit(
              'dialogOperationCallback',
              VOLUNTEER_FAILURE_MESSAGE,
              false,
              true,
            );
          }
        } else {
          this.$emit('dialogOperationCallback', displayMessage, true, false);
        }

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
