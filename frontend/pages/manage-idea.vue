<template>
  <v-card flat>
    <v-snackbar v-model="success" absolute top right color="success">
      <span>Idea created!</span>
    </v-snackbar>
    <v-snackbar v-model="error" absolute top right color="error">
      <span
        >An error occurred while trying to create/update the idea. Please try
        again.</span
      >
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
                @change="clearSelectedCategory"
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
            <v-select
              v-model="selectedCategories"
              :items="allLocationsWithCategories[selectedLocation]"
              label="Categories"
            ></v-select>
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
                  @change="fileOnClick"
                ></v-file-input>
              </template>
            </v-row>
          </v-col>
        </v-row>

        <v-row justify="center" align="center">
          <v-col cols="12" sm="9">
            <v-carousel
              v-if="savedImages.length > 0"
              height="600"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item v-for="(image, i) in savedImages" :key="i">
                <div justify="right" align="right">
                  <v-btn text class="pa-0" @click="imageDeleteOnClick(i)">
                    <v-icon color="black">mdi-delete-circle</v-icon>
                  </v-btn>
                </div>
                <v-sheet height="100%">
                  <v-row class="fill-height" align="center" justify="center">
                    <v-img :src="`http://localhost:1337/${image.url}`"></v-img>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>

        <v-row>
          <template>
            <AddIdeaAdmin />
          </template>
          <template v-if="ideaId">
            <IdeaCreatorUpdate />
          </template>
          <template>
            <CreateHonorarium />
          </template>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn v-if="ideaId" @click.stop="deleteDialog = true" text
          >Delete</v-btn
        >
        <v-dialog v-model="deleteDialog" max-width="290">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this idea?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="deleteDialog = false" color="green darken-1" text>
                Cancel
              </v-btn>
              <v-btn @click="onDeleteIdea" color="red" text>
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
      deleteDialog: false,
      status: ['Ongoing', 'SeekingHelp', 'Completed'],
      locations: [],
      categories: [],
      success: false,
      selectedLocation: '',
      selectedStatus: '',
      allLocationsWithCategories: {},
      selectedCategories: '',
      images: [],
      loading: false,
      error: false,
      requiredFieldRules: [(v) => v.length >= 1 || `Field is required`],
      locationIds: [],
      ideaId: '',
      savedImages: [],
    };
  },

  created() {
    if (this.$route.query && this.$route.query.id) {
      this.ideaId = this.$route.query.id;
    }
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

    if (this.ideaId) {
      const ideaResponse = await this.$axios
        .$get(`/ideas/${this.ideaId}`)
        .catch((err) => console.log(err));

      if (ideaResponse) {
        this.selectedLocation = ideaResponse.location.id;
        this.selectedCategories =
          ideaResponse.categories.length > 0
            ? ideaResponse.categories[0].name
            : '';
        this.title = ideaResponse.title;
        this.description = ideaResponse.description;
        this.selectedStatus = ideaResponse.status;
        this.savedImages = ideaResponse.images;
      } else {
        this.error = true;
      }
    }
  },

  methods: {
    async fileOnClick(event) {
      const formData = new FormData();

      this.images.forEach((file) => {
        formData.append(`files`, file, file.name);
      });

      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);

      const imageResponse = await this.$axios
        .$post('/upload', formData, {
          headers: {
            Authorization: 'Bearer ' + userData.jwt,
            'Content-Type': 'multipart/form-data',
          },
        })
        .catch((error) => {
          console.log(error);
        });

      if (imageResponse) {
        imageResponse.forEach((image) => {
          this.savedImages.push({
            id: image.id,
            url: image.url,
            name: image.name,
          });
        });
      }
    },

    clearSelectedCategory() {
      if (
        !(
          this.selectedCategories &&
          this.allLocationsWithCategories[this.selectedLocation].includes(
            this.selectedCategories,
          )
        )
      ) {
        this.selectedCategories = '';
      }
    },

    async onDeleteIdea() {
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);
      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.jwt,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      await this.$axios
        .$delete(`/ideas/${this.ideaId}`, config)
        .catch((error) => {
          console.log(error);
        });

      this.deleteDialog = false;
      this.$router.push('/my-ideas');
    },

    async imageDeleteOnClick(index) {
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);
      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.jwt,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const imageToDelete = this.savedImages[index];

      const deleteImageResponse = await this.$axios
        .$delete(`/upload/files/${imageToDelete.id}`, config)
        .catch((error) => {
          console.log(error);
        });

      if (deleteImageResponse) {
        this.savedImages.splice(index, 1);

        // delete the first image found in the file uploader if it exists
        for (let i = 0; i < this.images.length; i++) {
          if (this.images[i].name === imageToDelete.name) {
            this.images.splice(i, 1);
            break;
          }
        }
      }
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

      const ideaRequest = {
        title: this.title,
        description: this.description,
        status: this.selectedStatus,
        location: this.selectedLocation,
        categories: this.selectedCategories
          ? [
              {
                name: this.selectedCategories,
              },
            ]
          : [],
        slug: this.title,
        user_creator: userData.user.id,
        images: this.savedImages.map((image) => {
          return image.id;
        }),
      };

      let response = null;
      if (!this.ideaId) {
        // TODO add honorarium, add idea admins, send project updates later
        response = await this.$axios
          .$post('/ideas', ideaRequest, config)
          .catch((error) => {
            console.log(error);
            this.error = true;
            this.loading = false;
          });
      } else {
        response = await this.$axios
          .$put(`/ideas/${this.ideaId}`, ideaRequest, config)
          .catch((error) => {
            console.log(error);
            this.error = true;
            this.loading = false;
          });
      }

      if (response) {
        this.success = true;
        this.loading = false;
        this.$router.push('/my-ideas');
      } else {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>
