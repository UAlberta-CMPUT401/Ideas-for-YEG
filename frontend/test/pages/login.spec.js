import { mount, RouterLinkStub } from '@vue/test-utils';

import Vue from 'vue';
import Vuetify from 'vuetify';
import NuxtLink from '../../.nuxt/components/nuxt-link.client.js';
import Login from '@/pages/login.vue';

describe('Login Page', () => {
  let wrapper;
  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(NuxtLink);
    wrapper = mount(Login, {
      mocks: {
        $store: {
          getters: {
            firstName: null,
          },
        },
      },
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
