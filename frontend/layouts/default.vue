<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn @click.stop="miniVariant = !miniVariant" icon>
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn @click.stop="clipped = !clipped" icon>
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!--TODO: Need to have logic to check if a user is logged in-->
      <client-only>
        <v-btn v-if="!isAuthenticated" :to="'/login'" router exact>Login</v-btn>
        <v-menu v-else :offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="primary" dark fab="true">
              {{ username }}
            </v-btn>
          </template>
          <v-list>
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
    </v-app-bar>
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
import { LS_USER_DATA } from '../constants';
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Location Selection',
          to: '/',
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
