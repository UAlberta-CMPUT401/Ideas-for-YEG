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
          <v-col cols="12">
            <v-checkbox v-model="form.terms" color="green">
              <template v-slot:label>
                <div @click.stop="">
                  Do you accept the
                  <a href="javascript:;" @click.stop="terms = true">terms</a>
                  and
                  <a href="javascript:;" @click.stop="conditions = true"
                    >conditions?</a
                  >
                </div>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn href="/my-ideas" text @click="resetForm">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!formIsValid" text color="primary" type="submit"
          >Save</v-btn
        >
      </v-card-actions>
    </v-form>
    <v-dialog v-model="terms" width="70%">
      <v-card>
        <v-card-title class="title">Terms</v-card-title>
        <v-card-text v-for="n in 5" :key="n">
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple" @click="terms = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="conditions" width="70%">
      <v-card>
        <v-card-title class="title">Conditions</v-card-title>
        <v-card-text>
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple" @click="conditions = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
export default {
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
