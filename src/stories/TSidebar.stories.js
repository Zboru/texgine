import TSidebar from '../components/General/TSidebar.vue';
import '../assets/tailwind.css';

export default {
  title: 'General/TSidebar',
  component: TSidebar,
  argTypes: {
    showSidebar: { control: 'boolean' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TSidebar },
  template: '<t-sidebar v-model="showSidebar" v-bind="$props"></t-sidebar>',

});

export const Hidden = Template.bind({});
export const Visible = Template.bind({});
export const OnLeft = Template.bind({});
export const OnRight = Template.bind({});

Hidden.args = {
  showSidebar: false,
};

Visible.args = {
  showSidebar: true,
};

OnLeft.args = {
  showSidebar: true,
  position: 'left',
};

OnRight.args = {
  showSidebar: true,
  position: 'right',
};
