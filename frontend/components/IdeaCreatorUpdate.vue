<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
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
            <v-form>
              <v-autocomplete
                v-model="selected"
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
                label="Subject"
                v-model="subject"
                single-line
                full-width
                hide-details
              ></v-text-field>

              <v-textarea
                v-model="message"
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
          <v-btn @click="sendUpdate" color="green darken-1" text>Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      subject: '',
      message: '',
      selected: '',
      Groups: ['Followers', 'Volunteers', 'Idea admins'],
    };
  },
  methods: {
    sendUpdate() {
      // do something
      console.log(this.subject, this.message, this.selected);
    },
  },
};
</script>
