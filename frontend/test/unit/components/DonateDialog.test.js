import { mount } from '@vue/test-utils';
import DonateDialog from '@/components/DonateDialog.vue';

describe('Donate Dialog', () => {
  test('component mounts successfully', () => {
    const propsData = {
      followers: [
        {
          id: 1,
          user: {
            username: 'Donation User',
          },
          amount: 100,
        },
      ],
    };
    const wrapper = mount(DonateDialog, propsData);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
