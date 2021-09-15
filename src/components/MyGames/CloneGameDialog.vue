<template>
  <div>
    <t-modal icon-preset="warning" v-model="show">
      <template #title>
        Clone game
      </template>
      <template #description>
        Are you sure you want to clone this game? Only basic data such as game content and information will be copied. Counters and comments will be resetted.
      </template>
      <template #actions>
        <t-button :block="isMobile" variant="success" :class="cloneButtonClasses" @click="cloneGame">Clone</t-button>
        <t-button :block="isMobile" @click="closeDialog">Cancel</t-button>
      </template>
    </t-modal>
    <portal to="alert">
      <t-alert variant="success" borders v-model="alert">
        <template #title>Success!</template>
        <template #text>Successfully clone game to your library.</template>
      </t-alert>
    </portal>
  </div>
</template>

<script>
import { useMediaQuery } from '@vueuse/core';
import TModal from '../General/TModal.vue';
import TButton from '../General/TButton.vue';
import httpManager from '../../utils/httpManager';
import TAlert from '../General/TAlert.vue';

export default {
  name: 'CloneGameDialog',
  components: { TAlert, TButton, TModal },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    game: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      alert: false,
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    isMobile() {
      return useMediaQuery('(max-width: 639px)').value;
    },
    cloneButtonClasses() {
      return {
        'ml-1': this.isMobile !== true,
        'mb-1': this.isMobile === true,
      };
    },
  },
  methods: {
    closeDialog() {
      this.show = false;
    },
    cloneGame() {
      httpManager.post(`${process.env.VUE_APP_API_URL}/games/${this.game.id}/clone`).then((response) => {
        this.$emit('cloned', response.data);
        this.alert = true;
        this.show = false;
      });
    },
  },
};
</script>
