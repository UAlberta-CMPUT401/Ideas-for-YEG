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
        <v-container>
          <v-row>
            <v-col>
              <v-text-field label="Subject" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea label="Body" auto-grow required></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">
          CLOSE
        </v-btn>

        <v-btn color="green darken-1" text @click="dialog = false">SEND</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // TODO access ideaCreator.email (this.$props.ideaCreator.email) to a send button onClick callback
  props: {
    ideaCreator: Object,
  },

  data() {
    return {
      dialog: false,
      dialogTitle: 'Contact Idea Creator',
    };
  },
};
</script>
