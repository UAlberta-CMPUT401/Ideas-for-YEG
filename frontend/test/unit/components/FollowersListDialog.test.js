import { mount } from '@vue/test-utils';
import FollowersListDialog from '@/components/FollowersListDialog.vue';

describe('Followers List Dialog', () => {
  test('component mounts successfully', () => {
    const propsData = {
      followers: [
        {
          id: '1',
          username: 'First User',
        },
      ],
    };
    const wrapper = mount(FollowersListDialog, propsData);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
