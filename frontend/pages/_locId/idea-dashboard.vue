<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <IdeaCard v-bind:ideas="ideas" />
    </v-flex>
  </v-layout>
</template>

<script>
/*
  Code used by looking at the following code snippet: https://codesandbox.io/s/github/nuxt/nuxt.js/tree/dev/examples/custom-routes?from-embed
 */
import IdeaCard from '../../components/IdeaCard';

export default {
  components: {
    IdeaCard,
  },
  data() {
    console.log(this.$route.params.locId);
    return {
      ideas: this.$store.getters['ideas/getIdeas'],
    };
  },
};
</script>
