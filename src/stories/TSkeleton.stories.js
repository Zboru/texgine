import TSkeleton from '../components/General/TSkeleton.vue';
import '../assets/tailwind.css';

export default {
  title: 'General/TSkeleton',
  component: TSkeleton,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TSkeleton },
  template: '<t-skeleton v-bind="$props"></t-skeleton>',
});

export const Normal = Template.bind({});
