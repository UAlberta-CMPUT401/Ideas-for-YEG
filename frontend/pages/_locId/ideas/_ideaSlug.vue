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

      <template v-if="contactEmail">
        <ContactIdeaCreatorDialog :contactEmail="contactEmail" />
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
          <v-btn
            v-if="hasUserUpvoted"
            text
            class="pa-0"
            color="blue"
            v-on="on"
            v-on:click="updateUpvote"
          >
            <v-icon>mdi-thumb-up</v-icon>
            <span class="subheading mr-2">{{ upvotes }}</span>
          </v-btn>
          <v-btn v-else text class="pa-0" v-on="on" v-on:click="updateUpvote">
            <v-icon>mdi-thumb-up</v-icon>
            <span class="subheading mr-2">{{ upvotes }}</span>
          </v-btn>
        </template>
        <span>Number of Upvotes</span>
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
import DonateDialog from '../../../components/DonateDialog';
import DonateToIdea from '../../../components/DonateToIdea';
import SubscribeToDigest from '../../../components/SubscribeToDigest';
import VolunteerForIdea from '../../../components/VolunteerForIdea';
import FollowersListDialog from '../../../components/FollowersListDialog';
import ProjectUpdatesDialog from '../../../components/ProjectUpdatesDialog';
import VolunteerListDialog from '../../../components/VolunteerListDialog';
import ContactIdeaCreatorDialog from '../../../components/_ideaId/ContactIdeaCreatorDialog';

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
      title: '',
      description: '',
      upvotes: 0,
      ideaCreator: {
        confirmed: true,
        blocked: false,
        _id: '',
        username: '',
        email: '',
        provider: '',
        createdAt: '2020-02-06T22:58:03.453Z',
        updatedAt: '2020-02-19T23:21:06.386Z',
        __v: 0,
        role: '5e3c925057263540022ebd94',
        idea: '5e409cb109d421443053be98',
        firstName: 'Tester',
        lastName: 'Last',
        avatar: {
          _id: '5e443e7ce581db5c8903b802',
          name: 'avatar.jpg',
          sha256: 'C1mr67dPxbcUFfBLOsuCdNHE2ZysPT9Hw8pyQrCuTzU',
          hash: '0d496df0137e46939601317ecdee2be2',
          ext: '.jpg',
          mime: 'image/jpeg',
          size: 25.54,
          url: '/uploads/0d496df0137e46939601317ecdee2be2.jpg',
          provider: 'local',
          related: ['5e3c99fb41c08b409b7a4953'],
          createdAt: '2020-02-12T18:05:48.500Z',
          updatedAt: '2020-02-12T18:05:48.761Z',
          __v: 1,
          id: '5e443e7ce581db5c8903b802',
        },
        id: '5e3c99fb41c08b409b7a4953',
      },
      volunteers: [
        {
          username: 'Test',
        },
      ],
      amountReceived: 0,
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
      contactEmail: '',
    };
  },

  async mounted() {
    const userJSON = window.localStorage.getItem('userData');
    const userData = JSON.parse(userJSON);

    const response = await this.$axios
      .$get(`/ideas?slug=${this.$route.params.ideaSlug}`)
      .catch((err) => {
        console.log(err);
        return false;
      });

    if (response && response.length > 0) {
      const data = response[0];
      this.title = data.title;
      this.description = data.description;
      this.ideaCreator = data.user_creator;
      this.status = data.status;
      this.honorarium = data.honorarium;
      this.upvotes = data.user_upvoters.length;
      this.followers = data.followers;
      this.volunteers = data.volunteers;
      this.updates = data.update.reverse().map((update) => {
        return {
          description: update.description,
          createdAt: moment(update.createdAt).format('MMM DD YYYY'),
        };
      });
      this.tags = data.categories;
      this.images = data.images;
      this.donations = data.donation;
      this.upvotes = data.upvote_count;
      this.hasUserUpvoted = userData
        ? data.user_upvoters.filter((user) => {
            return user.id === userData.user.id;
          }).length === 1
        : false;
      this.contactEmail = data.contact_email;
    }
  },

  methods: {
    async updateUpvote() {
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);

      if (!userData) {
        return;
      }

      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.jwt,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      this.hasUserUpvoted ? this.upvotes-- : this.upvotes++;
      this.hasUserUpvoted = !this.hasUserUpvoted;

      const response = await this.$axios
        .$put(`/ideas/upvote/${this.$route.params.ideaId}`, {}, config)
        .catch((error) => console.log(error));

      // undo upvoting if API fails
      if (!response) {
        this.hasUserUpvoted ? this.upvotes-- : this.upvotes++;
        this.hasUserUpvoted = !this.hasUserUpvoted;
      }
    },
  },
};
</script>
