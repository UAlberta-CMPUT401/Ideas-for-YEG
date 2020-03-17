<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
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
              <v-icon>mdi-gift-outline</v-icon>
            </v-btn>
          </template>
          <span>Donate to idea</span>
        </v-tooltip>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">Proceed to donate to idea</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="donateToIdea"
            >Proceed</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
// import { getJWTCookie } from '../constants/helperFunctions';
// must link to  ":1311/donate?iid=(ideaid)"
export default {
  data: () => ({
    dialog: false,
  }),
  methods: {
    donateToIdea() {
      console.log('here');
    },
  },
};
</script>
