import { mount } from '@vue/test-utils';
import LocationCard from '@/components/LocationCard.vue';

describe('Location Card', () => {
  test('component mounts successfully', () => {
    const propsData = {
      locations: [
        {
          name: 'Edmonton',
          code: 'YEG',
          src: null,
        },
      ],
    };
    const wrapper = mount(LocationCard, propsData);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
