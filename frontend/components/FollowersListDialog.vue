<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on: dialog }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn v-on="{ ...tooltip, ...dialog }" text class="pa-0 btnSpacing">
            <v-icon>mdi-account-multiple-plus</v-icon>
            <span class="subheading mr-2">{{ followers.length }}</span>
          </v-btn>
        </template>
        <span>Followers</span>
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
                <th class="text-left">Followers</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="follower in followers" :key="follower.id">
                <td>{{ follower.username }}</td>
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
    followers: Array,
  },

  data() {
    return {
      dialog: false,
      dialogTitle: 'Followers',
    };
  },
};
</script>
