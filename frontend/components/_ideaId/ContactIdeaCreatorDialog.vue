<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on: dialog }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn v-on="{ ...tooltip, ...dialog }" text class="pa-0">
            <v-icon>mdi-chat</v-icon>
          </v-btn>
        </template>
        <span>Contact Idea Creator</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title primary-title>
        {{ dialogTitle }}
      </v-card-title>

      <v-card-text> {{ contactEmail }} </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">
          CLOSE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // TODO access ideaCreator.email (this.$props.ideaCreator.email) to a send button onClick callback
  props: {
    contactEmail: String,
  },

  data() {
    return {
      dialog: false,
      dialogTitle: 'Idea Creator Contact Email',
    };
  },
};
</script>
