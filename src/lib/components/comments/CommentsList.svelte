<script lang="ts">
	import CommentComponent from './CommentComponent.svelte';
	import type { Comment } from '$lib/models/user_features/comments/Comment';
	import LoadingIcon from '../shared/LoadingIcon.svelte';
	import InfiniteLoading from 'svelte-infinite-loading';

	export let comments: Comment[];
	export let isLoading: boolean;
	export let fetchComments = async () => {};
	export let commentsBatch: Comment[];

	function infiniteHandler({
		detail: { loaded, complete }
	}: {
		detail: { loaded: () => void; complete: () => void };
	}) {
		fetchComments().then(() => {
			if (commentsBatch.length > 0) {
				loaded();
			} else {
				complete();
			}
		});
	}
</script>

{#if isLoading}
	<LoadingIcon />
{:else}
	<div class="flex flex-col items-end w-full">
		{#each comments as comment}
			<CommentComponent {comment} />
		{/each}
	</div>
	<InfiniteLoading on:infinite={infiniteHandler}>
		<div slot="noMore"></div>
		<div slot="noResults"></div>
	</InfiniteLoading>
{/if}
