const getters = {
  getUser: (state) => {
    return state.user;
  },
  getAuth: (state) => {
    return state.isAuthenticated;
  },
};

export default getters;
