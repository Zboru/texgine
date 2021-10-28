<template>
	<div class="border-2 p-2 mt-1 rounded flex flex-col">
		<div class="flex">
			<img :src="comment.authorAvatar" class="w-12 h-12 border mr-3 select-none" alt="">
			<div class="flex flex-col flex-grow text-sm">
				<p class="text-gray-400 italic font-medium select-none flex justify-between">
					<span>{{ comment.author }} wrote:</span>
					<span>{{ getDate(comment.created_at) }}</span>
				</p>
				<p>{{ comment.text }}</p>
			</div>
		</div>
		<div class="flex justify-between">
			<div class="flex justify-around mt-1 w-12">
				<t-icon @click="vote('1')" :class="{'text-green-500': voted(1)}" class="cursor-pointer hover:text-green-500"
						icon="bx:bx-upvote"></t-icon>
				<t-icon @click="vote('-1')" :class="{'text-red-500': voted(-1)}" class="cursor-pointer hover:text-red-500"
						icon="bx:bx-downvote"></t-icon>
			</div>
			<div class="flex items-center">
        <span class="flex items-center select-none">
          <t-icon class="mx-1 text-green-500" icon="bx:bx-upvote"></t-icon>
          {{upvotes}}
        </span>
				<span class="flex items-center select-none">
          <t-icon class="mx-1 text-red-500" icon="bx:bx-downvote"></t-icon>
          {{downvotes}}
        </span>
				<t-icon class="cursor-pointer ml-2" icon="heroicons-outline:dots-vertical"></t-icon>
			</div>
		</div>
	</div>
</template>

<script>
import TIcon from '../General/TIcon.vue';
import httpManager from '../../utils/httpManager';

export default {
	name: 'GameComment',
	components: { TIcon },
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
		listGame() {
			return this.$store.getters.getListGame;
		},
		upvotes() {
			return Object.values(this.comment.votes).filter(vote => vote === 1).length;
		},
		downvotes() {
			return Object.values(this.comment.votes).filter(vote => vote !== 1).length;
		}
	},
	methods: {
		getDate(date) {
			if (typeof date === 'object') {
				const unix = parseInt(date.seconds + '000');
				return new Date(unix).toLocaleString();
			} else {
				return new Date(date).toLocaleString();
			}
		},
		vote(type) {
			httpManager.post(`${import.meta.env.VITE_API_URL}/games/${this.listGame.id}/comment/${this.comment.id}/vote`, {
				type: type
			}).then(response => {
				this.comment.votes = response.data.votes;
			});
		},
		voted(type){
			return this.comment.votes[this.$store.getters.getUser.uid] === type;
		}
	}
};
</script>
