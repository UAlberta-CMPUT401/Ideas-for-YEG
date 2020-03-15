<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on: dialog }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn v-on="{ ...tooltip, ...dialog }" text class="pa-0 btnSpacing">
            <v-icon v-if="isVolunteering" color="blue">mdi-hand-heart</v-icon>
            <v-icon v-else color="black">mdi-hand-heart</v-icon>
            <span class="subheading mr-2">{{
              volunteers ? volunteers.length : 0
            }}</span>
          </v-btn>
        </template>
        <span>Volunteers</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ dialogTitle }}
      </v-card-title>

      <v-card-text>
        <v-simple-table justify="center">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Username</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="volunteer in volunteers" :key="volunteer.username">
                <td>{{ volunteer.username }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
    volunteers: Array,
    isVolunteering: Boolean,
  },

  data() {
    return {
      dialog: false,
      dialogTitle: 'Volunteers',
    };
  },
};
</script>
