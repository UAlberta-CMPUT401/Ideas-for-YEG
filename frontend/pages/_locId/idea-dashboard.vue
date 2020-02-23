<template>
  <v-container align="center" justify="center">
    <v-row align="center" justify="center">
      <v-col justify="center" cols="12" sm="9" md="9" lg="8" xl="6">
        <v-form ref="form" class="my-3">
          <v-text-field
            @click:append="search"
            v-on:keydown.enter.prevent="search"
            v-model="searchTerm"
            :loading="isLoading"
            append-icon="mdi-magnify"
            name="searchTerm"
            label="Search"
          ></v-text-field>
        </v-form>
        <IdeaCard v-bind:ideas="ideas" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import IdeaCard from '../../components/IdeaCard';

export default {
  components: {
    IdeaCard,
  },

  data() {
    return {
      searchTerm: '',
      isLoading: false,
      ideas: this.$store.getters['ideas/getIdeas'],
    };
  },
  // computed: {
  //   return this.searchTerm
  // },
  async mounted() {
    await this.search();
  },
  methods: {
    async search() {
      this.isLoading = true;
      // If the search field is filled, add a search condition to search on a term
      let descSearchCond = '';
      if (this.searchTerm.length > 0) {
        descSearchCond = `description_contains:"${this.searchTerm}"`;
      }
      const response = await this.$axios
        .$post('/graphql', {
          query: `query {
            locations(where: { route: "${this.$route.params.locId}"}) {
              ideas(where: {${descSearchCond}}) {
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
              }
            }
          }
          `,
        })
        .catch((err) => {
          console.log(err);
        });
      /**
       * default user avatar photo: https://www.everypixel.com/image-638397625280524203
       * coolidea photo: Photo by Ameen Fahmy on Unsplash https://unsplash.com/photos/_gEKtyIbRSM
       */
      // Clear previous ideas
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
                ? `http://localhost:1337${idea.images[0].url}`
                : 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
              volunteers: idea.volunteers.length,
              // TODO fix API to return donated amount
              amountReceived: 100,
              followers: idea.followers.length,
              // temporarily use this now as localhost photos are hit/miss
              user_avatar: idea.user_creator.avatar
                ? `http://localhost:1337${idea.user_creator.avatar.url}`
                : 'https://www.everypixel.com/image-638397625280524203.jpg',
              slug: idea.slug,
            };
          });
        }
      }
      this.isLoading = false;
    },
  },
};
</script>
