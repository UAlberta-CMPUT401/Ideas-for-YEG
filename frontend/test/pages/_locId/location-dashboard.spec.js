import { mount, RouterLinkStub } from '@vue/test-utils';

import Vue from 'vue';
import Vuetify from 'vuetify';
import NuxtLink from '../../../.nuxt/components/nuxt-link.client.js';
import Page from '@/pages/_locId/location-dashboard.vue';

describe('Location Dashboard Page', () => {
  let wrapper;
  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(NuxtLink);
    const vuetify = new Vuetify();
    wrapper = mount(Page, {
      mocks: {
        $route: {
          params: {
            ideaId: 'example',
          },
        },
        $axios: {
          $post: () => {
            return new Promise((resolve) => resolve(mockRes));
          },
        },
        $store: {
          getters: {
            'ideas/getIdeas': null,
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

  test("can populate it's data", () => {
    expect(wrapper.vm.$data.location.name).toEqual(
      mockRes.data.locations[0].name,
    );
  });
});

const mockRes = {
  data: {
    locations: [
      {
        id: '5e3c98ca4afa9b4046305320',
        name: 'Edmonton',
        route: 'yeg',
        image: {
          url: '/uploads/571e7c97f0db486a81c28a74d9942938.jpg',
        },
        ideas: [
          {
            id: '5e461b367842f9493647dd5e',
            title: 'Google Streetview our River Valley Parks',
            description:
              "360 degree photos showing our parks at different points.  Doesn't require tech ability.",
            volunteers: [],
            images: [
              {
                url: '/uploads/54c852eeb716459093a28d4d68285931.jpg',
              },
            ],
            user_creator: {
              username: 'tester',
              avatar: {
                url: '/uploads/0d496df0137e46939601317ecdee2be2.jpg',
              },
            },
            user_upvoters: [],
            followers: [],
          },
          {
            id: '5e461a227842f9493647dd54',
            title: 'Air Quality Index "Light Art"',
            description:
              'An art installation where a light changes to different colors based on the air quality in Edmonton.',
            volunteers: [],
            images: [],
            user_creator: {
              username: 'tester',
              avatar: {
                url: '/uploads/0d496df0137e46939601317ecdee2be2.jpg',
              },
            },
            user_upvoters: [],
            followers: [],
          },
          {
            id: '5e461aed7842f9493647dd5b',
            title: 'Visualize: Cats, Dogs, Pigeons, Hens and Bees',
            description:
              'The Open Data portal shows data for cats, dogs, pigeons, hens and bees.  They are over different datasets, can someone put them on a map?',
            volunteers: [],
            images: [
              {
                url: '/uploads/bc9bedf13cee48d3a6a1ba621f268d5b.jpg',
              },
            ],
            user_creator: {
              username: 'tester',
              avatar: {
                url: '/uploads/0d496df0137e46939601317ecdee2be2.jpg',
              },
            },
            user_upvoters: [],
            followers: [],
          },
          {
            id: '5e461a897842f9493647dd58',
            title: 'Building Edmonton in Minecraft',
            description:
              "Don't have to build a photo-realistic version of Edmonton like in the More Info link, but it'd be awesome to have something there.",
            volunteers: [],
            images: [
              {
                url: '/uploads/06e0b3b616014a83b28526f222fdc025.jpg',
              },
            ],
            user_creator: {
              username: 'tester',
              avatar: {
                url: '/uploads/0d496df0137e46939601317ecdee2be2.jpg',
              },
            },
            user_upvoters: [],
            followers: [],
          },
          {
            id: '5e461a457842f9493647dd57',
            title: 'Machine Learning: Exploring Libary Book Data',
            description:
              'What patterns can be found in the most popular books by branch from the Edmonton Public Library? ',
            volunteers: [],
            images: [],
            user_creator: {
              username: 'tester',
              avatar: {
                url: '/uploads/0d496df0137e46939601317ecdee2be2.jpg',
              },
            },
            user_upvoters: [],
            followers: [],
          },
          {
            id: '5e4619f77842f9493647dd51',
            title: 'YouCanBenefit2',
            description:
              'A web tool that provides individuals, families, and community workers with easy access to information on available municipal, provincial, and federal benefits.',
            volunteers: [
              {
                username: '432432',
              },
            ],
            images: [
              {
                url: '/uploads/d64129fb5b3d4e608fce9acd7ebd9669.jpg',
              },
              {
                url: '/uploads/21b57b358912431cb50be72dd302eaf9.jpg',
              },
            ],
            user_creator: {
              username: 'tester',
              avatar: {
                url: '/uploads/0d496df0137e46939601317ecdee2be2.jpg',
              },
            },
            user_upvoters: [
              {
                username: 'devChris',
              },
            ],
            followers: [
              {
                username: 'cdkushni',
              },
            ],
          },
        ],
        categories: {
          id: '5e40bb2a1821074586abf463',
          name: 'yeg',
          location: {
            id: '5e3c98ca4afa9b4046305320',
            name: 'Edmonton',
          },
          category: [
            {
              id: '5e40bb2a1821074586abf464',
              name: 'news',
            },
            {
              id: '5e40bb2a1821074586abf465',
              name: 'sports',
            },
            {
              id: '5e4ed589df74cd39a57b7baa',
              name: 'biking',
            },
            {
              id: '5e4ed589df74cd39a57b7bab',
              name: 'hiking',
            },
            {
              id: '5e4ed589df74cd39a57b7bac',
              name: 'test',
            },
          ],
        },
      },
    ],
  },
};
