<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-snackbar v-model="error" absolute top right color="error">
        <span
          >An error occurred while trying to add/edit/delete the honorarium.
          Please try again.</span
        >
      </v-snackbar>
      <template #activator="{ on: dialog }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            <v-btn
              class="ma-2"
              v-on="{ ...tooltip, ...dialog }"
              outlined
              color="indigo"
              >Setup Honorarium</v-btn
            >
          </template>
          <span>Make a plan of action!</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-card-title class="headline">Honorarium</v-card-title>
        <v-col cols="12">
          <div v-for="(item, index) in honorarium" :key="index">
            <v-col class="honorarium-row">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="item.note"
                    label="Note"
                    :rules="noteRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="item.amount"
                    label="Amount"
                    prefix="$"
                    type="number"
                    :rules="amountRules"
                  ></v-text-field>
                </v-col>
                <v-btn
                  class="action-button"
                  icon
                  color="grey"
                  @click="removeItem(index)"
                >
                  <v-icon>mdi-delete-circle</v-icon>
                </v-btn>
                <v-btn
                  class="action-button"
                  icon
                  color="primary"
                  v-if="index + 1 === honorarium.length"
                  @click="addItem"
                >
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
              </v-row>
            </v-col>
            <v-overlay :value="loading">
              <v-progress-circular
                :size="200"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </v-overlay>
          </div>

          <v-btn
            class="ma-2"
            text
            color="grey darken-3"
            v-if="0 === honorarium.length"
            @click="addItem"
            >Click here to Start your Honorarium</v-btn
          >
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="cancelChanges">Close</v-btn>
          <v-btn color="primary" text @click="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { getJWTCookie } from '../constants/helperFunctions';
const NOTE_MAX_LENGTH = 20;
export default {
  consts: [NOTE_MAX_LENGTH],
  data() {
    return {
      loading: false,
      dialog: false,
      error: false,
      honorarium: [],
      backupHonorarium: [],
      ideaId: '',
      noteRules: [
        (v) => !!v || 'Name is required',
        (v) =>
          (v && v.length >= 3) || 'Label must be atleast than 3 characters',
      ],

      amountRules: [(v) => !!v || 'Amount is required'],
      slugId: '',
    };
  },

  created() {
    if (this.$route.query && this.$route.query.id) {
      this.slugId = this.$route.query.id;
    }
  },

  async mounted() {
    if (this.slugId) {
      let ideaResponse = await this.$axios
        .$get(`/ideas?slug=${this.slugId}`)
        .catch((err) => console.log(err));

      if (ideaResponse.length > 0) {
        ideaResponse = ideaResponse[0];
        this.honorarium = ideaResponse.honorarium;
        this.ideaId = ideaResponse.id;
        this.backupHonorarium = Object.assign([], this.honorarium);
      } else {
        this.error = true;
      }
    }
  },

  methods: {
    removeItem(index) {
      this.honorarium.splice(index, 1);
    },

    addItem() {
      const checkEmptyLines = this.honorarium.filter(
        (line) => line.number === null,
      );

      if (checkEmptyLines.length >= 1 && this.honorarium.length > 0) {
        return;
      }

      this.honorarium.push({
        note: null,
        amount: null,
      });
    },

    cancelChanges() {
      this.dialog = false;
      this.honorarium = Object.assign([], this.backupHonorarium);
    },

    async submit() {
      this.loading = true;
      const config = {
        headers: {
          Authorization: 'Bearer ' + getJWTCookie(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const ideaRequest = {
        honorarium: this.honorarium,
      };

      let response = null;

      response = await this.$axios
        .$put(`/ideas/${this.ideaId}`, ideaRequest, config)
        .catch((error) => {
          console.log(error);
          this.error = true;
          this.loading = false;
        });

      if (response) {
        this.loading = false;
      } else {
        this.error = true;
        this.loading = false;
      }

      if (this.ideaId) {
        const ideaResponse = await this.$axios
          .$get(`/ideas/${this.ideaId}`)
          .catch((err) => console.log(err));

        if (ideaResponse) {
          this.honorarium = ideaResponse.honorarium;
          this.backupHonorarium = Object.assign([], this.honorarium);
          this.dialog = false;
        } else {
          this.error = true;
        }
      }
    },
  },
};
</script>

<style scoped>
.honorarium-row {
  justify-content: left;
}

.action-button {
  align-self: center;
}
</style>
