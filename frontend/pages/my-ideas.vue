<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-btn href="/manage-idea" class="ma-2" outlined color="indigo"
        >Create an Idea</v-btn
      >
      <IdeaCard isEditable v-bind:ideas="ideas" />
    </v-flex>
  </v-layout>
</template>
<script>
import IdeaCard from '../components/idea-dashboard/IdeaCard';

export default {
  components: {
    IdeaCard,
  },

  data() {
    return {
      ideas: this.$store.getters['ideas/getIdeas'],
      currentUser: this.$store.getters['users/getUser'],
    };
  },

  async mounted() {
    const userJSON = window.localStorage.getItem('userData');
    const userData = JSON.parse(userJSON);
    const config = {
      headers: {
        Authorization: 'Bearer ' + userData.jwt,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const userResponse = await this.$axios
      .get(`/users/${userData.user.id}`, config)
      .catch((error) => {
        console.log(error);
      });

    if (userResponse) {
      this.ideas = userResponse.data.ideas.map((idea) => {
        return {
          id: idea.id.toString(),
          title: idea.title,
          description: idea.description,
          upvotes: idea.user_upvoters.length,
          ideaCreator: userResponse.data.username,
          // temporarily use this now as localhost photos are hit/miss
          src: idea.images.length
            ? `http://localhost:1337${idea.images[0].url}`
            : 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
          volunteers: idea.volunteers.length,
          // TODO fix API to return donated amount
          amountReceived: 100,
          followers: idea.followers.length,
          // temporarily use this now as localhost photos are hit/miss
          user_avatar: userResponse.data.avatar
            ? `http://localhost:1337${userResponse.data.avatar.url}`
            : 'https://www.everypixel.com/image-638397625280524203.jpg',
          slug: idea.slug,
          location: idea.location,
          featured: idea.featured,
        };
      });
    }
  },
};
</script>
