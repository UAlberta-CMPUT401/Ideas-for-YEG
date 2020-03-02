<template>
  <v-container fluid>
    <v-card-title align-center>
      Page Management
    </v-card-title>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add New Page To Location</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">New Page Name</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col sm="12" md="8">
                <v-text-field
                  label="Page Name*"
                  required
                  :value="newNameInput"
                  @change="newNameInput = $event"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="createPage(newNameInput), (dialog = false)"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-tabs vertical>
      <v-tab v-for="i in subpages.pages" :key="i.title" :href="`#${i.title}`">
        {{ i.title }} Page
      </v-tab>
      <v-tab-item
        eager
        v-for="i in subpages.pages"
        :key="i.title"
        :value="i.title"
      >
        <editor
          v-model="i.content"
          v-bind:pageTitle="i.title"
          v-bind:pageId="i.id"
        ></editor>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import editor from './MarkdownEditor';
export default {
  components: {
    editor,
  },
  props: {
    subpages: {
      pages: {
        type: Array,
        default: () => {
          return [{ title: 'Page 1', content: '' }];
        },
      },
    },
    currentPage: {
      type: Object,
      default: () => {
        return { title: 'Default' };
      },
    },
    dialog: {
      type: Boolean,
      default: false,
    },
    newNameInput: {
      type: String,
      default: 'Default',
    },
    content: {
      type: String,
      default: '<p>I am Example</p>',
    },
    editorOption: {
      // Markdown editor configuration
      type: Object,
      default: () => {
        return {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
            ],
          },
        };
      },
    },
  },
  methods: {
    async createPage(n) {
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);
      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.jwt,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const addPageRequest = {
        title: n,
        content: '',
        location: this.subpages.pages[0].location.id,
      };
      let response = null;
      response = await this.$axios
        .$post('/sub-pages', addPageRequest, config)
        .catch((error) => {
          console.log(error);
        });

      if (response) {
        window.location.reload();
      }
    },
  },
};
</script>
