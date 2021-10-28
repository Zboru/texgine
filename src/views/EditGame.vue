<template>
	<div class="container mx-auto bg-white rounded-2xl shadow-md mt-6 flex p-2">
		<div class="relative">
			<canvas class="rounded-2xl" id="c"></canvas>
			<canvas-menu :canvas="canvas"/>
		</div>
		<game-details-sidebar v-model="game"/>
		<portal to="dialog">
			<step-details-dialog @save="saveStep" @deleted="saveCanvas" :step="selectedStep"
								 v-model="dialogs.step_details"/>
		</portal>
	</div>
</template>

<script>
import StepDetailsDialog from '../components/EditGame/StepDetailsDialog.vue';
import Canvas from '../canvas/canvas';
import GameDetailsSidebar from '../components/EditGame/GameDetailsSidebar.vue';
import httpManager from '../utils/httpManager';
import CanvasMenu from '../components/EditGame/CanvasMenu.vue';

export default {
	name: 'EditGame',
	components: {
		CanvasMenu,
		GameDetailsSidebar,
		StepDetailsDialog
	},
	data() {
		return {
			canvas: new Canvas(),
			sidebar: false,
			dialogs: {
				step_details: false,
			},
			selectedStep: {},
		};
	},
	computed: {
		game: {
			get() {
				return this.$store.getters.getGame;
			},
			set(value) {
				this.$store.commit('setGame', value);
			}
		}
	},
	watch: {
		game: {
			handler() {
				this.saveGameFirebase();
			},
			deep: true,
		},
	},
	mounted() {
		this.canvas.init();
		// Save canvas object to store to use its functions everywhere
		this.$store.state.canvas = this.canvas;
		this.loadGame();
		this.registerListeners();
	},
	methods: {
		/*
		  Load game from Vuex or Firebase if there was direct connection
		 */
		loadGame() {
			const game = this.$store.getters.getGame;
			if (Object.keys(game).length !== 0) {
				this.game = game;
				if (JSON.stringify(this.game.canvas) !== '{}') {
					this.canvas.canvas.loadFromJSON(this.game.canvas, () => {
						this.canvas.canvas.renderAll();
					});
				}
			} else {
				this.$store.dispatch('loadGameData', this.$route.params.id)
					.then(() => {
						this.game = this.$store.getters.getGame;
						this.canvas.canvas.loadFromJSON(this.game.canvas, () => {
							this.canvas.canvas.renderAll();
						});
					});
			}
		},
		/*
		  Everytime game properties change, save game in cloud
		 */
		saveGameFirebase() {
			httpManager.put(`${import.meta.env.VITE_API_URL}/games/${this.game.id}`, this.game);
		},
		saveCanvas() {
			const canvasJSON = this.canvas.canvas.toJSON(['internal_id', 'id', 'hasControls', 'hasBorders', 'moveCursor', 'hoverCursor']);
			canvasJSON.objects = canvasJSON.objects.filter(obj => obj.type !== 'line');
			this.game.canvas = JSON.stringify(canvasJSON);
			this.saveGameFirebase();
		},
		registerListeners() {
			// Show dialog after double-clicking node
			this.canvas.vue.$on('editNode', (node) => {
				console.log(node);
				this.selectedStep = { ...this.game.steps[node.internal_id] };
				this.dialogs.step_details = true;
			});
			// Show dialog after placing new node
			this.canvas.vue.$on('createNode', (node) => {
				// Create new step object
				const step = {
					id: node.id,
					internal_id: node.id,
					imageURL: null,
					description: null,
					choices: [],
				};
				// Save it in Vuex store
				this.$store.commit('saveStep', step);

				// Select created step
				this.selectedStep = { ...this.game.steps[step.id] };
				// Save canvas to Firebase
				this.saveCanvas();
				this.dialogs.step_details = true;
			});
			this.canvas.vue.$on('nodeMoved', (node) => {
				this.saveCanvas();
			});
		},
		saveStep() {
			// Update step in Vuex store
			this.$store.commit('saveStep', this.selectedStep);
			// Change canvas node id
			this.canvas.setNodeID(this.selectedStep.id);
			// Save canvas to Firebase
			this.saveCanvas();
			// Draw connections between steps
			// this.makeConnections();
		},
		makeConnections() {
			const steps = this.$store.getters.getSteps;
			const connections = [];
			steps.forEach((step) => {
				const choices = step.choices;
				if (choices && choices.length) {
					choices.forEach((choice) => {
						if (choice.linkTo) {
							connections.push({
								source: step.id,
								target: choice.linkTo,
							});
						}
					});
				}
			});
			this.canvas.createConnections(connections);
		},
	},
};
</script>
