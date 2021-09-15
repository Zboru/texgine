import TModal from '../components/General/TModal.vue';
import '../assets/tailwind.css';

export default {
  title: 'General/TModal',
  component: TModal,
  argTypes: {
    showModal: { control: 'boolean' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TModal },
  template: '<t-modal v-model="showModal" v-bind="$props"><template #title>{{title}}</template><template #description>{{description}}</template></t-modal>',
});

export const Normal = Template.bind({});
export const Danger = Template.bind({});
export const Warning = Template.bind({});

Normal.args = {
  showModal: true,
  iconPreset: 'info',
  title: 'Info modal',
  description: 'Informational modal',
};

Danger.args = {
  showModal: true,
  iconPreset: 'danger',
  title: 'Danger modal',
  description: 'Modal containing dangerous information',
};

Warning.args = {
  showModal: true,
  iconPreset: 'warning',
  title: 'Warning modal',
  description: 'Modal containing some kind of warning',
};
