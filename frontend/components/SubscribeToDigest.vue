<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template #activator="{ on: dialog }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            <v-btn
              class="ma-2"
              dark
              outlined
              large
              fab
              color="black"
              v-on="{ ...tooltip, ...dialog }"
            >
              <v-icon>mdi-email-check</v-icon>
            </v-btn>
          </template>
          <span>Subscribe to Digest</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-card-title class="headline">Subscribe here!</v-card-title>
        <v-col cols="12">
          <v-text-field label="Email*" required></v-text-field>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="black" text @click="dialog = false">Confirm</v-btn>
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
    };
  },
};
</script>
