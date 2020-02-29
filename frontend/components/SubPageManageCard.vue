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
      <v-tab v-for="i in 3" :key="i" :href="`#tab-${i}`"> Tab {{ i }} </v-tab>
      <v-tab-item eager v-for="i in 3" :key="i" :value="'tab-' + i">
        <section class="container">
          <div
            class="quill-editor"
            :content="content"
            @change="onEditorChange($event)"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            v-quill:myQuillEditor="editorOption"
          ></div>
        </section>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  props: {
    subpages: {
      pages: {
        type: Array,
        default: () => {
          return [{ title: 'Page 1' }, { title: 'Page 2' }];
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
    onEditorBlur(editor) {
      console.log('editor blur!', editor);
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor);
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor);
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text);
      this.content = html;
    },
    createPage(n) {
      console.log('app init, my quill insrance object is:', this.myQuillEditor);
      /* setTimeout(() => {
        this.content = 'i am changed';
      }, 3000); */
      this.$v.$touch();
      console.log('LOL');
      console.log(n);
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
