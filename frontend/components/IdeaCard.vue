<template>
  <v-card class="mx-auto">
    <v-container fluid>
      <v-row>
        <v-col
          v-for="idea in ideas"
          :key="idea.title"
          :cols="idea.flex"
          class="card"
        >
          <v-card class="mx-auto">
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
              height="194px"
            >
            </v-img>

            <v-card-text class="text--primary">
              <div>{{ idea.description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar
                  class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"
                  color="grey darken-3"
                >
                  <v-img
                    class="elevation-6"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ idea.ideaCreator }}</v-list-item-title>
                </v-list-item-content>

                <v-spacer> </v-spacer>

                <v-btn color="grey darken-4" text>
                  <v-icon>mdi-thumb-up</v-icon>
                  <span class="subheading mr-2">{{ idea.upvotes }}</span>
                </v-btn>

                <v-btn color="grey darken-4" text>
                  <v-icon>mdi-currency-usd</v-icon>
                  <span class="subheading mr-2">{{ idea.donatedAmount }}</span>
                </v-btn>

                <v-btn color="grey darken-4" text>
                  <v-icon>mdi-account-group</v-icon>
                  <span class="subheading mr-2">{{ idea.volunteers }}</span>
                </v-btn>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
/**
 * Template Credits: https://vuetifyjs.com/en/components/cards
 * MIT License
 * https://github.com/vuetifyjs/vuetify
 */
export default {
  props: {
    ideas: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.card {
  margin: auto;
  display: block;
  width: 75%;
}
</style>
