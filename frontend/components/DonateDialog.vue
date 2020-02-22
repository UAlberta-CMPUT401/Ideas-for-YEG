<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on: dialog }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn v-on="{ ...tooltip, ...dialog }" text class="pa-0">
            <v-icon>mdi-cash-usd-outline</v-icon>
            <span class="subheading mr-2" color="black">{{
              donations.length
            }}</span>
          </v-btn>
        </template>
        <span>See Donation History</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ dialogTitle }}
      </v-card-title>

      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Donor</th>
                <th class="text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="donation in donations" :key="donation.id">
                <td>{{ donation.user.username }}</td>
                <td>${{ donation.amount }}</td>
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
    donations: Array,
  },

  data() {
    return {
      dialog: false,
      dialogTitle: 'Previous Donations',
    };
  },
};
</script>
