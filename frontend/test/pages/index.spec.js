import { mount } from '@vue/test-utils';
import Index from '@/pages/index.vue';

describe('Index Page', () => {
  test('Page mounts successfully', async () => {
    const response = [
      {
        admins: [],
        _id: '5e43526130aee8486d0814b3',
        name: 'Calgary',
        route: 'yyc',
        createdAt: '2020-02-12T01:18:25.055Z',
        updatedAt: '2020-02-21T20:46:21.520Z',
        __v: 0,
        image: {
          _id: '5e50419d0ec4ba681d220053',
          name: 'download.jpeg',
          sha256: 'fU7MGdIIGgs_DfOJA+jjukChY7QLE-Mk1Jc1pCo4fyc',
          hash: '396903ad178a42b2a57fca6e79857ac2',
          ext: '.jpeg',
          mime: 'image/jpeg',
          size: 9.47,
          url: '/uploads/396903ad178a42b2a57fca6e79857ac2.jpeg',
          provider: 'local',
          related: ['5e43526130aee8486d0814b3'],
          createdAt: '2020-02-21T20:46:21.837Z',
          updatedAt: '2020-02-21T20:46:22.155Z',
          __v: 1,
          id: '5e50419d0ec4ba681d220053',
        },
        ideas: [],
        id: '5e43526130aee8486d0814b3',
      },
    ];

    const wrapper = mount(Index, {
      mocks: {
        $axios: {
          $get: () => {
            return new Promise((resolve, reject) => resolve(response));
          },
        },
      },
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.locations).toEqual([]);
  });

  test('Location api call returns error', async () => {
    const wrapper = mount(Index, {
      mocks: {
        $axios: {
          $get: () => {
            return new Promise((resolve, reject) => reject(new Error(null)));
          },
        },
      },
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.locations).toEqual([]);
  });
});
