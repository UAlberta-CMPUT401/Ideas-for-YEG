<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template #activator="{ on: dialog }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            v-if="contentType == '0'"
            v-on="{ ...tooltip, ...dialog }"
            text
            class="pa-0 btnSpacing"
            ><v-icon color="grey darken-3">mdi-delete</v-icon></v-btn
          >
          <v-btn
            v-if="contentType == '1'"
            v-on="{ ...tooltip, ...dialog }"
            color="primary"
            dark
          >
            {{ buttonLabel }}
          </v-btn>
        </template>
        <span>Delete</span>
      </v-tooltip>
    </template>
    <v-card style="overflow: hidden;">
      <v-card-title class="headline">Confirm Deletion</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="dialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text @click="confirmDeletion()"
          >Confirm</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    buttonLabel: {
      type: String,
      default: 'Delete Page',
    },
    contentType: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    confirmDeletion() {
      this.$emit('childToParent');
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.btnSpacing {
  padding: 0 6px;
}
</style>
