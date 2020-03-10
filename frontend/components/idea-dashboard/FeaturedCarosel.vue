<template>
  <v-container v-if="hasFeatured" fluid>
    <v-row justify="center">
      <h2>Featured</h2>
      <v-carousel cycle height="400" hide-delimiters show-arrows-on-hover>
        <v-carousel-item v-for="(featIdea, i) in ideas" :key="i">
          <v-img
            :src="featIdea.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400"
            v-on:click="onClick(featIdea.id, featIdea.slug)"
            style="cursor: pointer"
          >
            <v-card-title v-text="featIdea.title"></v-card-title>
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </v-row>
  </v-container>
</template>

<script>
import {
  DEFAULT_IDEA_IMG_PATH,
  DEFAULT_AVATAR_IMG_PATH,
} from '../../constants/constants';

/**
 * Template Credits: https://vuetifyjs.com/en/components/cards
 * MIT License
 * https://github.com/vuetifyjs/vuetify
 */
export default {
  props: {
    route: String,
  },
  data() {
    return {
      searchTerm: '',
      hasFeatured: false,
      isLoading: false,
      ideas: this.$store.getters['ideas/getIdeas'],
    };
  },

  async mounted() {
    await this.search();
  },

  methods: {
    async search() {
      this.isLoading = true;
      // If the search field is filled, add a search condition to search on a term
      const response = await this.$axios
        .$post('/graphql', {
          query: `query {
          locations(where: { route: "${this.$route.params.locId}"}) {
            ideas(where: {featured: true}) {
              id
              title
              description
              volunteers {
                username
              }
              images {
                url
              }
              user_creator {
                username
                avatar {
                  url
                }
              }
              user_upvoters {
                username
              }
              followers {
                username
              }
              slug
              featured
            }
          }
        }
        `,
        })
        .catch((err) => {
          console.log(err);
        });

      /**
       * default user avatar photo: https://medium.com/insider-coub/default-avatars-4275c0e41f62
       * coolidea photo: Photo by Ameen Fahmy on Unsplash https://unsplash.com/photos/_gEKtyIbRSM
       *
       * clear previous ideas
       */
      this.ideas = [];
      if (response) {
        if (response.data.locations[0].ideas.length > 0) {
          this.ideas = response.data.locations[0].ideas.map((idea) => {
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
              volunteers: idea.volunteers.length,
              // TODO fix API to return donated amount
              amountReceived: 100,
              followers: idea.followers.length,
              // temporarily use this now as localhost photos are hit/miss
              user_avatar: idea.user_creator.avatar
                ? `${this.$axios.defaults.baseURL}${idea.user_creator.avatar.url}`
                : DEFAULT_AVATAR_IMG_PATH,
              slug: idea.slug,
            };
          });
        }
      }
      if (this.ideas.length > 0) {
        this.hasFeatured = true;
      }
      this.isLoading = false;
    },
    onClick(id) {
      this.$router.push({
        path: `/${this.$props.route}/ideas/${id}`,
      });
    },
  },
};
</script>

<style scoped>
.btnSpacing {
  padding: 0 6px;
}
</style>
