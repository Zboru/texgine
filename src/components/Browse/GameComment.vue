<template>
  <div class="border-2 p-2 mt-1 rounded flex">
    <img :src="comment.authorAvatar" class="w-12 h-12 border mr-3 select-none" alt="">
    <div class="flex flex-col text-sm">
      <p class="text-gray-400 italic font-medium select-none">{{ comment.author }} wrote:</p>
      <p>{{comment.text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameComment',
  props: {
    comment: {
      type: Object,
    }
  },
  computed: {
    randomAvatar() {
      const seed = Math.floor(Math.random() * 16);
      return `https://avatars.dicebear.com/api/micah/${seed}.svg`;
    },
  },
};
</script>
