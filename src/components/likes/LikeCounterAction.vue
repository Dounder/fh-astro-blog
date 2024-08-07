<template>
	<button v-if="likeCount === 0" @click="onLike" :disabled="isLoading" style="width: 10rem">
		{{ isLoading ? 'Loading...' : `Like this post` }}
	</button>

	<button v-else @click="onLike" :disabled="isLoading" style="width: 10rem">
		{{ isLoading ? 'Loading...' : `Likes: ${likeCount}` }}
	</button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import confetti from 'canvas-confetti';
import debounce from 'lodash.debounce';
import { actions } from 'astro:actions';

interface Props {
	postId: string;
}

const props = defineProps<Props>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch(
	likeCount,
	debounce(() => {
		actions.updatePostLikes({ postId: props.postId, likes: likeClicks.value });

		likeClicks.value = 0;
	}, 500)
);

const onLike = () => {
	likeCount.value++;
	likeClicks.value++;

	confetti({
		particleCount: 100,
		spread: 70,
		origin: { x: Math.random(), y: Math.random() - 0.2 },
	});
};

const getCurrentLikes = async () => {
	const { data } = await actions.getPostLikes(props.postId);

	if (!data) {
		isLoading.value = false;
		return;
	}

	likeCount.value = data.likes;

	isLoading.value = false;
};

getCurrentLikes();
</script>

<style scoped>
button {
	background-color: #5e51bc;
	color: white;
	padding: 1rem 2rem;
	border: none;
	border-radius: 0.5rem;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
}

button:hover {
	background-color: #4a41a8;
}
</style>
