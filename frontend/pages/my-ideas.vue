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

      <v-tab href="#tab-2"> Ideas I Volunteer For </v-tab>

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
import {
  DEFAULT_IDEA_IMG_PATH,
  DEFAULT_AVATAR_IMG_PATH,
} from '../constants/constants';

export default {
  components: {
    IdeaCard,
  },

  data() {
    return {
      ideas: [],
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
          src: idea.images.length
            ? `${this.$axios.defaults.baseURL}${idea.images[0].url}`
            : DEFAULT_IDEA_IMG_PATH,
          volunteerInfo: idea.volunteers,
          volunteers: idea.volunteers.length,
          // TODO fix API to return donated amount
          amountReceived: 100,
          followers: idea.followers.length,
          // temporarily use this now as localhost photos are hit/miss
          user_avatar: idea.user_creator.avatar
            ? `${this.$axios.defaults.baseURL}${idea.user_creator.avatar.url}`
            : DEFAULT_AVATAR_IMG_PATH,
          slug: idea.slug,
          location: idea.location,
          featured: idea.featured,
        };
      });
    }

    const volunteerResponse = await this.$axios
      .get(`/ideas?volunteers.id=${userData.user.id}`, config)
      .catch((error) => {
        console.log(error);
      });

    if (volunteerResponse) {
      this.isVolunteerideas = volunteerResponse.data.map((idea) => {
        return {
          id: idea.id.toString(),
          title: idea.title,
          description: idea.description,
          upvotes: idea.user_upvoters.length,
          ideaCreator: volunteerResponse.data.username,
          // temporarily use this now as localhost photos are hit/miss
          src: idea.images.length
            ? `${this.$axios.defaults.baseURL}${idea.images[0].url}`
            : DEFAULT_IDEA_IMG_PATH,
          volunteerInfo: idea.volunteers,
          volunteers: idea.volunteers.length,
          // TODO fix API to return donated amount
          amountReceived: 100,
          followers: idea.followers.length,
          // temporarily use this now as localhost photos are hit/miss
          user_avatar: idea.user_creator.avatar
            ? `${this.$axios.defaults.baseURL}${idea.user_creator.avatar.url}`
            : DEFAULT_AVATAR_IMG_PATH,
          slug: idea.slug,
          location: idea.location,
          featured: idea.featured,
        };
      });
    }
  },
};
</script>
