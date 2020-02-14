import Vue from 'vue';

export const state = () => ({
  userData: null,
});

export const mutations = {
  update(state, newData) {
    // Update state via Vue.set so that it can allow for re-computation.
    Vue.set(state, 'userData', newData);
  },
  clear(state) {
    Vue.set(state, 'userData', null);
  },
};
