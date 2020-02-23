import { mount } from '@vue/test-utils';
import LocationCard from '@/components/LocationCard.vue';

describe('Location Card', () => {
  test('component mounts successfully', () => {
    const wrapper = mount(LocationCard);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
