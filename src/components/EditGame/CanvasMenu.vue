<template>
	<div class="controls left-0 absolute mt-4 ml-12 top-0 bg-white p-2 border rounded-md flex">
		<button @click="createRectangle" class="border rounded py-1 px-2 mx-2 flex" id="addLine">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transform -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
			</svg>
			<span class="ml-2">New step</span>
		</button>
		<button @click="resetZoom" class="border rounded py-1 px-2 mx-2 flex" id="resetZoom">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
			</svg>
			<span class="ml-2">Reset zoom</span>
		</button>
		<button @click="saveGame" class="border rounded py-1 px-2 mx-2 flex" id="save">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
			</svg>
			<span class="ml-2">Save</span>
		</button>
		<button @click="loadCanvas" class="border rounded py-1 px-2 mx-2 flex" id="load">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
			</svg>
			<span class="ml-2">Load</span>
		</button>
	</div>
</template>

<script>
export default {
	name: 'CanvasMenu',
	props: ['canvas'],
	methods: {
		createRectangle() {
			this.canvas.createRect(9999, 9999, '#faf', 'placeholder');
			this.canvas.isAddingRect = true;
		},
		resetZoom() {
			this.canvas.resetZoom();
		},
		saveGame() {
			const canvasJSON = JSON.stringify(this.canvas.canvas.toJSON());
			const gameJSON = JSON.stringify(this.game);
			localStorage.setItem('canvas', canvasJSON);
			localStorage.setItem('game', gameJSON);
			console.log(canvasJSON, gameJSON);
		},
		loadCanvas() {
			// parse the data into the canvas
			const json = localStorage.getItem('canvas');
			this.game = localStorage.getItem('game');
			this.canvas.canvas.loadFromJSON(json);

			// re-render the canvas
			this.canvas.canvas.renderAll();

			// optional
		},
	}
};
</script>
