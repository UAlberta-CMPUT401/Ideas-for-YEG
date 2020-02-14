export const state = {
  ideas: [
    {
      id: 123,
      title: 'No Ideas Have Been Added. Go to Create One!',
      src:
        'https://iso.500px.com/wp-content/uploads/2015/10/500px-wallpaper-desktop1-3000x2000.jpg',
      upvotes: 100,
      followers: 10,
      ideaCreator: 'Rehab',
      volunteers: 3,
      amountReceived: 100,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    },
  ],
};

export const getters = {
  getIdeas: (state) => {
    return state.ideas;
  },
};

export const actions = {};

export const GET_IDEA = 'GET_IDEA';

export const mutations = {};
