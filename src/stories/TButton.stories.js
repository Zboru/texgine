import TButton from '../components/General/TButton.vue';
import '../assets/tailwind.css';

export default {
  title: 'General/TButton',
  component: TButton,
  argTypes: {
    variant: { control: { type: 'select', options: ['null', 'success', 'primary', 'danger'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TButton },
  template: '<t-button @onClick="onClick" v-bind="$props">Test</t-button>',
});

export const Primary = Template.bind({});
export const Danger = Template.bind({});
export const Disabled = Template.bind({});
export const Block = Template.bind({});
export const withIcon = Template.bind({});
export const Loading = Template.bind({});

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

Loading.args = {
  variant: 'success',
  loading: true,
  disabled: false,
  block: false,
  icon: '',
};
