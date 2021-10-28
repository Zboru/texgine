<template>
	<t-container class="grid grid-cols-2 h-3/4 divide-x">
		<div class="px-2">
			<browse-header/>
			<div class="mt-2">
				<empty-game-list v-show="!gamesExist"/>
				<template v-if="gamesExist" v-for="(game, index) in games">
					<game-bar :game="game" @click="setListGame(game)" class="mt-1" :key="index"></game-bar>
				</template>
			</div>
		</div>
		<div class="flex flex-col px-2">
			<game-actions/>
			<game-details class="flex-grow"></game-details>
		</div>
	</t-container>
</template>

<script>
import TContainer from '../components/General/TContainer.vue';
import GameBar from '../components/Browse/GameBar.vue';
import GameDetails from '../components/Browse/GameDetails.vue';
import EmptyGameList from '../components/Browse/EmptyGameList.vue';
import BrowseHeader from '../components/Browse/BrowseHeader.vue';
import GameActions from '../components/Browse/GameActions.vue';
import httpManager from '../utils/httpManager';

export default {
	name: 'Browse',
	components: {
		GameActions,
		BrowseHeader,
		EmptyGameList,
		GameDetails,
		GameBar,
		TContainer,
	},
	data() {
		return {
			games: []
		};
	},
	beforeCreate() {
		// Reset game variable in store so there's no unexpected behaviour
		this.$store.commit('setListGame', {});
	},
	created() {
		httpManager.get(`${import.meta.env.VITE_API_URL}/games`)
			.then((response) => {
				this.games = response.data;
			});
	},
	computed: {
		gamesExist() {
			return Object.keys(this.games).length > 0;
		}
	},
	methods: {
		setListGame(game) {
			this.$store.commit('setListGame', game);
		},
	}
};
</script>
