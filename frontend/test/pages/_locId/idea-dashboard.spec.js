import { mount } from '@vue/test-utils';
import IdeaDashboard from '@/pages/_locId/idea-dashboard.vue';

describe('IdeaDashboard Page', () => {
  test('Page mounts successfully', async () => {
    const response = {
      data: {
        locations: [
          {
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
                slug: null,
              },
            ],
          },
        ],
      },
    };

    const wrapper = mount(IdeaDashboard, {
      mocks: {
        $axios: {
          $post: () => {
            return new Promise((resolve, reject) => resolve(response));
          },
        },
        $store: {
          getters: {
            'ideas/getIdeas': [],
          },
        },
        $route: {
          params: {
            locId: 'yeg',
          },
        },
      },
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
    await wrapper.vm.$nextTick();

    const idea = response.data.locations[0].ideas[0];

    expect(wrapper.vm.ideas).toEqual([
      {
        id: idea.id,
        title: idea.title,
        description: idea.description,
        upvotes: idea.user_upvoters.length,
        ideaCreator: idea.user_creator.username,
        src: `http://localhost:1337${idea.images[0].url}`,
        volunteers: idea.volunteers.length,
        amountReceived: 100,
        followers: idea.followers.length,
        user_avatar: `http://localhost:1337${idea.user_creator.avatar.url}`,
        slug: idea.slug,
      },
    ]);
  });

  test('Idea api call returns an error', async () => {
    const wrapper = mount(IdeaDashboard, {
      mocks: {
        $axios: {
          $post: () => {
            return new Promise((resolve, reject) => reject(new Error(null)));
          },
        },
        $store: {
          getters: {
            'ideas/getIdeas': [],
          },
        },
        $route: {
          params: {
            locId: 'yeg',
          },
        },
      },
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.ideas).toEqual([]);
  });
});
