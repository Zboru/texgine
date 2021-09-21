import GameListHeader from '../../components/MyGames/MyGamesHeader.vue';
import '../../assets/tailwind.css';

export default {
  title: 'My games/GameListHeader',
  component: GameListHeader,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GameListHeader },
  template: '<game-list-header v-bind="$props" />',
});

export const Normal = Template.bind({});
