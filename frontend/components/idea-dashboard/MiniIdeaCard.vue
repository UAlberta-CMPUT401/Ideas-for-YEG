<template>
  <v-container fluid>
    <v-col v-for="idea in ideas" :key="idea.title" justify="center">
      <v-expansion-panel-header>{{ idea.title }}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-div
          d-flex
          justify-center
          class="mx-auto"
          max-width="700"
          v-on:click="onClick(idea.id, idea.slug, idea.location)"
        >
          <v-col>
            <v-container fluid>
              <v-row>
                <v-col cols="2" sm="4">
                  <v-img
                    :src="idea.src"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                  >
                  </v-img>
                </v-col>
                <v-col cols="2" sm="8">
                  <v-row>
                    <div class="btnSpacing">
                      <v-icon color="black">mdi-cash-usd-outline</v-icon>
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
                  </v-row>

                  {{ idea.description }}
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-div>
      </v-expansion-panel-content>
    </v-col>
  </v-container>
</template>

<script>
export default {
  props: {
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
