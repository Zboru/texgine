<template>
  <div>
    <t-overlay @click="show = false" :state="show"></t-overlay>
    <div style="z-index: 2" :class="sidebarClass" class="absolute top-0 flex items-center transition">
      <div class="bg-white w-80 h-screen shadow">
        <slot></slot>
      </div>
      <div @click="show = !show" :class="buttonClasses" class="bg-white h-12 flex items-center cursor-pointer border-b-2 border-t-2 border-gray-400">
        <t-icon class="transition" :class="iconClass" v-if="position === 'left'" icon="chevron-right"></t-icon>
        <t-icon class="transition" :class="iconClass" v-else icon="chevron-left"></t-icon>
      </div>
    </div>
  </div>

</template>

<script>
import TIcon from './TIcon.vue';
import TOverlay from './TOverlay.vue';

export default {
  name: 'TSidebar',
  components: { TOverlay, TIcon },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'left',
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
    sidebarClass() {
      return {
        'transform -translate-x-80': this.show === false && this.position === 'left',
        'transform translate-x-80': this.show === false && this.position === 'right',
        'left-0': this.position === 'left',
        'right-0 flex-row-reverse': this.position === 'right',
      };
    },
    buttonClasses() {
      return {
        'border-r-2 rounded-r': this.position === 'left',
        'border-l-2 rounded-l': this.position === 'right',
      };
    },
    iconClass() {
      return {
        'transform -rotate-180': this.show === true && this.position === 'left',
        'transform rotate-180': this.show === true && this.position === 'right',
      };
    },
  },
};
</script>
