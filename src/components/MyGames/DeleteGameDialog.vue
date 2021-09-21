<template>
  <div>
    <t-modal icon-preset="danger" v-model="show">
      <template #title>
        Delete game
      </template>
      <template #description>
        Are you sure you want to delete this game? Game and its data will be permanently removed. This action cannot be undone.
      </template>
      <template #actions>
        <t-button :block="isMobile" variant="danger" :class="deleteButtonClasses" @click="deleteGame">Delete</t-button>
        <t-button :block="isMobile" @click="closeDialog">Cancel</t-button>
      </template>
    </t-modal>
    <portal to="alert">
      <t-alert variant="success" borders v-model="alert">
        <template #title>Success!</template>
        <template #text>Successfully deleted game from your library.</template>
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
  name: 'DeleteGameDialog',
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
    deleteButtonClasses() {
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
    deleteGame() {
      httpManager.delete(`${import.meta.env.VITE_API_URL}/games/${this.game.id}`).then((response) => {
        this.$emit('deleted', response.data.games);
        this.alert = true;
        this.show = false;
      });
    },
  },
};
</script>
