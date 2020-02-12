import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  ideas: [
    {
      title: 'No Ideas Have Been Added. Go to Create One!',
      src:
        'https://iso.500px.com/wp-content/uploads/2015/10/500px-wallpaper-desktop1-3000x2000.jpg',
      upvotes: 100,
      ideaCreator: 'Rehab',
      volunteers: 3,
      amountReceived: 100,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    },
  ],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
