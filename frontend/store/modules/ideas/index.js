import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  idea: 'Food Stand',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
