import { mount } from '@vue/test-utils';
import ProjectUpdatesDialog from '@/components/ProjectUpdatesDialog.vue';

describe('Project Updates Dialog ', () => {
  test('component mounts successfully', () => {
    const propsData = {
      updates: [
        {
          createdAt: 'May 4 2020',
          description: 'Change the project requirements',
        },
      ],
    };

    const wrapper = mount(ProjectUpdatesDialog, propsData);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
