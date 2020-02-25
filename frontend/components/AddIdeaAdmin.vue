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
          <v-text-field label=" Username*" required></v-text-field>
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
    };
  },
};
</script>
