import { mount } from '@vue/test-utils';
import IdeaCard from '@/components/IdeaCard.vue';

describe('Idea Card', () => {
  test('component mounts successfully', () => {
    const wrapper = mount(IdeaCard);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('empty ideas prop renders no ideas found', () => {
    const wrapper = mount(IdeaCard, {
      propsData: {
        ideas: [],
      },
    });
    const header = wrapper.find('h2');
    expect(header.text()).toEqual('No ideas have been found');
  });

  test('click on component to change route', async () => {
    const $route = {
      path: '/some/path',
    };
    const wrapper = mount(IdeaCard, {
      propsData: {
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
      },
      mocks: {
        $route,
      },
    });

    const card = wrapper.find('v-card');
    card.trigger('click');
    await wrapper.vm.$nextTick();

    // TODO figure out how to mock the route and check if the correct path has been navigated to
    // expect(wrapper.vm.$route.path).toBe($route.path);
  });
});
