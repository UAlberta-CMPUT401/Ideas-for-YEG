import { mount, RouterLinkStub } from '@vue/test-utils';

import Vue from 'vue';
import Vuetify from 'vuetify';
import NuxtLink from '../../../.nuxt/components/nuxt-link.client.js';
import IdeaDetailPage from '~/pages/_locId/ideas/_ideaSlug.vue';

describe('Idea Detail Page', () => {
  let wrapper;
  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(NuxtLink);
    const vuetify = new Vuetify();
    wrapper = mount(IdeaDetailPage, {
      mocks: {
        $route: {
          params: {
            ideaId: 'example',
          },
        },
        $axios: {
          $get: () => {
            return new Promise((resolve) => resolve(mockIdea));
          },
        },
      },
      vuetify,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('can get a mock idea', () => {
    expect(wrapper.vm.$data.title).toEqual(
      'Google Streetview our River Valley Parks',
    );
    expect(wrapper.vm.$data.status).toEqual('Completed');
    expect(wrapper.vm.$data.ideaCreator.username).toEqual('tester');
  });
});

const mockIdea = [
  {
    status: 'Completed',
    volunteers: [],
    admins: [],
    user_upvoters: [],
    user_downvoters: [],
    followers: [],
    _id: '5e461b367842f9493647dd5e',
    title: 'Google Streetview our River Valley Parks',
    description:
      "360 degree photos showing our parks at different points.  Doesn't require tech ability.",
    update: [],
    donation: [],
    honorarium: [],
    categories: [],
    createdAt: '2020-02-14T03:59:50.014Z',
    updatedAt: '2020-02-21T20:46:56.112Z',
    __v: 0,
    user_creator: {
      confirmed: true,
      blocked: false,
      _id: '5e3c99fb41c08b409b7a4953',
      username: 'tester',
      email: 'tester@gmail.com',
      provider: 'local',
      createdAt: '2020-02-06T22:58:03.453Z',
      updatedAt: '2020-02-19T23:21:06.386Z',
      __v: 0,
      role: '5e3c925057263540022ebd94',
      idea: '5e409cb109d421443053be98',
      firstName: 'Tester',
      lastName: 'Last',
      avatar: {
        _id: '5e443e7ce581db5c8903b802',
        name: 'avatar.jpg',
        sha256: 'C1mr67dPxbcUFfBLOsuCdNHE2ZysPT9Hw8pyQrCuTzU',
        hash: '0d496df0137e46939601317ecdee2be2',
        ext: '.jpg',
        mime: 'image/jpeg',
        size: 25.54,
        url: '/uploads/0d496df0137e46939601317ecdee2be2.jpg',
        provider: 'local',
        related: ['5e3c99fb41c08b409b7a4953'],
        createdAt: '2020-02-12T18:05:48.500Z',
        updatedAt: '2020-02-12T18:05:48.761Z',
        __v: 1,
        id: '5e443e7ce581db5c8903b802',
      },
      id: '5e3c99fb41c08b409b7a4953',
    },
    location: {
      admins: [],
      _id: '5e3c98ca4afa9b4046305320',
      name: 'Edmonton',
      createdAt: '2020-02-06T22:52:58.808Z',
      updatedAt: '2020-02-21T20:46:56.189Z',
      __v: 0,
      route: 'yeg',
      categories: '5e40bb2a1821074586abf463',
      image: {
        _id: '5e5041b70ec4ba681d220057',
        name: '960x0.jpg',
        sha256: 'fqieixiapfNqhSXJGvxd-eAibRoeJZmNp0Vh5fKDAqw',
        hash: '571e7c97f0db486a81c28a74d9942938',
        ext: '.jpg',
        mime: 'image/jpeg',
        size: 118.88,
        url: '/uploads/571e7c97f0db486a81c28a74d9942938.jpg',
        provider: 'local',
        related: ['5e3c98ca4afa9b4046305320'],
        createdAt: '2020-02-21T20:46:47.910Z',
        updatedAt: '2020-02-21T20:46:48.219Z',
        __v: 1,
        id: '5e5041b70ec4ba681d220057',
      },
      ideas: [
        '5e4e3d9d2d150201858a90e5',
        '5e4619f77842f9493647dd51',
        '5e461a897842f9493647dd58',
        '5e461a457842f9493647dd57',
        '5e461b367842f9493647dd5e',
        '5e461aed7842f9493647dd5b',
        '5e461a227842f9493647dd54',
      ],
      id: '5e3c98ca4afa9b4046305320',
    },
    images: [
      {
        _id: '5e461b367842f9493647dd5f',
        name: 'GoogleStreetViewCar_Subaru_Impreza_at_Google_Campus.jpg',
        sha256: 'Njenhlwf-FHC5Mc5emIaxQJDmtfhG4vwFHChPqFIAe0',
        hash: '54c852eeb716459093a28d4d68285931',
        ext: '.jpg',
        mime: 'image/jpeg',
        size: 1024.8,
        url: '/uploads/54c852eeb716459093a28d4d68285931.jpg',
        provider: 'local',
        related: ['5e461b367842f9493647dd5e'],
        createdAt: '2020-02-14T03:59:50.517Z',
        updatedAt: '2020-02-14T03:59:50.749Z',
        __v: 1,
        id: '5e461b367842f9493647dd5f',
      },
    ],
    id: '5e461b367842f9493647dd5e',
  },
];
