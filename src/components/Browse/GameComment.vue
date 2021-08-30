<template>
  <div class="border-2 p-2 mt-1 rounded flex">
    <img :src="randomAvatar" class="w-12 h-12 border mr-3 select-none" alt="">
    <div class="flex flex-col text-sm">
      <p class="text-gray-400 italic font-medium select-none">zboru wrote:</p>
      <p class="">Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Ab accusantium ad assumenda ex expedita
        maxime natus, nihil nostrum possimus quas, quibusdam
        quo sint tempora. Earum hic impedit nisi officiis vitae?</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameComment',
  computed: {
    randomAvatar() {
      const seed = Math.floor(Math.random() * 16);
      return `https://avatars.dicebear.com/api/micah/${seed}.svg`;
    },
  },
};
</script>
