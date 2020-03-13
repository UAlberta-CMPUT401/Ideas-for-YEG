<template>
  <v-card
    v-if="computedAdmins.length > 0"
    class="mx-auto"
    persistent
    width="auto"
  >
    <v-toolbar color="indigo" dark>
      <v-toolbar-title>Existing Admins</v-toolbar-title>
    </v-toolbar>
    <v-container
      id="scroll-target"
      style="max-height: 250px; min-width: 250px; overflow-x: hidden;"
      class="overflow-y-auto"
    >
      <v-list>
        <v-list-item
          v-for="admin in computedAdmins"
          :key="admin.username"
          v-scroll:#scroll-target="onScroll"
        >
          <v-list-item-avatar
            class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"
            color="grey darken-3"
          >
            <v-img class="elevation-6" :src="admin.avatar"></v-img>
          </v-list-item-avatar>
          <v-col>
            <v-list-item-content>
              <v-list-item-title v-text="admin.username"></v-list-item-title>
            </v-list-item-content>
          </v-col>
          <v-spacer class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex">
          </v-spacer>
          <ConfirmDeleteDialog
            justify="end"
            v-on:childToParent="removeAdmin(computedAdmins, admin)"
          />
          <v-list-item-icon>
            <v-icon v-if="admin.icon" color="pink">mdi-star</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-container>
  </v-card>
</template>

<script>
import { DEFAULT_AVATAR_IMG_PATH } from '../constants/constants';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
export default {
  components: {
    ConfirmDeleteDialog,
  },
  props: {
    admins: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data: () => ({
    computedAdmins: [],
    ideaId: '',
    offsetTop: 0,
  }),
  async mounted() {
    let thisSlugId = null;
    if (this.$route.query && this.$route.query.id) {
      thisSlugId = this.$route.query.id;
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
    if (thisSlugId) {
      const response = await this.$axios
        .get(`/ideas?slug=${thisSlugId}`, config)
        .catch((error) => {
          console.log(error);
        });
      let admins = null;
      if (response) {
        this.ideaId = response.data[0].id;
        admins = response.data[0].admins.map((admin) => {
          return {
            id: admin.id,
            username: admin.username,
            fullname: admin.firstName + admin.lastName,
            email: admin.email,
            avatar: admin.avatar
              ? `${this.$axios.defaults.baseURL}${admin.avatar.url}`
              : DEFAULT_AVATAR_IMG_PATH,
          };
        });
        if (this.admins == null) this.admins = admins;
        this.computedAdmins = admins;
      }
    } else {
      this.computedAdmins = [];
      for (let i = 0; i < this.admins.length; i++) {
        const newAdmin = {
          id: this.admins[i].id,
          username: this.admins[i].username,
          fullname: this.admins[i].firstName + this.admins[i].lastName,
          email: this.admins[i].email,
          avatar: this.admins[i].avatar
            ? `${this.$axios.defaults.baseURL}${this.admins[i].avatar.url}`
            : DEFAULT_AVATAR_IMG_PATH,
        };
        this.computedAdmins.push(newAdmin);
      }
    }
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
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

      if (!this.ideaId) {
        // Idea doesn't exist yet so we are in the creation of the idea phase
        this.dialog = false;
        this.loading = false;
        const index = this.computedAdmins.indexOf(admin);
        if (index > -1) {
          this.computedAdmins.splice(index, 1);
        }
        this.$emit('adminDeleteNewIdea', admin.id);
        return;
      }

      // Create admin id removal request
      const ideaRequest = {
        user: admin.id,
        action: 'remove',
      };

      // Update the idea
      const responseUpdate = await this.$axios
        .$put(`/ideas/admin/${this.ideaId}`, ideaRequest, config)
        .catch((error) => {
          console.log(error);
        });

      if (responseUpdate) {
        this.$emit('childToParent');
        this.$emit('adminDeleteNewIdea', admin.id);
      }
    },
  },
};
</script>
<style scoped>
.btnSpacing {
  padding: 0 8px;
}
</style>
