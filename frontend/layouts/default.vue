<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <div>
        <nuxt-link to="/"
          ><v-toolbar-title
            >Ideas 4{{ currLocationName }}</v-toolbar-title
          ></nuxt-link
        >
      </div>
      <v-spacer />
      <!--TODO: Need to have logic to check if a user is logged in-->
      <client-only>
        <v-btn v-on:click="clearLocationAndRedirect" text small class="mr-2"
          >Change Location</v-btn
        >
        <v-btn
          v-if="!isAuthenticated"
          :to="'/login'"
          rounded="true"
          small
          router
          exact
          >Login</v-btn
        >
        <v-menu v-else :offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" v-bind:fab="true" color="primary">
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
import _ from 'lodash';

import { LS_CURR_LOCATION, LS_USER_DATA } from '../constants/constants';
export default {
  data() {
    return {
      clipped: false,
      miniVariant: false,
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
    currLocationName() {
      if (
        this.$store.state.currLocation.currLocation &&
        this.$store.state.currLocation.currLocation.name
      ) {
        return (
          ' ' + _.startCase(this.$store.state.currLocation.currLocation.name)
        );
      }
      return '';
    },
  },
  beforeMount() {
    // Get stored values from localStorage and put them into vuex
    if (process.browser) {
      const userJSON = window.localStorage.getItem(LS_USER_DATA);
      if (userJSON !== null) {
        const userData = JSON.parse(userJSON);
        this.$store.commit('userData/update', userData);
      }

      const currLocationJSON = window.localStorage.getItem(LS_CURR_LOCATION);
      if (currLocationJSON !== null) {
        const currLocation = JSON.parse(currLocationJSON);
        this.$store.commit('currLocation/update', currLocation);
      }
    }
  },
  methods: {
    logOut() {
      window.localStorage.removeItem(LS_USER_DATA);
      document.cookie =
        'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      this.$store.commit('userData/clear');
      this.$router.push('/');
    },
    clearLocationAndRedirect() {
      window.localStorage.removeItem(LS_CURR_LOCATION);
      this.$store.commit('currLocation/clear');
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
