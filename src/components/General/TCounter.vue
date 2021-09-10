<template>
  <div class="flex flex-col select-none">
    <template v-if="dense">
      <div class="flex">
        <t-icon :icon="icon"/>
        <span class="pl-2">{{ value }}</span>
      </div>
    </template>
    <template v-else>
      <div class="flex">
        <div>
          <t-icon :icon="icon"/>
        </div>
        <div class="ml-2">
          <span>{{ text }}</span>
          <p>{{ value }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import TIcon from './TIcon.vue';

export default {
  name: 'TCounter',
  components: { TIcon },
  props: {
    icon: {
      type: String,
    },
    value: {
      type: String,
    },
    dense: {
      type: Boolean,
    },
    text: {
      type: String,
    },
  },
};
</script>
