<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col v-for="idea in ideas" :key="idea.title" justify="center">
        <v-card d-flex justify-center class="mx-auto" max-width="700">
          <v-row justify="center">
            <v-col>
              <v-list-item class="shrink btnSpacing">
                <v-list-item-content>
                  <v-list-item-title class="headline">{{
                    idea.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-btn
                text
                class="pa-0 btnSpacing"
                v-on:click="onClick(ideas, idea)"
              >
                <v-icon color="black">mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
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
                <v-img class="elevation-6" :src="idea.user_avatar"></v-img>
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
                <v-icon color="black">mdi-currency-usd</v-icon>
                <span class="subheading mr-2" color="black"
                  >{{ idea.amountReceived }} raised</span
                >
              </div>

              <div class="btnSpacing">
                <v-icon color="black">mdi-hand-heart</v-icon>
                <span class="subheading mr-2" color="black">{{
                  idea.volunteers
                }}</span>
              </div>

              <v-btn text class="pa-0 btnSpacing">
                <v-icon color="black">mdi-account-multiple-plus</v-icon>
                <span class="subheading mr-2" color="black">{{
                  idea.followers
                }}</span>
              </v-btn>
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
      // Get the jwt
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);

      // Remove the selected category from the category list
      let ideaArray = ideas;
      const index = ideaArray.indexOf(idea);
      if (index !== -1) ideaArray.splice(index, 1);

      // Remove keys so we only mutate the data based on the idea ids
      for (let i = 0; i < ideaArray.length; i++) {
        const temp = ideaArray[i];
        ideaArray[i] = temp.id;
      }

      // Format the JSON for insertion into the graphql
      ideaArray = JSON.stringify(ideaArray);

      // Send the graphql post
      const response = await this.$axios
        .$post(
          '/graphql',
          {
            query: `mutation {
              updateLocation(
                input: {
                  where: { id: "${this.location.id}" }
                  data: {
                    ideas: ${ideaArray},
                  }
              })
              {
                location {
                  ideas {
                    title
                  }
                }
              }
            }
          `,
          },
          {
            headers: {
              Authorization: 'Bearer ' + userData.jwt,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        )
        .catch((err) => {
          console.log(err.response);
        });
      if (response) {
        window.location.reload();
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
