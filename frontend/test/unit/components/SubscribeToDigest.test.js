import { mount } from '@vue/test-utils';
import SubscribeToDigest from '@/components/SubscribeToDigest.vue';

describe('Subscribe To Digest', () => {
  test('component mounts successfully', () => {
    const wrapper = mount(SubscribeToDigest);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
