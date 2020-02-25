<template>
  <v-app>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">{{ title }}</h1>
      <v-spacer></v-spacer>
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
              @click="item.onClick"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </client-only>
    </v-card-title>

    <v-row>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-icon>{{ item.icon }}</v-icon
          >{{ item.title }}
        </v-tab>
      </v-tabs>
    </v-row>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { LS_USER_DATA } from '../constants/constants';
// TO-DO: dynamic tabs, only authenticated users can see My Ideas tab
// TO-SO: favorited locations added as tabs
export default {
  data() {
    return {
      tab: null,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Location Selection',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'My Ideas',
          to: '/my-ideas',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Ideas 4 YEG',
      authenticated: false,
      authItems: [
        {
          title: 'Settings',
          onClick: this.redirect.bind('/settings'),
        },
        {
          title: 'Admin',
          onClick: this.redirect.bind('/admin'),
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
