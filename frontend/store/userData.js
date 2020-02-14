import Vue from 'vue';

export const state = () => ({
  userData: null,
});

export const mutations = {
  update(state, newData) {
    console.log('set');
    Vue.set(state, 'userData', newData);
    // state.userData = newData;
  },
  clear(state) {
    console.log('clear');
    Vue.set(state, 'userData', null);
    // state.userData = null;
  },
};
