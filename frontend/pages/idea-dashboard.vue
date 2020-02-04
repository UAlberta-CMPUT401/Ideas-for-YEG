<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <IdeaCard v-bind:ideas="ideas" />
    </v-flex>
  </v-layout>
</template>

<script>
import IdeaCard from '../components/IdeaCard';

export default {
  components: {
    IdeaCard,
  },

  data() {
    return {
      ideas: this.$store.getters['ideas/getIdeas'],
    };
  },
};
</script>
