<template>
  <t-overlay :state="show" @click="show = false" class="flex items-end sm:items-center justify-center">
    <div @click.stop="doNothing" class="bg-white p-0.5 rounded-lg shadow-xl sm:max-w-lg sm:w-full">
      <div v-if="variant === 'alert'" class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg sm:mx-0 sm:h-10 sm:w-10"
              :class="iconBackground">
            <t-icon :icon="icon" :color="iconColor"></t-icon>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              <slot name="title"></slot>
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                <slot name="description"></slot>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="variant === 'plain'" class="bg-white">
        <div class="sm:flex px-6 py-4 sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              <slot name="title"></slot>
            </h3>
            <div class="mt-2">
              <slot name="content"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <slot name="actions">
          <t-button>Cancel</t-button>
        </slot>
      </div>
    </div>
  </t-overlay>
</template>

<script>
import TIcon from './TIcon.vue';
import TButton from './TButton.vue';
import TOverlay from './TOverlay.vue';

export default {
  name: 'TModal',
  components: {
    TOverlay,
    TButton,
    TIcon
  },
  props: {
    title: {
      type: String,
    },
    value: {
      type: Boolean,
      default: false,
    },
    iconPreset: {
      type: String,
      default: 'info',
    },
    variant: {
      type: String,
      default: 'alert'
    }
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
    icon() {
      switch (this.iconPreset) {
        case 'danger':
          return 'exclamation';
        case 'warning':
          return 'exclamation';
        case 'info':
          return 'question-mark-circle';
        default:
          return 'star';
      }
    },
    iconColor() {
      switch (this.iconPreset) {
        case 'danger':
          return 'text-red-400';
        case 'warning':
          return 'text-yellow-400';
        case 'info':
          return 'text-blue-400';
        default:
          return 'star';
      }
    },
    iconBackground() {
      switch (this.iconPreset) {
        case 'danger':
          return 'bg-red-50';
        case 'warning':
          return 'bg-yellow-50';
        case 'info':
          return 'bg-blue-50';
        default:
          return 'star';
      }
    },
  },
  methods: {
    doNothing() {
      return true;
    },
  },
};
</script>
