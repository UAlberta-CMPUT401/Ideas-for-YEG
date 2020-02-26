<template>
  <v-card flat>
    <v-snackbar v-model="success" absolute top right color="success">
      <span>Idea created!</span>
    </v-snackbar>
    <v-snackbar v-model="error" absolute top right color="error">
      <span>An error occured while trying to create/update the idea!</span>
    </v-snackbar>
    <v-form ref="form">
      <v-container fluid>
        <v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="title"
                :rules="requiredFieldRules"
                label="Title"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-select
                v-model="selectedStatus"
                :items="status"
                label="Idea Status"
                :rules="requiredFieldRules"
                v-on:change="statusOnChange"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3">
              <v-select
                v-model="selectedLocation"
                :items="locations"
                label="Idea Location"
                item-text="location"
                item-value="id"
                :rules="requiredFieldRules"
                v-on:change="locationOnChange"
              ></v-select>
            </v-col>
          </v-row>

          <v-col cols="12">
            <v-textarea v-model="description" :rules="requiredFieldRules">
              <template v-slot:label>
                <div>Description</div>
              </template>
            </v-textarea>
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              v-model="selectedCategories"
              :items="allLocationsWithCategories[selectedLocation]"
              outlined
              dense
              chips
              small-chips
              label="Categories"
              multiple
            ></v-autocomplete>
          </v-col>

          <v-col cols="12">
            <v-row>
              <template>
                <v-file-input
                  label="Upload photo(s) for this idea"
                  filled
                  prepend-icon="mdi-camera"
                  multiple
                  v-model="images"
                  ref="file"
                ></v-file-input>
              </template>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <template>
            <AddIdeaAdmin />
          </template>
          <template>
            <IdeaCreatorUpdate />
          </template>
          <template>
            <CreateHonorarium />
          </template>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn @click.stop="dialog = true" text>Delete</v-btn>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this idea?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false" color="green darken-1" text>
                Cancel
              </v-btn>
              <v-btn @click="dialog = false" color="red" text>
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-spacer></v-spacer>
        <v-btn href="/my-ideas" text>Cancel</v-btn>
        <v-btn text color="primary" @click="submit">Save</v-btn>
      </v-card-actions>

      <v-overlay :value="loading">
        <v-progress-circular
          :size="200"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
    </v-form>
  </v-card>
</template>
<script>
import AddIdeaAdmin from '../components/AddIdeaAdmin';
import IdeaCreatorUpdate from '../components/IdeaCreatorUpdate';
import CreateHonorarium from '../components/CreateHonorarium';

export default {
  components: {
    AddIdeaAdmin,
    IdeaCreatorUpdate,
    CreateHonorarium,
  },
  props: {
    idea: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  data() {
    return {
      title: '',
      description: '',
      dialog: false,
      status: ['Ongoing', 'SeekingHelp', 'Completed'],
      locations: [],
      categories: [],
      success: false,
      selectedLocation: '',
      selectedStatus: '',
      allLocationsWithCategories: {},
      selectedCategories: [],
      images: [],
      loading: false,
      error: false,
      requiredFieldRules: [(v) => v.length >= 1 || `Field is required`],
      locationIds: [],
    };
  },

  async mounted() {
    const loadedLocations = await this.$axios
      .$get('/locations')
      .catch((err) => console.log(err));

    if (loadedLocations) {
      loadedLocations.forEach((location) => {
        const allCategories = location.categories
          ? location.categories.category.map((category) => {
              return category.name;
            })
          : [];
        this.allLocationsWithCategories[location.id] = allCategories;
        this.locations.push({
          location: location.route,
          id: location.id,
        });
      });
    }
  },

  methods: {
    locationOnChange(location) {
      this.selectedLocation = location;
    },

    statusOnChange(status) {
      this.selectedStatus = status;
    },

    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);
      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.jwt,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const userResponse = await this.$axios
        .get('/users/me', config)
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.error = true;
        });

      if (!userResponse) {
        this.error = true;
        return;
      }

      // TODO add honorarium, add idea admins, send project updates later
      const ideaRequest = {
        title: this.title,
        description: this.description,
        status: this.selectedStatus,
        location: this.selectedLocation,
        categories: this.selectedCategories.map((category) => {
          return {
            name: category,
          };
        }),
        slug: this.title,
        user_creator: userResponse.data.id,
      };

      const postIdeaResponse = await this.$axios
        .$post('/ideas', ideaRequest, config)
        .catch((error) => {
          console.log(error);
          this.error = true;
          this.loading = false;
        });

      if (postIdeaResponse) {
        const formData = new FormData();

        this.images.forEach((file, index) => {
          formData.append(`files`, file);
        });

        formData.append('refId', postIdeaResponse.id);
        formData.append('ref', 'ideas');
        formData.append('field', 'images');

        const imageResponse = await this.$axios
          .$post('/upload', formData, {
            headers: {
              Authorization: 'Bearer ' + userData.jwt,
              'Content-Type': 'multipart/form-data',
            },
          })
          .catch((error) => {
            console.log(error);
            this.error = true;
            this.loading = false;
          });

        if (imageResponse) {
          this.success = true;
          this.loading = false;
          // this.$router.push('/my-ideas');
        }
      } else {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>
