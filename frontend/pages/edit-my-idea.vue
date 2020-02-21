<template>
  <v-card flat>
    <v-snackbar v-model="snackbar" absolute top right color="success">
      <span>Registration successful!</span>
      <v-icon dark>mdi-checkbox-marked-circle</v-icon>
    </v-snackbar>
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.title"
              :rules="rules.name"
              color="purple darken-2"
              label="Title"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="form.description" color="teal">
              <template v-slot:label>
                <div>Description</div>
              </template>
            </v-textarea>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="form.status"
              :items="statuses"
              :rules="rules.status"
              color="pink"
              label="Status"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-slider
              v-model="form.goal"
              :rules="rules.goal"
              color="orange"
              label="Goal ($)"
              min="100"
              max="1000"
              thumb-label
            ></v-slider>
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
        <v-btn href="/my-ideas" text @click="resetForm">Cancel</v-btn>
        <v-btn :disabled="!formIsValid" text color="primary" type="submit"
          >Save</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
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
    const defaultForm = Object.freeze({
      title: '',
      last: '',
      description: '',
      status: '',
      goal: null,
      terms: false,
    });

    return {
      dialog: false,
      form: Object.assign({}, defaultForm),
      rules: {
        statuses: [(val) => (val || '').length > 0 || 'This field is required'],
        name: [(val) => (val || '').length > 0 || 'This field is required'],
      },
      status: ['Ongoing', 'Seeking Help', 'Completed'],
      conditions: false,
      content: `Insert terms and conditions here`,
      snackbar: false,
      terms: false,
      defaultForm,
    };
  },

  computed: {
    formIsValid() {
      return (
        this.form.title && this.form.last && this.form.status && this.form.terms
      );
    },
  },

  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    submit() {
      this.snackbar = true;
      this.resetForm();
    },
  },
};
</script>
