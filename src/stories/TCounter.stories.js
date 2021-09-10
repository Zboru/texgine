import TCounter from '../components/General/TCounter.vue';
import '../assets/tailwind.css';

export default {
  title: 'General/TCounter',
  component: TCounter,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TCounter },
  template: '<t-counter v-bind="$props"></t-counter>',
});

export const Normal = Template.bind({});

Normal.args = {
  text: 'Rating',
  icon: 'star',
  value: 4.5,
  dense: false,
};

export const Dense = Template.bind({});

Dense.args = {
  text: '',
  icon: 'heart',
  value: 100,
  dense: true,
};
