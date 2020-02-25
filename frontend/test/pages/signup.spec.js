import { mount, RouterLinkStub } from '@vue/test-utils';

import Vue from 'vue';
import Vuetify from 'vuetify';
import NuxtLink from '../../.nuxt/components/nuxt-link.client.js';
import SignUp from '@/pages/signup.vue';

describe('SignUp Page', () => {
  let wrapper;
  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(NuxtLink);
    wrapper = mount(SignUp, {
      mocks: {
        $store: {
          getters: {
            firstName: null,
          },
        },
      },
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });
  });

  /**
   * Manually check if string passes certain rules
   */
  test('has correct sign-in validation for usernames', () => {
    const rules = wrapper.vm.$data.usernameRules;
    expect(evaluateInput('', rules)).toEqual(false);
    expect(evaluateInput('2shrt', rules)).toEqual(false);
    expect(evaluateInput('waaaaaaaayyyyyyytoooooooloooooong', rules)).toEqual(
      false,
    );
    expect(evaluateInput('aGoodUsername', rules)).toEqual(true);
  });

  test('has correct sign-in validation for passwords', () => {
    const rules = wrapper.vm.$data.passwordRules;
    expect(evaluateInput('', rules)).toEqual(false);
    expect(evaluateInput('shrt', rules)).toEqual(false);
    expect(
      evaluateInput(
        'waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaayyyyyyytoooooooloooooong',
        rules,
      ),
    ).toEqual(false);
    expect(evaluateInput('aGoodPassword', rules)).toEqual(true);
  });

  test('has correct sign-in validation for confirming passwords', () => {
    const rules = wrapper.vm.$data.passwordConfRules;
    wrapper.vm.$data.password = 'password';
    expect(evaluateInput('', rules)).toEqual(false);
    expect(evaluateInput('PASSWORD', rules)).toEqual(false);
    expect(evaluateInput('pass word', rules)).toEqual(false);
    expect(evaluateInput('password', rules)).toEqual(true);
  });

  test('has correct sign-in validation for emails', () => {
    const rules = wrapper.vm.$data.emailRules;
    expect(evaluateInput('', rules)).toEqual(false);
    expect(evaluateInput('.com', rules)).toEqual(false);
    expect(evaluateInput('@gmail.com.', rules)).toEqual(false);
    expect(evaluateInput('email@gmail', rules)).toEqual(false);
    expect(evaluateInput('email@gmail.com', rules)).toEqual(true);
  });

  test('has correct sign-in validation for first names', () => {
    const rules = wrapper.vm.$data.firstNameRules;
    expect(evaluateInput('', rules)).toEqual(false);
    expect(
      evaluateInput(
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        rules,
      ),
    ).toEqual(false);
    expect(evaluateInput('Ty', rules)).toEqual(true);
    expect(evaluateInput('Michael', rules)).toEqual(true);
  });

  test('has correct sign-in validation for last names', () => {
    const rules = wrapper.vm.$data.lastNameRules;
    expect(evaluateInput('', rules)).toEqual(false);
    expect(
      evaluateInput(
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        rules,
      ),
    ).toEqual(false);
    expect(evaluateInput('Wu', rules)).toEqual(true);
    expect(evaluateInput('Robertson', rules)).toEqual(true);
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

/**
 * Loop through each input, check if it satisfies all rules (true) or doesn't (false).
 * Compare with outputs */
function evaluateInput(input, rules) {
  let output = true;
  for (const rule of rules) {
    if (rule(input) !== true) {
      output = false;
      break;
    }
  }
  return output;
}
