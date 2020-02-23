import { mount } from '@vue/test-utils';
import DonateToIdea from '@/components/DonateToIdea.vue';

describe('Donate To Idea', () => {
  test('component mounts successfully', () => {
    const wrapper = mount(DonateToIdea);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
