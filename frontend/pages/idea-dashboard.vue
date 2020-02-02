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
      ideas: [
        {
          title: 'Yoga Sessions',
          src:
            'https://iso.500px.com/wp-content/uploads/2015/10/500px-wallpaper-desktop1-3000x2000.jpg',
          flex: 12,
        },
        {
          title: 'Crypto Startup Idea',
          src:
            'https://user-images.githubusercontent.com/39191/29881985-95cf06b8-8d60-11e7-87b1-9131b7322c12.png',
          flex: 12,
        },
        {
          title: 'Travel Across YEG',
          src:
            'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2016/09/500px-raw-lead-fstoppers_0.jpg',
          flex: 12,
        },
      ],
    };
  },
};
</script>
