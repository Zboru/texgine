<template>
  <div class="flex flex-col">
    <div class="flex">
      <t-icon :icon="icon"/>
      <span class="pl-2">{{ text }}</span>
    </div>
    <p class="ml-8">{{ value }}</p>
  </div>
</template>

<script>
import TIcon from '../General/TIcon.vue';

export default {
  name: 'GameCounter',
  components: { TIcon },
  props: ['icon', 'text', 'value'],
};
</script>
