import { mount } from '@vue/test-utils';
import VolunteerListDialog from '@/components/VolunteerListDialog.vue';

describe('Volunteer List Dialog', () => {
  test('component mounts successfully', () => {
    const propsData = {
      volunteers: [
        {
          username: 'Test',
        },
      ],
    };

    const wrapper = mount(VolunteerListDialog, propsData);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
