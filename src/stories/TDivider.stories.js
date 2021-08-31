import TDivider from '../components/General/TDivider.vue';
import '../assets/tailwind.css';

export default {
  title: 'General/TDivider',
  component: TDivider,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TDivider },
  template: '<t-divider v-bind="$props"></t-divider>',
});

export const Normal = Template.bind({});
export const WithText = Template.bind({});
export const WithIcon = Template.bind({});

WithText.args = {
  text: 'Lorem ipsum',
};

WithIcon.args = {
  icon: 'heart',
};
