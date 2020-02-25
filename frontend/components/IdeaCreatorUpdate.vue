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
              <v-divider></v-divider>
              <v-text-field
                label="Subject"
                v-model="selected"
                single-line
                full-width
                hide-details
              ></v-text-field>
              <v-divider></v-divider>
              <v-textarea
                v-model="title"
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
          <v-btn color="green darken-1" text @click="dialog = false"
            >Send</v-btn
          >
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
      Groups: ['Followers', 'Volunteers', 'Idea admins'],
    };
  },
};
</script>
