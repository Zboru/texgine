<template>
  <t-modal variant="plain" v-model="show">
    <template #title>Add comment</template>
    <template #content>
      <div class="flex">
        <img :src="userAvatar" class="w-12 h-12 border rounded-md mr-3 select-none" alt="">
        <t-text-area v-model="comment" class="w-full" placeholder="This game is great!"></t-text-area>
      </div>
    </template>
    <template #actions>
      <t-button :disabled="emptyComment" @click="saveComment" variant="success" class="ml-2">Save</t-button>
      <t-button @click="show = false">Cancel</t-button>
    </template>
    <portal to="alert">
      <t-alert borders variant="success" v-model="alerts.success">
        <template #title>Success!</template>
        <template #text>Successfully added comment to game.</template>
      </t-alert>
    </portal>
  </t-modal>
</template>

<script>
import httpManager from '../../../utils/httpManager';
import TModal from '../../General/TModal.vue';
import TTextArea from '../../General/TTextarea.vue';
import TButton from '../../General/TButton.vue';
import TAlert from '../../General/TAlert.vue';

export default {
  name: 'AddCommentDialog',
  props: {
    value: {
      type: Boolean,
    }
  },
  components: {
    TAlert,
    TButton,
    TTextArea,
    TModal
  },
  data() {
    return {
      alerts: {
        success: false,
      },
      comment: '',
    };
  },
  watch: {
    show(value) {
      if (value) {
        this.comment = '';
      }
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    game() {
      return this.$store.getters.getListGame;
    },
    userAvatar() {
      return this.$store.getters.getUser.avatar.url;
    },
    emptyComment() {
      return this.comment.length === 0;
    }
  },
  methods: {
    saveComment() {
      httpManager
          .post(`${import.meta.env.VITE_API_URL}/games/${this.game.id}/addComment`, { comment: this.comment })
          .then(response => {
            this.show = false;
            this.alerts.success = true;
            this.$set(this.game.comments, response.data.id, response.data);
          });
    }
  }
};
</script>
