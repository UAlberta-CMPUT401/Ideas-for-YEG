<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-snackbar v-model="error" absolute top right color="error">
        <span
          >An error occurred while trying to send a project update. Please try
          again</span
        >
      </v-snackbar>
      <v-overlay :value="loading">
        <v-progress-circular
          :size="200"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
      <template #activator="{ on: dialog }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            <v-btn
              class="ma-2"
              v-on="{ ...tooltip, ...dialog }"
              outlined
              color="indigo"
              >Send an Update</v-btn
            >
          </template>
          <span>Update followers/volunteers/donators!</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-col cols="12">
          <v-card-text>
            <v-form ref="form">
              <v-autocomplete
                v-model="user_group"
                :items="groups"
                :rules="requiredFieldRules"
                label="To"
                full-width
                hide-details
                hide-no-data
                hide-selected
                single-line
              ></v-autocomplete>
              <v-divider></v-divider>
              <v-text-field
                label="Subject"
                v-model="subject"
                :rules="requiredFieldRules"
                single-line
                full-width
                hide-details
              ></v-text-field>
              <v-divider></v-divider>
              <v-textarea
                v-model="body"
                label="Message"
                :rules="requiredFieldRules"
                counter
                full-width
                single-line
              ></v-textarea>
            </v-form>
          </v-card-text>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="sendUpdate">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      dialog: false,
      requiredFieldRules: [(v) => v.length >= 1 || `Field is required`],
      groups: ['Followers', 'Volunteers', 'Donators'],
      user_group: '',
      subject: '',
      body: '',
      error: false,
      loading: false,
    };
  },

  props: {
    ideaId: {
      type: String,
      required: true,
    },
  },

  methods: {
    async sendUpdate() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.loading = true;

      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);
      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.jwt,
          'Content-Type': 'application/json',
        },
      };

      const userGroup = this.user_group.toLowerCase();

      const emailRequest = {
        user_group: userGroup,
        subject: this.subject,
        body: this.body,
      };

      const emailApi = this.$axios.create({});
      emailApi.setBaseURL('http://localhost:1311/email/');

      const emailResponse = await emailApi
        .post(`${this.$props.ideaId}`, emailRequest, config)
        .catch((error) => console.log(error));

      if (!emailResponse) {
        this.error = true;
        this.loading = false;
        return;
      }

      if (userGroup === 'followers') {
        const updateProjectRequest = {
          update: [
            {
              description: this.body,
              date: moment(),
            },
          ],
        };
        const updateProjectResponse = await this.$axios
          .$put(`/ideas/${this.$props.ideaId}`, updateProjectRequest, config)
          .catch((error) => console.log(error));

        if (!updateProjectResponse) {
          this.error = true;
          this.loading = false;
          return;
        }
      }

      this.loading = false;
      this.dialog = false;
    },
  },
};
</script>
