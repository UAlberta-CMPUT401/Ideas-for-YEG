import { mount } from '@vue/test-utils';
import IdeaCard from '~/components/idea-dashboard/IdeaCard.vue';

describe('Idea Card', () => {
  test('component mounts successfully', () => {
    const wrapper = mount(IdeaCard);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('click on component to change route', async () => {
    const $route = {
      path: '',
      params: {
        locId: 'yeg',
      },
    };
    const $router = {
      push: (id) => {
        $route.path = id;
      },
    };
    const propsData = {
      ideas: [
        {
          id: 1,
          title: 'Test Idea 1',
          desciption: 'Lorem Ipsum',
          src: null,
          user_avatar: null,
          ideaCreator: 'User',
          upvotes: 12,
          amountReceived: 100,
          volunteers: 10,
          followers: 9,
        },
      ],
    };
    const wrapper = mount(IdeaCard, {
      propsData,
      mocks: {
        $route,
        $router,
      },
    });

    const card = wrapper.find('v-card');
    expect(wrapper.vm.$route.path).not.toBe(propsData.id);
    card.trigger('click');
    $router.push(propsData.id);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$route.path).toBe(propsData.id);
  });
});
