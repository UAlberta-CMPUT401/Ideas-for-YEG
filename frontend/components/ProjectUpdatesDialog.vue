<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on: dialog }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn v-on="{ ...tooltip, ...dialog }" text class="pa-0 btnSpacing">
            <v-icon>mdi-history</v-icon>
          </v-btn>
        </template>
        <span>Idea Update History</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ DialogTitle }} {{ title }}
      </v-card-title>

      <v-timeline>
        <v-timeline-item
          v-for="item in ProjectUpdates"
          :key="item.update"
          color="red lighten-2"
          large
        >
          <template v-slot:opposite>
            <span
              ><td>{{ item.date }}</td></span
            >
          </template>
          <v-card class="elevation-2">
            <v-card-title class="headline">Action</v-card-title>
            <v-card-text>
              <td>{{ item.update }}</td>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>

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
      DialogTitle: 'Update history for',
      title: 'My title',
      ProjectUpdates: [
        {
          update: 'Created',
          date: 'Jan 5 2020',
        },
        {
          update: 'Edited',
          date: 'Feb 2 2020',
        },
        {
          update: 'Edited',
          date: 'Feb 10 2020',
        },
      ],
    };
  },
};
</script>
