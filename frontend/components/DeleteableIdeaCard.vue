<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col v-for="idea in ideas" :key="idea.title" justify="center">
        <v-card d-flex justify-center class="mx-auto" max-width="700">
          <ConfirmDeleteDialog v-on:childToParent="onClick(ideas, idea)" />
          <v-btn
            v-if="idea.featured === true"
            v-on:click="featured(ideas, idea)"
            text
            class="pa-0 btnSpacing"
          >
            <v-icon color="blue">mdi-star</v-icon>
          </v-btn>
          <v-btn
            v-else
            v-on:click="featured(ideas, idea)"
            text
            class="pa-0 btnSpacing"
          >
            <v-icon color="grey darken-3">mdi-star</v-icon>
          </v-btn>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">{{
                idea.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-img
            :src="idea.src"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
          </v-img>

          <v-card-text class="text--primary">
            <div>{{ idea.description }}</div>
          </v-card-text>

          <v-card-actions justify="center">
            <v-list-item class="grow btnSpacing">
              <v-list-item-avatar
                class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"
                color="grey darken-3"
              >
                <v-img :src="idea.user_avatar" class="elevation-6"></v-img>
              </v-list-item-avatar>

              <v-list-item-content
                class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"
              >
                <v-list-item-title>{{ idea.ideaCreator }}</v-list-item-title>
              </v-list-item-content>

              <v-spacer class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex">
              </v-spacer>

              <v-btn text class="pa-0 btnSpacing">
                <v-icon>mdi-thumb-up</v-icon>
                <span class="subheading mr-2">{{ idea.upvotes }}</span>
              </v-btn>

              <div class="btnSpacing">
                <v-icon color="grey darken-3">mdi-currency-usd</v-icon>
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
import { getJWTCookie } from '../constants/helperFunctions';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
export default {
  components: {
    ConfirmDeleteDialog,
  },
  props: {
    location: Object,
    ideas: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    async onClick(ideas, idea) {
      // Remove the selected category from the category list
      const ideaArray = ideas;
      const index = ideaArray.indexOf(idea);
      if (index !== -1) ideaArray.splice(index, 1);

      // Remove keys so we only mutate the data based on the idea ids
      for (let i = 0; i < ideaArray.length; i++) {
        const temp = ideaArray[i];
        ideaArray[i] = temp.id;
      }
      const config = {
        headers: {
          Authorization: 'Bearer ' + getJWTCookie(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const ideaRequest = {
        ideas: ideaArray,
      };

      const response = await this.$axios
        .$put(`locations/${this.location.id}`, ideaRequest, config)
        .catch((err) => {
          console.log(err);
        });
      if (response) {
        window.location.reload();
      }
    },
    async featured(ideas, idea) {
      // // Remove the selected category from the category list
      // let ideaArray = ideas;
      // const index = ideaArray.indexOf(idea);
      // idea.featured = !idea.featured;
      // ideaArray.$set(index, idea);
      //
      // // Format the JSON for insertion into the graphql
      // ideaArray = JSON.stringify(ideaArray);

      // feature idea
      idea.featured = !idea.featured;

      // Send the graphql post
      const response = await this.$axios
        .$put(
          `/ideas/${idea.id}`,
          { featured: idea.featured },
          {
            headers: {
              Authorization: 'Bearer ' + getJWTCookie(),
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        )
        .catch((err) => {
          console.log(err.response);
        });
      if (response) {
        // update the array accordingly
        const index = ideas.indexOf(idea);
        ideas.splice(index, 1, idea);
      }
    },
  },
};
</script>

<style scoped>
.btnSpacing {
  padding: 0 6px;
}
</style>
