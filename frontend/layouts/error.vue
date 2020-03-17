<template>
  <v-app>
    <v-container fill-height>
      <v-layout row wrap align-center>
        <v-flex class="text-xs-center">
          <v-card class="mx-auto" max-width="350" elevation="12">
            <v-card-title color="primary">
              <h1 v-if="error.statusCode === 404">
                {{ pageNotFound }}
              </h1>
              <h1 v-else>
                {{ otherError }}
              </h1>
            </v-card-title>

            <v-card-text>
              Look's like something went wrong. No worries! Just click the
              button below to go back to the home page.
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <NuxtLink to="/">
                <v-btn class="ma-2" color="primary">Home Page</v-btn>
              </NuxtLink>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
