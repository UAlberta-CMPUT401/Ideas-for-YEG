<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <IdeaCard v-bind:isEditable="false" v-bind:ideas="ideas" />
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
    return {
      ideas: this.$store.getters['ideas/getIdeas'],
    };
  },

  async mounted() {
    const response = await this.$axios
      .$post('/graphql', {
        query: `query {
            locations(where: { route: "${this.$route.params.locId}" }) {
              ideas {
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
          };
        });
        console.log(this.ideas);
      } else {
        return {
          ideas: this.$store.getters['ideas/getIdeas'],
        };
      }
    }
  },
};
</script>
