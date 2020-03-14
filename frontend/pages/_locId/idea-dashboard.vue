<template>
  <v-container align="center" justify="center">
    <v-row align="center" justify="center">
      <v-col
        align="center"
        justify="center"
        cols="12"
        sm="9"
        md="9"
        lg="8"
        xl="6"
      >
        <FeaturedCarousel v-bind:route="this.$route.params.locId" />
        <v-form ref="form" class="my-3">
          <v-text-field
            @click:append="search"
            v-on:keyup="debounceSearch"
            v-on:keydown.enter.prevent="search"
            rounded="true"
            outlined="true"
            solo="true"
            flat="true"
            v-model="searchTerm"
            :loading="isLoading"
            append-icon="mdi-magnify"
            name="searchTerm"
            label="Search"
          ></v-text-field>
          <v-select
            v-on:input="search"
            v-model="sortSelected"
            :items="sortItems"
            item-text="label"
            item-value="sortBy"
            label="Sort by"
          ></v-select>
        </v-form>
        <IdeaCard
          v-bind:isEditable="false"
          v-bind:ideas="ideas"
          v-on:upvoteOnClick="updateUpvote"
        />
        <v-progress-circular
          v-if="isLoading"
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <h2 v-if="noInitialResults">
          No Ideas have been found for the given search term. Maybe try creating
          a new idea?
        </h2>
        <h2 v-if="noOtherResults">No other results</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'lodash';
import IdeaCard from '../../components/idea-dashboard/IdeaCard';
import FeaturedCarousel from '../../components/idea-dashboard/FeaturedCarousel';
import {
  DEFAULT_IDEA_IMG_PATH,
  DEFAULT_AVATAR_IMG_PATH,
} from '../../constants/constants';

// ms before typing the in input field triggers a search
const DEBOUNCE_DELAY = 650;
// limit of results to come back
// NOTE: currently extremely small for the sake of demoing MVP, should be a larger number (~10-20)
const RESULT_LIMIT = 2;

export default {
  components: {
    IdeaCard,
    FeaturedCarousel,
  },

  data() {
    return {
      searchTerm: '',
      isLoading: false,
      ideas: this.$store.getters['ideas/getIdeas'],
      sortItems: [
        { label: 'New', sortBy: 'New' },
        { label: 'Top Voted', sortBy: 'Top' },
      ],
      sortSelected: 'New',
      // Amount of entries needed to skipped when loading new results. Returns to zero on clear
      skipCount: 0,
      // If no results are found when trying to load more results via scroll
      noOtherResults: false,
      // If no results were found to begin with
      noInitialResults: false,
    };
  },

  async mounted() {
    await this.search();
    this.scroll();
  },

  methods: {
    // Search after debouncing input. Prevents an excessive amount of requests
    debounceSearch: _.debounce(function() {
      this.search();
    }, DEBOUNCE_DELAY),

    // Search for given results. Clear is true if results are to be cleared before load
    async search(clear = true) {
      this.isLoading = true;
      this.noInitialResults = false;
      this.noOtherResults = false;

      // Clear previous ideas, set the amount to skip by to 0
      if (clear) {
        this.ideas = [];
        this.skipCount = 0;
      }

      // If the search field is filled, add a search condition to search on a term
      const params = {
        locId: this.$route.params.locId,
        limit: RESULT_LIMIT,
        skip: this.skipCount,
      };
      if (this.searchTerm.length > 0) {
        params.searchTerm = this.searchTerm;
      }
      if (this.sortSelected) {
        params.sortBy = this.sortSelected;
      }

      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);

      const response = await this.$axios
        .$get('/ideas/search', {
          params,
        })
        .catch((err) => {
          console.log(err);
        });

      /**
       * default user avatar photo: https://medium.com/insider-coub/default-avatars-4275c0e41f62
       * coolidea photo: Photo by Ameen Fahmy on Unsplash https://unsplash.com/photos/_gEKtyIbRSM
       * edmonton skyline https://www.forbes.com/sites/sandramacgregor/2020/01/09/discover-why-edmonton-is-one-of-canadas-hottest-destinations/
       */
      if (response) {
        if (response.length > 0) {
          const ideaResults = response.map((idea, index) => {
            // TODO fix ideacreator and user avatar since API only returns ID
            return {
              id: idea.id.toString(),
              title: idea.title,
              description: idea.description,
              upvotes: idea.upvote_count,
              hasUserUpvoted:
                userData && userData.user && userData.user._id
                  ? this.isUpvotedByUser(idea, userData.user._id)
                  : false,
              ideaCreator: idea.user_creator.username,
              src: idea.images.length
                ? `${this.$axios.defaults.baseURL}${idea.images[0].url}`
                : DEFAULT_IDEA_IMG_PATH,
              volunteers: idea.volunteers.length,
              // TODO fix API to return donated amount
              amountReceived: 100,
              followers: idea.followers.length,
              user_avatar: idea.user_creator.avatar
                ? `${this.$axios.defaults.baseURL}${idea.user_creator.avatar.url}`
                : DEFAULT_AVATAR_IMG_PATH,
              slug: idea.slug,
              featured: idea.featured,
              index,
            };
          });
          if (clear) {
            this.ideas = ideaResults;
            this.skipCount = ideaResults.length;
          } else {
            this.ideas.push(...ideaResults);
            // Add amount of entries needed to skip
            this.skipCount += ideaResults.length;
          }
        } else if (response.length === 0 && !clear) {
          this.noOtherResults = true;
        } else if (response.length === 0 && clear) {
          this.noInitialResults = true;
        }
      }
      this.isLoading = false;
    },

    isUpvotedByUser(idea, userId) {
      for (const upvoterId of idea.user_upvoters) {
        if (upvoterId === userId) {
          return true;
        }
      }
      return false;
    },

    async updateUpvote(idea) {
      const id = idea.id;
      const index = this.ideas.indexOf(idea);

      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);
      if (!userData) {
        return;
      }

      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.jwt,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      this.ideas[index].hasUserUpvoted
        ? this.ideas[index].upvotes--
        : this.ideas[index].upvotes++;

      this.ideas[index] = {
        ...this.ideas[index],
        hasUserUpvoted: !this.ideas[index].hasUserUpvoted,
      };
      this.ideas.splice();

      const response = await this.$axios
        .$put(`/ideas/upvote/${id}`, {}, config)
        .catch((error) => console.log(error));

      // undo upvoting if API fails
      if (!response) {
        this.ideas[index].hasUserUpvoted
          ? this.ideas[index].upvotes--
          : this.ideas[index].upvotes++;

        this.ideas[index] = {
          ...this.ideas[index],
          hasUserUpvoted: !this.ideas[index].hasUserUpvoted,
        };
        this.ideas.splice();
      }
    },

    // Create listener that loads more results on scroll
    // https://alligator.io/vuejs/implementing-infinite-scroll/
    scroll() {
      const self = this;
      window.onscroll = function() {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        // Only run if the user has got to the bottom of the window and if there are still results to load
        if (
          bottomOfWindow &&
          !self.noOtherResults &&
          !self.noInitialResults &&
          !self.isLoading
        ) {
          self.search.bind(self);
          self.search(false);
        }
      };
    },
  },
};
</script>
