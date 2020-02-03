<template>
  <v-card class="mx-auto">
    <v-container fluid>
      <v-row>
        <v-col v-for="idea in ideas" :key="idea.title" :cols="idea.flex">
          <v-card elevation="12">
            <v-img
              :src="idea.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="idea.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
};
</script>
