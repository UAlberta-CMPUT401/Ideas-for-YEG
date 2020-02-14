export const state = () => ({
  userData: null,
});

export const mutations = {
  update(state, newData) {
    state.userData = newData;
  },
  clear(state) {
    console.log('clear');
    state.userData = null;
  },
};
