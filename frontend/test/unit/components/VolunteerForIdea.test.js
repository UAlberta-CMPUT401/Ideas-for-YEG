import { mount } from '@vue/test-utils';
import VolunteerForIdea from '@/components/VolunteerForIdea.vue';

describe('Volunteer List Dialog', () => {
  test('component mounts successfully', () => {
    const wrapper = mount(VolunteerForIdea);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
