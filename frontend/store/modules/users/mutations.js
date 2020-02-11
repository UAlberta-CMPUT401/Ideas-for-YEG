import * as MutationTypes from './mutation-types';

const mutations = {
  [MutationTypes.GET_AUTH](state) {
    const isAuthenticated =
      document.cookie &&
      document.cookie.replace(
        /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      ) !== '';
    state.isAuthenticated = isAuthenticated;
  },
};
export default mutations;
