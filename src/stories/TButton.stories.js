import TButton from '../components/General/TButton.vue';
import '../assets/tailwind.css';

export default {
  title: 'TButton',
  component: TButton,
};

const Template = (args, { argTypes }) => ({
  components: { TButton },
  props: Object.keys(argTypes),
  template: '<t-button v-bind="$props">Test</t-button>',
});

export const Primary = Template.bind({});
export const Danger = Template.bind({});
export const Disabled = Template.bind({});
export const Block = Template.bind({});
export const withIcon = Template.bind({});

Primary.args = {
  variant: 'success',
  disabled: false,
  block: false,
  icon: '',
};

Danger.args = {
  variant: 'danger',
  disabled: false,
  block: false,
  icon: '',
};

Disabled.args = {
  variant: '',
  disabled: true,
  block: false,
  icon: '',
};

Block.args = {
  variant: '',
  disabled: false,
  block: true,
  icon: '',
};

withIcon.args = {
  variant: '',
  disabled: false,
  block: false,
  icon: 'star',
};
