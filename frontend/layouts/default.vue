<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <nuxt-link to="/"><v-toolbar-title v-text="title"/></nuxt-link>
      <v-spacer />
      <!--TODO: Need to have logic to check if a user is logged in-->
      <client-only>
        <v-btn v-if="!isAuthenticated" :to="'/login'" router exact>Login</v-btn>
        <v-menu v-else :offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="primary" v-bind:fab="true" dark>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-subheader>{{ username }}</v-subheader>
            <v-list-item
              v-for="(item, index) in authItems"
              :key="index"
              @click="item.onClick(item.path)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </client-only>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { LS_USER_DATA } from '../constants/constants';
export default {
  data() {
    return {
      clipped: false,
      miniVariant: false,
      title: 'Ideas 4 Location',
      authenticated: false,
      authItems: [
        {
          title: 'Settings',
          path: '/settings',
          onClick: this.redirect.bind(),
        },
        {
          title: 'Admin',
          path: '/admin',
          onClick: this.redirect.bind(),
        },
        {
          title: 'My Ideas',
          path: '/my-ideas',
          onClick: this.redirect.bind(),
        },
        {
          title: 'Logout',
          onClick: this.logOut,
        },
      ],
    };
  },
  computed: {
    isAuthenticated() {
      // double exclamation mark translate object into boolean
      return !!this.$store.state.userData.userData;
    },
    username() {
      if (this.$store.state.userData.userData) {
        return this.$store.state.userData.userData.user.username;
      }
      return 'No Name';
    },
  },
  beforeMount() {
    // Check if user is signed in
    if (process.browser) {
      const userJSON = window.localStorage.getItem(LS_USER_DATA);
      if (userJSON !== null) {
        const userData = JSON.parse(userJSON);
        this.$store.commit('userData/update', userData);
      }
    }
  },
  methods: {
    logOut() {
      window.localStorage.removeItem(LS_USER_DATA);
      this.$store.commit('userData/clear');
      this.$router.push('/');
    },
    redirect(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
a {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}
</style>
