<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on: dialog }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn v-on="{ ...tooltip, ...dialog }" text class="pa-0 btnSpacing">
            <v-icon color="black">mdi-account-group</v-icon>
            <span class="subheading mr-2">{{ NumberVolunteers }}</span>
          </v-btn>
        </template>
        <span>Volunteers</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ DialogTitle }} {{ title }}
      </v-card-title>

      <v-card-text>
        <v-simple-table justify="center">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Date</th>
                <th class="text-left">Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in Volunteers" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.hours }}</td>
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
      DialogTitle: 'Our volunteers for ',
      title: 'My title',
      NumberVolunteers: '5',
      Volunteers: [
        {
          name: 'Name',
          date: 'Jan 5 2020',
          hours: 10,
        },
        {
          name: 'Nome',
          date: 'Jan 5 2020',
          hours: 1,
        },
        {
          name: 'Nime',
          date: 'Jan 5 2020',
          hours: 16,
        },
      ],
    };
  },
};
</script>
