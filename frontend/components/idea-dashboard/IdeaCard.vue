<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col v-for="idea in ideas" :key="idea.title" justify="center">
        <v-card
          d-flex
          justify-center
          class="mx-auto"
          max-width="700"
          elevation="7"
          raised
          color="grey lighten-5"
          v-on:click="onClick(idea.id, idea.slug, idea.location)"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline text-sm-left">{{
                idea.title
              }}</v-list-item-title>
            </v-list-item-content>

            <v-spacer></v-spacer>

            <div v-if="isEditable">
              <v-btn
                :href="`/manage-idea?id=${idea.slug}`"
                text
                class="pa-0 btnSpacing"
              >
                <v-icon>mdi-lead-pencil</v-icon>
              </v-btn>
            </div>

            <div v-if="canFollow">
              <v-btn
                v-if="idea.doesUserFollow"
                color="blue"
                text
                id="following"
                class="pa-0 btnSpacing"
                v-on:click.stop="$emit('followOnClick', idea)"
              >
                Following
              </v-btn>
              <v-btn
                v-else
                color="grey darken-3"
                text
                id="follow"
                class="pa-0 btnSpacing"
                v-on:click.stop="$emit('followOnClick', idea)"
              >
                Follow
              </v-btn>
            </div>
          </v-list-item>
          <v-img
            :src="idea.src"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
          </v-img>

          <v-card-text class="text--primary text-sm-left">
            <div>{{ idea.description }}</div>
          </v-card-text>

          <v-card-actions justify="center">
            <v-list-item class="grow btnSpacing">
              <v-list-item-avatar
                class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"
                color="grey darken-3"
              >
                <v-img class="elevation-6" :src="idea.user_avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content
                class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"
              >
                <v-list-item-title>{{ idea.ideaCreator }}</v-list-item-title>
              </v-list-item-content>

              <v-spacer class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex">
              </v-spacer>

              <v-btn
                v-if="idea.hasUserUpvoted"
                color="blue"
                text
                id="ideaIsUpvoted"
                class="pa-0 btnSpacing"
                v-on:click.stop="$emit('upvoteOnClick', idea)"
              >
                <v-icon>mdi-thumb-up</v-icon>
                <span class="subheading mr-2">{{ idea.upvotes }}</span>
              </v-btn>
              <v-btn
                v-else
                color="grey darken-3"
                text
                id="ideaIsNotUpvoted"
                class="pa-0 btnSpacing"
                v-on:click.stop="$emit('upvoteOnClick', idea)"
              >
                <v-icon>mdi-thumb-up</v-icon>
                <span class="subheading mr-2">{{ idea.upvotes }}</span>
              </v-btn>

              <div class="btnSpacing">
                <v-icon color="grey darken-3">mdi-cash-usd-outline</v-icon>
                <span class="subheading mr-2" color="grey darken-3"
                  >{{ idea.amountReceived }} raised</span
                >
              </div>

              <div class="btnSpacing">
                <v-icon color="grey darken-3">mdi-hand-heart</v-icon>
                <span class="subheading mr-2" color="grey darken-3">{{
                  idea.volunteers
                }}</span>
              </div>

              <div class="btnSpacing">
                <v-icon color="grey darken-3">mdi-account-multiple-plus</v-icon>
                <span class="subheading mr-2" color="grey darken-3">{{
                  idea.followers
                }}</span>
              </div>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/**
 * Template Credits: https://vuetifyjs.com/en/components/cards
 * MIT License
 * https://github.com/vuetifyjs/vuetify
 */
export default {
  props: {
    isEditable: {
      type: Boolean,
      default: false,
    },
    canFollow: {
      type: Boolean,
      default: true,
    },
    ideas: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  methods: {
    async onClick(id, slug, location) {
      let locationParam = null;
      if (location) {
        const locationResponse = await this.$axios
          .get(`/locations/${location}`)
          .catch((error) => {
            console.log(error);
          });

        if (locationResponse) {
          locationParam = locationResponse.data.route;
        }
      } else {
        locationParam = this.$route.params.locId;
      }

      this.$router.push({
        path: `/${locationParam}/ideas/${slug}`,
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
