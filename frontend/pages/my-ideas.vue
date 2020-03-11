<template>
  <v-layout column justify-center align-center>
    <v-tabs centered>
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1"> My Ideas </v-tab>
      <v-tab-item eager value="tab-1">
        <v-layout column justify-center align-center>
          <v-flex xs12 sm8 md6>
            <v-btn href="/manage-idea" class="ma-2" outlined color="indigo"
              >Create an Idea</v-btn
            >
            <IdeaCard v-bind:isEditable="true" v-bind:ideas="ideas" />
          </v-flex>
        </v-layout>
      </v-tab-item>

      <v-tab href="#tab-2"> Ideas I volunteer in </v-tab>

      <v-tab-item eager value="tab-2">
        <v-layout column>
          <IdeaCard v-bind:isEditable="false" v-bind:ideas="isVolunteerideas" />
        </v-layout>
      </v-tab-item>
    </v-tabs>
  </v-layout>
</template>

<script>
import IdeaCard from '../components/idea-dashboard/IdeaCard';
// import MiniIdeaCard from '../components/idea-dashboard/MiniIdeaCard';

export default {
  components: {
    IdeaCard,
  },

  data() {
    return {
      ideas: this.$store.getters['ideas/getIdeas'],
      currentUser: this.$store.getters['users/getUser'],
      title: '',
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
          volunteerInfo: idea.volunteers,
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

      // filter for ideas current user volunteers in
      for (const idea in this.ideas) {
        for (const volunteer in this.ideas[idea].volunteerInfo) {
          if (
            this.ideas[idea].volunteerInfo[volunteer].username ===
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
