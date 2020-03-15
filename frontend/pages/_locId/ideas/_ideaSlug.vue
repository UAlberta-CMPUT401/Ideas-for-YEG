<template>
  <v-card>
    <v-snackbar v-model="snackbarSuccess" absolute top right color="success">
      <span>{{ snackbarMessage }}</span>
    </v-snackbar>
    <v-snackbar v-model="snackbarError" absolute top right color="error">
      <span>{{ snackbarMessage }}</span>
    </v-snackbar>
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
                :src="
                  image.url === DEFAULT_IDEA_IMG_PATH
                    ? DEFAULT_IDEA_IMG_PATH
                    : `${$axios.defaults.baseURL}${image.url}`
                "
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
          <VolunteerListDialog
            :volunteers="volunteers"
            :isVolunteering="isVolunteering"
          />
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list subheader three-line>
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
          <VolunteerForIdea
            @dialogOperationCallback="dialogOperationCallback"
            v-bind:ideaId="ideaId"
            v-bind:allVolunteers="volunteers"
            v-bind:ideaCreatorEmail="ideaCreator.email"
            v-bind:ideaTitle="title"
          />
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
  </v-card>
</template>

<script>
import moment from 'moment';
import {
  MUST_LOGIN_MESSAGE,
  VOLUNTEER_SUCCESS_MESSAGE,
  VOLUNTEER_REMOVAL_MESSAGE,
} from '../../../constants/constants';
import DonateDialog from '../../../components/DonateDialog';
import DonateToIdea from '../../../components/DonateToIdea';
import SubscribeToDigest from '../../../components/SubscribeToDigest';
import VolunteerForIdea from '../../../components/VolunteerForIdea';
import FollowersListDialog from '../../../components/FollowersListDialog';
import ProjectUpdatesDialog from '../../../components/ProjectUpdatesDialog';
import VolunteerListDialog from '../../../components/VolunteerListDialog';
import ContactIdeaCreatorDialog from '../../../components/_ideaId/ContactIdeaCreatorDialog';
import {
  DEFAULT_IDEA_IMG_PATH,
  DEFAULT_AVATAR_IMG_PATH,
} from '../../../constants/constants';

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
      snackbarSuccess: false,
      snackbarError: false,
      snackbarMessage: '',
      DEFAULT_IDEA_IMG_PATH,
      DEFAULT_AVATAR_IMG_PATH,
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
        firstName: '',
        lastName: '',
        avatar: {
          url: DEFAULT_AVATAR_IMG_PATH,
        },
        id: '5e3c99fb41c08b409b7a4953',
      },
      volunteers: [],
      amountReceived: 0,
      status: 'Ongoing',
      images: [
        {
          url: DEFAULT_IDEA_IMG_PATH,
        },
      ],
      honorarium: [],
      tags: [],
      followers: [],
      donations: [],
      updates: [],
      contactEmail: '',
      ideaId: '',
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
      this.ideaId = data.id;
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
      this.images = data.images.length > 0 ? data.images : this.images;
      this.donations = data.donation;
      this.upvotes = data.upvote_count;
      this.hasUserUpvoted = userData
        ? data.user_upvoters.filter((user) => {
            return user.id === userData.user.id;
          }).length === 1
        : false;
      this.contactEmail = data.contact_email;
      this.ideaId = data.id;
      this.isVolunteering = userData
        ? data.volunteers.filter((user) => {
            return user.id === userData.user.id;
          }).length === 1
        : false;
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
        .$put(`/ideas/upvote/${this.ideaId}`, {}, config)
        .catch((error) => console.log(error));

      // undo upvoting if API fails
      if (!response) {
        this.hasUserUpvoted ? this.upvotes-- : this.upvotes++;
        this.hasUserUpvoted = !this.hasUserUpvoted;
      }
    },

    dialogOperationCallback(displayMessage, success, error) {
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);

      if (!userData) {
        this.snackbarError = true;
        this.snackbarSuccess = false;
        this.snackbarMessage = MUST_LOGIN_MESSAGE;
        return;
      }

      this.snackbarSuccess = success;
      this.snackbarError = error;
      this.snackbarMessage = displayMessage;

      if (this.snackbarSuccess) {
        if (displayMessage === VOLUNTEER_SUCCESS_MESSAGE) {
          this.volunteers.push({
            username: userData.user.username,
          });
          this.isVolunteering = true;
        } else if (displayMessage === VOLUNTEER_REMOVAL_MESSAGE) {
          this.volunteers = this.volunteers.filter((volunteer) => {
            return volunteer.username !== userData.user.username;
          });
          this.isVolunteering = false;
        }
      }
    },
  },
};
</script>
