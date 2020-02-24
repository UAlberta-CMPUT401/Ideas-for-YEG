<template>
  <v-card flat>
    <v-snackbar v-model="snackbar" absolute top right color="success">
      <span>Idea created!</span>
    </v-snackbar>
    <v-form ref="form">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="title"
              color="purple darken-2"
              label="Title"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="form.description" color="teal">
              <template v-slot:label>
                <div>Description</div>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text @click.stop="dialog = true">Delete</v-btn>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this idea?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="dialog = false">
                Delete
              </v-btn>
              <v-btn color="green darken-1" text @click="dialog = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-spacer></v-spacer>
        <v-btn href="/my-ideas" text>Cancel</v-btn>
        <v-btn text color="primary" @click="submit">Save</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
export default {
  props: {
    slug: String,
    ideas: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  data() {
    const defaultForm = Object.freeze({
      title: '',
      description: '',
    });

    return {
      dialog: false,
      form: Object.assign({}, defaultForm),
      rules: {
        title: [(val) => (val || '').length > 0 || 'This field is required'],
      },
      status: ['Ongoing', 'Seeking Help', 'Completed'],
      snackbar: false,
      defaultForm,
    };
  },

  methods: {
    submit() {
      this.snackbar = true;
      console.log(this.title, this.description);
    },
  },
};
</script>
