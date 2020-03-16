<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template #activator="{ on: dialog }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            <v-btn
              class="ma-2"
              v-on="{ ...tooltip, ...dialog }"
              outlined
              color="indigo"
              >Add a new admin</v-btn
            >
          </template>
          <span>Invite a new idea admin!</span>
        </v-tooltip>
      </template>
      <v-card style="overflow: hidden;">
        <v-card-title class="headline">Enter username:</v-card-title>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            label=" Username"
            required
          ></v-text-field>
        </v-col>
        <v-row justify="center">
          <p v-if="errorMessage !== null" class="red--text">
            {{ errorMessage }}
          </p>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="(dialog = false), (errorMessage = ''), (name = '')"
            >Cancel</v-btn
          >
          <v-btn color="green darken-1" text @click="addAdmin()">Send</v-btn>
        </v-card-actions>
      </v-card>
      <v-overlay :value="loading">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
    </v-dialog>
  </v-row>
</template>
<script>
import { getJWTCookie } from '../constants/helperFunctions';
export default {
  data() {
    return {
      errorMessage: '',
      loading: false,
      dialog: false,
      name: '',
    };
  },
  methods: {
    async addAdmin() {
      this.loading = true;
      // Get the jwt
      const config = {
        headers: {
          Authorization: 'Bearer ' + getJWTCookie(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const response = await this.$axios
        .$get(`/users/`, config)
        .catch((error) => {
          if (error.response.status === 500)
            this.errorMessage = 'Could not retrieve users';
          else this.errorMessage = 'Could not access users';
          this.loading = false;
        });

      let admin = null;
      for (let i = 0; i < response.length; i++) {
        if (response[i].username === this.name) {
          admin = response[i];
        }
      }

      if (admin == null) {
        this.errorMessage = 'Could not find input user';
        this.loading = false;
        return;
      }

      // Get the ID for this idea to update
      let thisSlugId = null;
      if (this.$route.query && this.$route.query.id) {
        thisSlugId = this.$route.query.id;
      }
      let thisIdeaId = null;
      if (thisSlugId) {
        // Found Idea slug so we can add the admins to existing idea
        const ideaIdResponse = await this.$axios
          .get(`/ideas?slug=${thisSlugId}`, config)
          .catch((error) => {
            console.log(error);
          });
        if (ideaIdResponse) {
          thisIdeaId = ideaIdResponse.data[0].id;
          for (let i = 0; i < ideaIdResponse.data[0].admins.length; i++) {
            if (ideaIdResponse.data[0].admins[i].id === admin.id) {
              this.errorMessage = 'User is already an admin for this idea';
              this.loading = false;
              return;
            }
          }
        }
      } else {
        // Idea doesn't exist yet so we are in the creation of the idea phase
        this.$emit('adminsNewIdea', admin);
        return;
      }

      // Create admin id removal request
      const ideaRequest = {
        user: admin.id,
        action: 'add',
      };
      // Update the idea
      const responseUpdate = await this.$axios
        .$put(`/ideas/admin/${thisIdeaId}`, ideaRequest, config)
        .catch((error) => {
          // Handle error.
          this.errorMessage = error.response;

          if (
            this.errorMessage &&
            this.errorMessage.data &&
            this.errorMessage.data.message.length > 0 &&
            this.errorMessage.status === 500
          ) {
            this.errorMessage = 'Could not update input user';
            this.loading = false;
            return;
          }
          this.loading = false;
        });

      if (responseUpdate) {
        this.dialog = false;
        this.loading = false;
        this.$emit('childToParent');
        this.$emit('adminsNewIdea', admin);
      }
    },
  },
};
</script>
