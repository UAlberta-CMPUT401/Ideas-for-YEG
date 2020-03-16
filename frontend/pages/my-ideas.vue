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
            <IdeaCard
              v-bind:isEditable="true"
              v-bind:canFollow="false"
              v-bind:ideas="ideas"
              v-on:upvoteOnClick="updateUpvote"
            />
          </v-flex>
        </v-layout>
      </v-tab-item>

      <v-tab href="#tab-2"> Ideas I Volunteer For </v-tab>
      <v-tab-item eager value="tab-2">
        <v-layout column>
          <IdeaCard
            v-bind:isEditable="false"
            v-bind:canFollow="true"
            v-bind:ideas="isVolunteerIdeas"
            v-on:followOnClick="updateFollow"
            v-on:upvoteOnClick="updateUpvote"
          />
        </v-layout>
      </v-tab-item>

      <v-tab href="#tab-3"> Ideas I Follow </v-tab>
      <v-tab-item eager value="tab-3">
        <v-layout column>
          <IdeaCard
            v-bind:isEditable="false"
            v-bind:canFollow="true"
            v-bind:ideas="isFollowingIdeas"
            v-on:followOnClick="updateFollow"
            v-on:upvoteOnClick="updateUpvote"
          />
        </v-layout>
      </v-tab-item>
    </v-tabs>
  </v-layout>
</template>

<script>
import { getJWTCookie } from '../constants/helperFunctions';
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
      isVolunteerIdeas: [],
      isFollowingIdeas: [],
    };
  },

  async mounted() {
    const userJSON = window.localStorage.getItem('userData');
    const userData = JSON.parse(userJSON);
    const config = {
      headers: {
        Authorization: 'Bearer ' + getJWTCookie(),
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
          hasUserUpvoted:
            userData && userData.user && userData.user.id
              ? this.isUpvotedByUser(idea, userData.user.id)
              : false,
        };
      });
    }

    const volunteerResponse = await this.$axios
      .get(`/ideas?volunteers.id=${userData.user.id}`, config)
      .catch((error) => {
        console.log(error);
      });

    if (volunteerResponse) {
      this.isVolunteerIdeas = volunteerResponse.data.map((idea) => {
        return {
          id: idea.id.toString(),
          title: idea.title,
          description: idea.description,
          upvotes: idea.user_upvoters.length,
          ideaCreator: idea.user_creator.username,
          // temporarily use this now as localhost photos are hit/miss
          src: idea.images.length
            ? `${this.$axios.defaults.baseURL}${idea.images[0].url}`
            : DEFAULT_IDEA_IMG_PATH,
          doesUserFollow:
            userData && userData.user && userData.user.id
              ? this.isFollowedByUser(idea, userData.user.id)
              : false,
          hasUserUpvoted:
            userData && userData.user && userData.user.id
              ? this.isUpvotedByUser(idea, userData.user.id)
              : false,
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

    const followingResponse = await this.$axios
      .get(`/ideas?followers.id=${userData.user.id}`, config)
      .catch((error) => {
        console.log(error);
      });

    if (followingResponse) {
      this.isFollowingIdeas = followingResponse.data.map((idea) => {
        return {
          id: idea.id.toString(),
          title: idea.title,
          description: idea.description,
          upvotes: idea.user_upvoters.length,
          ideaCreator: idea.user_creator.username,
          // temporarily use this now as localhost photos are hit/miss
          src: idea.images.length
            ? `${this.$axios.defaults.baseURL}${idea.images[0].url}`
            : DEFAULT_IDEA_IMG_PATH,
          doesUserFollow:
            userData && userData.user && userData.user._id
              ? this.isFollowedByUser(idea, userData.user._id)
              : false,
          hasUserUpvoted:
            userData && userData.user && userData.user.id
              ? this.isUpvotedByUser(idea, userData.user.id)
              : false,
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

  methods: {
    // returns true if user already follows that idea
    isFollowedByUser(idea, userId) {
      for (const followerId of idea.followers) {
        if (followerId === userId) {
          return true;
        }
      }
      return false;
    },

    async updateFollow(idea) {
      const id = idea.id;
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);
      if (!userData) {
        return;
      }

      const config = {
        headers: {
          Authorization: 'Bearer ' + getJWTCookie(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      idea.doesUserFollow = !idea.doesUserFollow;

      const response = await this.$axios
        .$put(`/ideas/follow/${id}`, {}, config)
        .catch((error) => console.log(error));

      if (!response) {
        idea.doesUserFollow = !idea.doesUserFollow;
      }
    },

    isUpvotedByUser(idea, userId) {
      for (const upvoter of idea.user_upvoters) {
        if (upvoter.id === userId) {
          return true;
        }
      }
      return false;
    },

    async updateUpvote(idea) {
      const id = idea.id;

      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);
      if (!userData) {
        return;
      }

      const config = {
        headers: {
          Authorization: 'Bearer ' + getJWTCookie(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      this.updateIdeaUpvoteList(idea);

      const response = await this.$axios
        .$put(`/ideas/upvote/${id}`, {}, config)
        .catch((error) => console.log(error));

      // undo upvoting if API fails
      if (!response) {
        this.updateIdeaUpvoteList(idea);
      }
    },

    updateIdeaUpvoteList(idea) {
      const index = this.ideas.findIndex((element) => element.id === idea.id);
      const volunteerIndex = this.isVolunteerIdeas.findIndex(
        (element) => element.id === idea.id,
      );
      const followerIndex = this.isFollowingIdeas.findIndex(
        (element) => element.id === idea.id,
      );

      if (index > -1) {
        this.ideas[index].hasUserUpvoted
          ? this.ideas[index].upvotes--
          : this.ideas[index].upvotes++;

        this.ideas[index] = {
          ...this.ideas[index],
          hasUserUpvoted: !this.ideas[index].hasUserUpvoted,
        };
        this.ideas.splice();
      }

      if (volunteerIndex > -1) {
        this.isVolunteerIdeas[volunteerIndex].hasUserUpvoted
          ? this.isVolunteerIdeas[volunteerIndex].upvotes--
          : this.isVolunteerIdeas[volunteerIndex].upvotes++;

        this.isVolunteerIdeas[volunteerIndex] = {
          ...this.isVolunteerIdeas[volunteerIndex],
          hasUserUpvoted: !this.isVolunteerIdeas[volunteerIndex].hasUserUpvoted,
        };
        this.isVolunteerIdeas.splice();
      }

      if (followerIndex > -1) {
        this.isFollowingIdeas[followerIndex].hasUserUpvoted
          ? this.isFollowingIdeas[followerIndex].upvotes--
          : this.isFollowingIdeas[followerIndex].upvotes++;

        this.isFollowingIdeas[followerIndex] = {
          ...this.isFollowingIdeas[followerIndex],
          hasUserUpvoted: !this.isFollowingIdeas[followerIndex].hasUserUpvoted,
        };
        this.isFollowingIdeas.splice();
      }
    },
  },
};
</script>
