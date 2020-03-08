<template>
  <v-layout column>
    <v-card class="mx-auto" color="#26c6da" dark max-width="700">
      <v-card-title>
        <v-icon large left>
          mdi-account-circle-outline
        </v-icon>
        <span class="title font-weight-light">My Profile</span>
      </v-card-title>
    </v-card>

    <h2>{{ volSectionTitle }}</h2>

    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <MiniIdeaCard v-bind:ideas="isVolunteerideas" />
      </v-expansion-panel>
    </v-expansion-panels>
  </v-layout>
</template>
<script>
import MiniIdeaCard from '../components/idea-dashboard/MiniIdeaCard';

export default {
  components: {
    MiniIdeaCard,
  },
  data() {
    return {
      volSectionTitle: 'Ideas I am a volunteer for:',
      title: '',
      ideas: this.$store.getters['ideas/getIdeas'],
      currentUser: this.$store.getters['users/getUser'],
      isVolunteerideas: [],
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
      .get(`/ideas`, config)
      .catch((error) => {
        console.log(error);
      });

    if (userResponse) {
      this.ideas = userResponse.data.map((idea, index) => {
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
          volunteers: idea.volunteers,
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

      // filter for ideas current user volunteers in
      for (const idea in this.ideas) {
        for (const volunteer in this.ideas[idea].volunteers) {
          if (
            this.ideas[idea].volunteers[volunteer].username ===
            userData.user.username
          ) {
            this.isVolunteerideas.push(this.ideas[idea]);
          }
        }
      }
    }
  },
};
</script>
