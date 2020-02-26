<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-snackbar v-model="snackbar" absolute top color="success">
        <span>Email sent!</span>
      </v-snackbar>
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
          <span>Update followers/volunteers!</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-col cols="12">
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-autocomplete
                v-model="selected"
                :rules="groupRules"
                required
                :items="Groups"
                chips
                label="To"
                full-width
                hide-details
                hide-no-data
                hide-selected
                multiple
                single-line
              ></v-autocomplete>

              <v-text-field
                v-model="subject"
                :rules="subjectRules"
                required
                label="Subject"
                single-line
                full-width
                hide-details
              ></v-text-field>

              <v-textarea
                v-model="message"
                :rules="messageRules"
                required
                label="Message"
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
          <v-btn
            @click="sendUpdate"
            :disabled="!valid"
            color="green darken-1"
            text
            >Send</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
const EMAIL_VALIDATION_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const SUBJECT_MIN_LENGTH = 5;
const SUBJECT_MAX_LENGTH = 100;
const MESSAGE_MIN_LENGTH = 15;
const GROUPS_MIN_LENGTH = 1;

export default {
  consts: [
    EMAIL_VALIDATION_REGEX,
    SUBJECT_MIN_LENGTH,
    SUBJECT_MAX_LENGTH,
    MESSAGE_MIN_LENGTH,
    GROUPS_MIN_LENGTH,
  ],

  components: {},
  data() {
    return {
      snackbar: false,
      dialog: false,
      valid: true,
      subject: '',
      message: '',
      selected: '',
      Groups: ['Followers', 'Volunteers', 'Idea admins'],
      groupRules: [
        (v) =>
          v.length >= GROUPS_MIN_LENGTH ||
          ` Must have at least ${SUBJECT_MIN_LENGTH} group(s)`,
      ],
      subjectRules: [
        (v) => !!v || 'Subject is required',
        (v) =>
          v.length >= SUBJECT_MIN_LENGTH ||
          `Subject must be at least ${SUBJECT_MIN_LENGTH} characters long`,
        (v) =>
          v.length <= SUBJECT_MAX_LENGTH ||
          `Subject must be at most ${SUBJECT_MAX_LENGTH} characters long`,
      ],
      messageRules: [
        (v) => !!v || 'Message is required',
        (v) =>
          v.length >= MESSAGE_MIN_LENGTH ||
          `Message must be at least ${MESSAGE_MIN_LENGTH} characters long`,
      ],
      emailRules: [
        (v) => EMAIL_VALIDATION_REGEX.test(v) || 'Email must be valid',
      ],
    };
  },
  methods: {
    sendUpdate() {
      console.log(this.subject, this.message, this.selected);

      // check if user authenticated

      // send email

      this.snackbar = true;
    },
  },
};
</script>
