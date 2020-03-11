import { mount } from '@vue/test-utils';
import ContactIdeaCreatorDialog from '~/components/_ideaId/ContactIdeaCreatorDialog.vue';

describe('Contact Idea Creator Dialog', () => {
  test('component mounts successfully', () => {
    const wrapper = mount(ContactIdeaCreatorDialog);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
