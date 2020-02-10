<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <IdeaCard v-bind:ideas="ideas" />
    </v-flex>
  </v-layout>
</template>

<script>
import IdeaCard from '../../components/IdeaCard';

export default {
  components: {
    IdeaCard,
  },
  data() {
    // TODO: use this.$route.params.locId to get information about the given location
    return {
      ideas: this.$store.getters['ideas/getIdeas'],
    };
  },
};
</script>
