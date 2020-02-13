<template>
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
      <v-btn text class="pa-0 btnSpacing">
        <v-icon>mdi-thumb-up</v-icon>
        <span class="subheading mr-2">{{ upvotes }}</span>
      </v-btn>

      <v-btn text class="pa-0 btnSpacing">
        <v-icon>mdi-thumb-down</v-icon>
        <span class="subheading mr-2">{{ downvotes }}</span>
      </v-btn>

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

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Status</v-list-item-title>
          <v-list-item-subtitle>{{ status }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

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

    <div class="text-center">
      <v-row justify="center">
        <tr v-for="item in tags" :key="item.tag">
          <div class="my-2" color="black">
            <v-btn text large disabled> {{ item.tag }} </v-btn>
          </div>
        </tr>
      </v-row>
    </div>

    <v-divider></v-divider>
    <p class="font-italic font-weight-light">Posted by {{ ideaCreator }}</p>
  </v-card>
</template>

<script>
import DonateDialog from '../components/DonateDialog';
import DonateToIdea from '../components/DonateToIdea';
import SubscribeToDigest from '../components/SubscribeToDigest';
import VolunteerForIdea from '../components/VolunteerForIdea';
import FollowersListDialog from '../components/FollowersListDialog';
import ProjectUpdatesDialog from '../components/ProjectUpdatesDialog';
import VolunteerListDialog from '../components/VolunteerListDialog';

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
  props: {
    ideas: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      dialog: false,
      DialogTitle: 'Previous Donations to',
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
      ],
    };
  },
};
</script>
