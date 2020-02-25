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

          <v-col cols="12" sm="6">
            <v-select
              v-model="form.status"
              :items="status"
              color="pink"
              label="Idea Status"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="form.locations"
              :items="locations"
              color="pink"
              label="Idea Location"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="form.categories"
              :items="categories"
              color="pink"
              label="Category"
              required
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-textarea v-model="form.description" color="teal">
              <template v-slot:label>
                <div>Description</div>
              </template>
            </v-textarea>
          </v-col>

          <v-combobox
            v-model="tags"
            :items="oldTags"
            tags
            clearable
            label="Enter tags related to your idea"
            multiple
            solo
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="remove(item)"
              >
                <strong>{{ item }}</strong
                >&nbsp;
              </v-chip>
            </template>
          </v-combobox>

          <v-col cols="12">
            <v-row>
              <template>
                <v-file-input
                  label="Upload a profile photo for this idea"
                  filled
                  prepend-icon="mdi-camera"
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
              <v-btn @click="dialog = false" color="red" text>
                Delete
              </v-btn>
              <v-btn @click="dialog = false" color="green darken-1" text>
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
      status: ['Ongoing', 'Seeking Help', 'Completed'],
      locations: [
        'yeg',
        'yyc',
        'nyc',
        'lax',
        'yxy',
        'yxh',
        'yxu',
        'yyt',
        'yyz',
        'yyj',
        'yyd',
        'yum',
      ],
      categories: ['animals', 'sports', 'winter'],
      tags: ['create new tags here', 'Programming'],
      oldTags: ['existing tags here', 'fundraiser'],
      snackbar: false,
      defaultForm,
    };
  },

  methods: {
    submit() {
      this.snackbar = true;
      console.log(this.title, this.description);
    },
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
      this.tags = [...this.tags];
    },
  },
};
</script>
