<template>
  <v-card max-width="500" class="mx-auto">
    <v-toolbar color="indigo" dark>
      <v-toolbar-title>Existing Admins</v-toolbar-title>
    </v-toolbar>
    <v-container
      id="scroll-target"
      style="max-height: 250px"
      class="overflow-y-auto"
    >
      <v-list>
        <v-list-item
          v-for="admin in admins"
          :key="admin.username"
          v-scroll:#scroll-target="onScroll"
        >
          <v-list-item-avatar
            class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"
            color="grey darken-3"
          >
            <v-img class="elevation-6" :src="admin.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="admin.username"></v-list-item-title>
          </v-list-item-content>
          <v-btn v-on:click="removeAdmin(admins, admin)" text>
            <v-icon color="black">mdi-delete</v-icon>
          </v-btn>
          <v-list-item-icon>
            <v-icon v-if="admin.icon" color="pink">mdi-star</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    admins: [],
  }),
  async mounted() {
    let thisIdeaId = null;
    if (this.$root._route.query.id) {
      thisIdeaId = this.$root._route.query.id;
    }
    const userJSON = window.localStorage.getItem('userData');
    const userData = JSON.parse(userJSON);
    const config = {
      headers: {
        Authorization: 'Bearer ' + userData.jwt,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    if (thisIdeaId) {
      const response = await this.$axios
        .get(`/ideas?id=${thisIdeaId}`, config)
        .catch((error) => {
          console.log(error);
        });
      let admins = null;
      if (response) {
        admins = response.data[0].admins.map((admin) => {
          return {
            id: admin.id,
            username: admin.username,
            fullname: admin.firstName + admin.lastName,
            email: admin.email,
            avatar: admin.avatar
              ? `http://localhost:1337${admin.avatar.url}`
              : 'https://www.everypixel.com/image-638397625280524203.jpg',
          };
        });
        this.admins = admins;
      }
    }
  },
  methods: {
    async removeAdmin(admins, admin) {
      // Get the jwt
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);
      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.jwt,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      // Get the ID for this idea to update
      let thisIdeaId = null;
      if (this.$root._route.query.id) {
        thisIdeaId = this.$root._route.query.id;
      }

      // Create admin id removal request
      const ideaRequest = {
        user: admin.id,
        action: 'remove',
      };

      // Update the idea
      const responseUpdate = await this.$axios
        .$put(`/ideas/admin/${thisIdeaId}`, ideaRequest, config)
        .catch((error) => {
          console.log(error);
        });

      if (responseUpdate) {
        this.$emit('childToParent');
      }
    },
  },
};
</script>
