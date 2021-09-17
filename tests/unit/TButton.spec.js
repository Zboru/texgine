import { mount } from '@vue/test-utils';
import TButton from '../../src/components/General/TButton.vue';

test('displays default label', () => {
  const wrapper = mount(TButton);
  expect(wrapper.text()).toContain('Button');
});

test('changed default slot displays different label', () => {
  const wrapper = mount(TButton, {
    slots: {
      default: 'Close',
    },
  });
  expect(wrapper.text()).toContain('Close');
});

test('disabled button cannot be clicked', async () => {
  const onClick = jest.fn();
  const wrapper = mount(TButton, {
    propsData: {
      disabled: true,
    },
    listeners: {
      click: onClick,
    },
  });
  await wrapper.find('button').trigger('click');
  expect(onClick).not.toHaveBeenCalled();
});
