import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  ideas: [
    {
      title: 'Yoga Sessions',
      src:
        'https://iso.500px.com/wp-content/uploads/2015/10/500px-wallpaper-desktop1-3000x2000.jpg',
      flex: 8,
      upvotes: 100,
      ideaCreator: 'Rehab',
      volunteers: 3,
      donatedAmount: 100,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    },
    {
      title: 'Crypto Startup Idea',
      src:
        'https://user-images.githubusercontent.com/39191/29881985-95cf06b8-8d60-11e7-87b1-9131b7322c12.png',
      flex: 8,
      upvotes: 10,
      ideaCreator: 'Csaba',
      volunteers: 5,
      donatedAmount: 200.55,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    },
    {
      title: 'Rowing Club',
      src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
      flex: 8,
      upvotes: 8,
      ideaCreator: 'Monica',
      volunteers: 6,
      donatedAmount: 300,
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
