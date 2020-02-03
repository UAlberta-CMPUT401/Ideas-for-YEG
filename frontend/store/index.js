import Vue from 'vue';
import Vuex from 'vuex';
import ideas from './modules/ideas/index';
import users from './modules/users/index';

Vue.use(Vuex);
Vue.config.devtools = true;

export default () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      ideas,
      users,
    },
  });
};
