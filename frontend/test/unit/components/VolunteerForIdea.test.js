import { mount } from '@vue/test-utils';
import VolunteerForIdea from '@/components/VolunteerForIdea.vue';

describe('Volunteer List Dialog', () => {
  test('component mounts successfully', () => {
    const wrapper = mount(VolunteerForIdea);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('input month is valid', () => {
    const wrapper = mount(VolunteerForIdea);
    const result = wrapper.vm.allowedMonths('2019-10-9');
    expect(result).toBeTruthy();
  });

  test('input month is invalid', () => {
    const wrapper = mount(VolunteerForIdea);
    const result = wrapper.vm.allowedMonths('2019-13-9');
    expect(result).toBeFalsy();
  });
});
