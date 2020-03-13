import Vue from 'vue';

export const state = () => ({
  currLocation: null,
});

export const mutations = {
  update(state, newData) {
    // Update state via Vue.set so that it can allow for re-computation.
    Vue.set(state, 'currLocation', newData);
  },
  clear(state) {
    Vue.set(state, 'currLocation', null);
  },
};
