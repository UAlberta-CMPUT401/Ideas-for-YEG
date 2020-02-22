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

      <v-card-text>
        <h2>{{ ideaCreator.email }}</h2>
      </v-card-text>

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
  props: {
    ideaCreator: Object,
  },

  data() {
    return {
      dialog: false,
      dialogTitle: 'Contact Information',
    };
  },
};
</script>
