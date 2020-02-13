<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on: dialog }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn v-on="{ ...tooltip, ...dialog }" text class="pa-0 btnSpacing">
            <v-icon>mdi-cash-usd-outline</v-icon>
            <span class="subheading mr-2" color="black">{{
              totaldonations
            }}</span>
          </v-btn>
        </template>
        <span>See Donation History</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ DialogTitle }} {{ title }}
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
              <tr v-for="item in donations" :key="item.donor">
                <td>{{ item.donor }}</td>
                <td>${{ item.amount }}</td>
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
    ideas: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      dialog: false,
      DialogTitle: 'Previous Donations to',
      title: 'My title',
      totaldonations: 100,
      donations: [
        {
          donor: 'donor 1',
          amount: 159,
        },
        {
          donor: 'donor 2',
          amount: 19,
        },
        {
          donor: 'donor 3',
          amount: 1,
        },
        {
          donor: 'donor 4',
          amount: 1509,
        },
      ],
    };
  },
};
</script>
