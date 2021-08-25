<template>
  <div class="container mx-auto bg-white rounded-2xl shadow-md mt-6 flex justify-center p-2">
    <div class="relative">
      <canvas class="rounded-2xl" id="c"></canvas>
<!--      <div class="controls left-0 absolute mt-4 ml-12 top-0 bg-white p-4 border">-->
<!--        <button @click="createRectangle" class="border px-2 mx-2" id="addLine">kwadrat</button>-->
<!--        <button @click="createConnection" class="border px-2 mx-2" id="addRect">linia</button>-->
<!--        <button @click="resetZoom" class="border px-2 mx-2" id="resetZoom">resetzoom</button>-->
<!--        <button @click="dialogs.create_step = true;" class="border px-2 mx-2" id="">diao</button>-->
<!--      </div>-->
    </div>
    <portal to="dialog">
      <step-details-dialog :steps="game.steps" v-model="dialogs.step_details" />
    </portal>
  </div>
</template>

<script>
import StepDetailsDialog from '../components/NewGame/StepDetailsDialog.vue';

export default {
  name: 'CreateNewGame',
  components: { StepDetailsDialog },
  data() {
    return {
      dialogs: {
        step_details: true,
      },
      game: {
        steps: [],
      },
    };
  },
};
</script>
