import TAlert from '../components/General/TAlert.vue';
import '../assets/tailwind.css';

export default {
  title: 'General/TAlert',
  component: TAlert,
  argTypes: {
    variant: { control: { type: 'select', options: ['success', 'warning', 'danger'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TAlert },
  template: '<t-alert v-bind="$props"><template #title>{{title}}</template><template #text>{{text}}</template></t-alert>',
});

export const Warning = Template.bind({});
export const Success = Template.bind({});
export const Danger = Template.bind({});
export const Bordered = Template.bind({});

Warning.args = {
  variant: 'warning',
  borders: false,
  value: true,
  title: 'Oops! Something went wrong.',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque, beatae est et explicabo incidunt',
};

Success.args = {
  variant: 'success',
  borders: false,
  value: true,
  title: 'Everything is good!',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque, beatae est et explicabo incidunt',
};

Danger.args = {
  variant: 'danger',
  borders: false,
  value: true,
  title: 'Critical failure',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque, beatae est et explicabo incidunt',
};

Bordered.args = {
  variant: 'success',
  borders: true,
  value: true,
  title: 'Everything is good!',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque, beatae est et explicabo incidunt',
};
