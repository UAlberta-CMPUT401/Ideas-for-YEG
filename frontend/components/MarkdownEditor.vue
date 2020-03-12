<template>
  <section class="container">
    <div
      ref="editor"
      class="quill-editor"
      @change="onEditorChange($event)"
      v-quill:myQuillEditor="editorOption"
    ></div>
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
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
export default {
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
    async saveContent() {
      const TurndownService = require('turndown').default;
      const turndownService = new TurndownService({
        headingStyle: 'atx',
        bulletListMarker: '-',
      });
      const markdown = turndownService.turndown(this.content);
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
        content: markdown,
      };
      await this.$axios
        .$put(`/sub-pages/${this.pageId}`, addPageRequest, config)
        .catch((error) => {
          console.log(error);
        });
    },

    async deleteContent() {
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);
      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.jwt,
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
