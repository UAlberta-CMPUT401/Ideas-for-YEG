<template>
  <v-card class="mx-auto" max-width="700" justify="center">
    <v-list-item class="d-flex justify-centre">
      <v-list-item-content>
        <v-list-item-title class="headline">{{ title }}</v-list-item-title>
        <v-list-item-subtitle
          >Posted by {{ ideaCreator.username }}</v-list-item-subtitle
        >
      </v-list-item-content>
      <v-spacer></v-spacer>

      <template>
        <ContactIdeaCreatorDialog :ideaCreator="ideaCreator" />
      </template>
    </v-list-item>

    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(image, i) in images" :key="i">
        <v-sheet height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <v-img
              :src="`http://localhost:1337/${image.url}`"
              gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            ></v-img>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

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
        <DonateDialog :donations="donations" />
      </template>
      <template>
        <FollowersListDialog :followers="followers" />
      </template>
      <template>
        <ProjectUpdatesDialog :updates="updates" />
      </template>
      <template>
        <VolunteerListDialog :volunteers="volunteers" />
      </template>
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

    <v-divider></v-divider>

    <v-list subheader three-line>
      <!-- comment -->

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Status</v-list-item-title>
          <v-col sm="3" md="4" lg="8">
            <v-chip
              v-if="status === 'Completed'"
              color="green"
              text-color="white"
            >
              {{ status }}
              <v-icon right>mdi-star</v-icon>
            </v-chip>
            <v-chip
              v-else-if="status === 'Ongoing'"
              color="orange"
              text-color="white"
            >
              {{ status }}
              <v-icon right>mdi-star</v-icon>
            </v-chip>
            <v-chip v-else color="red" text-color="white">
              {{ status }}
              <v-icon right>mdi-star</v-icon>
            </v-chip>
          </v-col>
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

    <v-expansion-panels multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>Tags</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row justify="left">
            <v-col sm="3" md="4" lg="8">
              <v-chip-group column active-class="primary--text">
                <v-chip v-for="tag in tags" :key="tag.name">
                  {{ tag.name }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider></v-divider>

    <v-expansion-panels multiple>
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
                  <td>{{ item.note }}</td>
                  <td>{{ item.amount }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import moment from 'moment';
import DonateDialog from '../../components/DonateDialog';
import DonateToIdea from '../../components/DonateToIdea';
import SubscribeToDigest from '../../components/SubscribeToDigest';
import VolunteerForIdea from '../../components/VolunteerForIdea';
import FollowersListDialog from '../../components/FollowersListDialog';
import ProjectUpdatesDialog from '../../components/ProjectUpdatesDialog';
import VolunteerListDialog from '../../components/VolunteerListDialog';
import ContactIdeaCreatorDialog from '../../components/ContactIdeaCreatorDialog';

export default {
  components: {
    DonateDialog,
    DonateToIdea,
    SubscribeToDigest,
    VolunteerForIdea,
    FollowersListDialog,
    ProjectUpdatesDialog,
    VolunteerListDialog,
    ContactIdeaCreatorDialog,
  },

  props: {
    slug: String,
  },

  data() {
    return {
      title: 'My title',
      description:
        'To indicate short quotations (four typed lines or fewer of prose or three lines of verse) in your text, enclose the quotation within double quotation marks. Provide the author and specific page number (in the case of verse, provide line numbers) in the in-text citation, and include a complete reference on the Works Cited page. Punctuation marks such as periods, commas, and semicolons should appear after the parenthetical citation.To indicate short quotations (four typed lines or fewer of prose or three lines of verse) in your text, enclose the quotation within double quotation marks. Provide the author and specific page number (in the case of verse, provide line numbers) in the in-text citation, and include a complete reference on the Works Cited page. Punctuation marks such as periods, commas, and semicolons should appear after the parenthetical citation.',
      upvotes: 100,
      ideaCreator: 'Rehab',
      volunteers: [
        {
          username: 'Test',
        },
      ],
      amountReceived: 100,
      status: 'Ongoing',
      images: [
        {
          src:
            'https://iso.500px.com/wp-content/uploads/2015/10/500px-wallpaper-desktop1-3000x2000.jpg',
        },
      ],
      honorarium: [
        {
          note: 'Item 1',
          amount: 159,
        },
      ],
      tags: [
        {
          tag: 'animals',
        },
      ],
      followers: [
        {
          username: 'Test',
        },
      ],
      donations: [
        {
          user: { username: 'Test' },
          amount: 100,
        },
      ],
      updates: [
        {
          createdAt: '2020-02-14',
          description: 'Updates',
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
      this.title = response.title;
      this.description = response.description;
      this.ideaCreator = response.user_creator;
      this.status = response.status;
      this.honorarium = response.honorarium;
      this.upvotes = response.user_upvoters.length;
      this.followers = response.followers;
      this.volunteers = response.volunteers;
      this.updates = response.update.reverse().map((update) => {
        return {
          description: update.description,
          createdAt: moment(update.createdAt).format('MMM DD YYYY'),
        };
      });
      this.tags = response.categories;
      this.images = response.images;
      this.donations = response.donation;
      this.upvotes = response.user_upvoters.length;
    }
  },
};
</script>
