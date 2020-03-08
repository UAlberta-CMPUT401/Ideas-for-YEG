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
      <v-card>
        <v-card-title class="headline">Enter username:</v-card-title>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="20"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
            label=" Username*"
            required
            :value="userNameInput"
            @change="userNameInput = $event"
          ></v-text-field>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="addAdmin(userNameInput)"
            >Send</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
  },
  props: {
    userNameInput: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;

      if (this.$v.name.$model === '') {
        errors.push('Need a non empty name');
      }
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 10 characters long');
      !this.$v.name.required && errors.push('Name is required.');
      return errors;
    },
  },
  methods: {
    async addAdmin(username) {
      this.$v.$touch();
      // Get the jwt
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);
      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.jwt,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      // Get the ID for this idea to update
      let thisIdeaId = null;
      if (this.$root._route.query.id) {
        thisIdeaId = this.$root._route.query.id;
      }

      const response = await this.$axios
        .$get(`/users/`, config)
        .catch((error) => {
          console.log(error);
        });

      let adminId = null;
      for (let i = 0; i < response.length; i++) {
        if (response[i].username === username) {
          adminId = response[i].id;
        }
      }
      const errors = [];
      !(adminId !== null) && errors.push('User Does Not Exist');
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 20 characters long');
      !this.$v.name.required && errors.push('Name is required.');
      if (errors.length > 0) return;
      if (this.$v.$invalid) {
        return;
      }

      // Create admin id removal request
      const ideaRequest = {
        user: adminId,
        action: 'add',
      };

      // Update the idea
      const responseUpdate = await this.$axios
        .$put(`/ideas/admin/${thisIdeaId}`, ideaRequest, config)
        .catch((error) => {
          console.log(error);
        });

      if (responseUpdate) {
        this.dialog = false;
        this.$emit('childToParent');
      }
    },
  },
};
</script>
