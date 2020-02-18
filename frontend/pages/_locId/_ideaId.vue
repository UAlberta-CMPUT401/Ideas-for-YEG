<template>
  <v-flex xs12 sm8 md6>
    <v-card class="mx-auto" max-width="700" justify="center">
      <v-toolbar color="black" dark>
        <v-spacer />
        <v-toolbar-title>
          {{ title }}
          <!-- comment -->
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <v-img
        src="https://iso.500px.com/wp-content/uploads/2015/10/500px-wallpaper-desktop1-3000x2000.jpg"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      ></v-img>

      <v-divider></v-divider>

      <v-list-item class="d-flex justify-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn text class="pa-0" v-on="on">
              <v-icon>mdi-thumb-up</v-icon>
              <span class="subheading mr-2">{{ upvotes }}</span>
            </v-btn>
          </template>
          <span>Number of thumbs up</span>
        </v-tooltip>

        <template>
          <DonateDialog />
        </template>
        <template>
          <FollowersListDialog />
        </template>
        <template>
          <ProjectUpdatesDialog />
        </template>

        <template>
          <VolunteerListDialog />
        </template>

        <v-chip class="ma-2" color="red" text-color="white">
          {{ status }}
          <v-icon right>mdi-star</v-icon>
        </v-chip>
      </v-list-item>

      <v-divider></v-divider>

      <v-list subheader three-line>
        <!-- comment -->

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Description</v-list-item-title>
            <div>{{ description }}</div>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-row justify="center">
        <template>
          <DonateToIdea />
        </template>

        <template>
          <SubscribeToDigest />
        </template>

        <template>
          <VolunteerForIdea />
        </template>
      </v-row>

      <v-divider></v-divider>

      <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header>Tags</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row justify="space-around">
              <v-col sm="6" md="4" lg="3">
                <v-chip-group column active-class="primary--text">
                  <v-chip v-for="item in tags" :key="item.tag">
                    {{ item.tag }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-divider></v-divider>

      <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header>Honorarium</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Item</th>
                    <th class="text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in honorarium" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.amount }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-divider></v-divider>

      <p class="text-center">Posted by {{ ideaCreator }}</p>
    </v-card>
  </v-flex>
</template>

<script>
import DonateDialog from '../../components/DonateDialog';
import DonateToIdea from '../../components/DonateToIdea';
import SubscribeToDigest from '../../components/SubscribeToDigest';
import VolunteerForIdea from '../../components/VolunteerForIdea';
import FollowersListDialog from '../../components/FollowersListDialog';
import ProjectUpdatesDialog from '../../components/ProjectUpdatesDialog';
import VolunteerListDialog from '../../components/VolunteerListDialog';

export default {
  components: {
    DonateDialog,
    DonateToIdea,
    SubscribeToDigest,
    VolunteerForIdea,
    FollowersListDialog,
    ProjectUpdatesDialog,
    VolunteerListDialog,
  },

  data() {
    return {
      dialog: false,
      DialogTitle: 'Previous Donations',
      title: 'My title',
      description:
        'To indicate short quotations (four typed lines or fewer of prose or three lines of verse) in your text, enclose the quotation within double quotation marks. Provide the author and specific page number (in the case of verse, provide line numbers) in the in-text citation, and include a complete reference on the Works Cited page. Punctuation marks such as periods, commas, and semicolons should appear after the parenthetical citation.To indicate short quotations (four typed lines or fewer of prose or three lines of verse) in your text, enclose the quotation within double quotation marks. Provide the author and specific page number (in the case of verse, provide line numbers) in the in-text citation, and include a complete reference on the Works Cited page. Punctuation marks such as periods, commas, and semicolons should appear after the parenthetical citation.',
      upvotes: 100,
      downvotes: 5,
      ideaCreator: 'Rehab',
      volunteers: 3,
      amountReceived: 100,
      status: 'Ongoing',
      honorarium: [
        {
          name: 'Item 1',
          amount: 159,
        },
        {
          name: 'Item 2',
          amount: 59,
        },
        {
          name: 'Item 3',
          amount: 15,
        },
        {
          name: 'Item 4',
          amount: 19,
        },
      ],
      tags: [
        {
          tag: 'animals',
        },
        {
          tag: 'food',
        },
        {
          tag: 'drinks',
        },
        {
          tag: 'dolphin',
        },
        {
          tag: 'yoga',
        },
        {
          tag: 'sports',
        },
        {
          tag: 'happy',
        },
        {
          tag: 'fundraiser',
        },
        {
          tag: 'taggidytagtag',
        },
      ],
    };
  },

  async mounted() {
    const response = await this.$axios
      .$get(`/ideas/${this.$route.params.ideaId}`)
      .catch((err) => {
        console.log(err);
        return false;
      });

    if (response) {
      // do whatever you want with the API call response to set the state
      console.log(response);
    }
  },
};
</script>
