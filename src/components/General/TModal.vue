<template>
  <div v-show="show" class="fixed z-10 inset-0 overflow-y-auto" @click="show = false">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!--
        Background overlay, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <div @click.stop="doNothing" class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg sm:mx-0 sm:h-10 sm:w-10" :class="iconBackground">
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
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <slot name="actions">
            <t-button>Cancel</t-button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TIcon from './TIcon.vue';
import TButton from './TButton.vue';

export default {
  name: 'TModal',
  components: { TButton, TIcon },
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
