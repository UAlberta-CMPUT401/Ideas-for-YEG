<template>
  <section class="container">
    <div
      ref="editor"
      class="quill-editor"
      @change="onEditorChange($event)"
      v-quill:myQuillEditor="editorOption"
    ></div>
    <v-dialog v-model="editNameDialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn justify="center" color="primary" dark v-on="on"
          >Change Page Name</v-btn
        >
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Change Page: '{{ pageTitle }}' To:</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col sm="12" md="8">
                <v-text-field
                  label="Page Name*"
                  required
                  :value="currentNameValue"
                  @change="currentNameValue = $event"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editNameDialog = false"
            >Close</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="changePageName(currentNameValue), (editNameDialog = false)"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ConfirmDeleteDialog
      v-bind:contentType="`1`"
      v-on:childToParent="deleteContent()"
      v-bind:buttonLabel="`Delete Page`"
    />
    <v-btn color="primary" dark @click="saveContent()">
      Save Changes
    </v-btn>
  </section>
</template>

<script>
import { getJWTCookie } from '../constants/helperFunctions';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
export default {
  data() {
    return {
      currentNameValue: '',
      editNameDialog: false,
    };
  },
  components: {
    ConfirmDeleteDialog,
  },
  props: {
    pageTitle: {
      type: String,
      default: '',
    },
    pageId: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    editorOption: {
      // Markdown editor configuration
      type: Object,
      default: () => {
        return {
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, 4, false] }],
              [
                'bold',
                'italic',
                'underline',
                'strike',
                { list: 'ordered' },
                { list: 'bullet' },
              ],
              ['code-block', 'image', 'link', 'blockquote'],
            ],
          },
        };
      },
    },
  },
  mounted() {
    const md = require('markdown-it')();
    md.set({
      html: true,
    });

    const result = md.render(this.value);
    if (this.myQuillEditor)
      this.myQuillEditor.clipboard.dangerouslyPasteHTML(result + '\n');
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    async changePageName(n) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + getJWTCookie(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const editPageRequest = {
        title: n,
      };
      let response = null;
      response = await this.$axios
        .$put(`/sub-pages/${this.pageId}`, editPageRequest, config)
        .catch((error) => {
          console.log(error);
        });
      if (response) {
        window.location.reload();
      }
    },
    async saveContent() {
      const TurndownService = require('turndown').default;
      const turndownService = new TurndownService({
        headingStyle: 'atx',
        bulletListMarker: '-',
      });
      const markdown = turndownService.turndown(this.content);
      const config = {
        headers: {
          Authorization: 'Bearer ' + getJWTCookie(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const addPageRequest = {
        content: markdown,
      };
      await this.$axios
        .$put(`/sub-pages/${this.pageId}`, addPageRequest, config)
        .catch((error) => {
          console.log(error);
        });
    },

    async deleteContent() {
      const config = {
        headers: {
          Authorization: 'Bearer ' + getJWTCookie(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      let response = null;
      response = await this.$axios
        .$delete(`/sub-pages/${this.pageId}`, config)
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

<style lang="scss" scoped>
.quill-editor {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
