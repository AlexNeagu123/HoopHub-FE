<script lang="ts">
	import CommentComponent from './CommentComponent.svelte';
	import type { Comment } from '$lib/models/user_features/comments/Comment';
	import LoadingIcon from '../shared/LoadingIcon.svelte';
	import InfiniteLoading from 'svelte-infinite-loading';
	import CommentSelectContainer from './CommentSelectContainer.svelte';
	import { commentListTypes, commentsListQueryParams } from '$lib/constants';

	export let comments: Comment[];
	export let isLoading: boolean;
	export let fetchComments = async (isPopular: boolean) => {};
	export let commentsBatch: Comment[];
	export let firstCommentId: string | null = null;
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	export let selectedType: string;

	function infiniteHandler({
		detail: { loaded, complete }
	}: {
		detail: { loaded: () => void; complete: () => void };
	}) {
		fetchComments(selectedType === commentListTypes.POPULAR).then(() => {
			if (commentsBatch.length > 0) {
				loaded();
			} else {
				complete();
			}
		});
	}

	async function changeCommentsType() {
		const currentUrl = get(page).url;
		const searchParams = new URLSearchParams(currentUrl.search);
		searchParams.set(commentsListQueryParams.SORTING_TYPE, selectedType);
		const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`;
		window.location.href = newUrl;
	}
</script>

{#if isLoading}
	<LoadingIcon />
{:else}
	<div class="w-1/2">
		<CommentSelectContainer
			bind:selectedValue={selectedType}
			changeFunction={changeCommentsType}
			labelTitle={'Filter by'}
			optionsArray={[commentListTypes.NEWEST, commentListTypes.POPULAR]}
		/>
	</div>
	<div class="flex flex-col items-end w-full">
		{#each comments as comment}
			<CommentComponent {firstCommentId} {comment} />
		{/each}
	</div>
	<InfiniteLoading on:infinite={infiniteHandler}>
		<div slot="noMore"></div>
		<div slot="noResults"></div>
	</InfiniteLoading>
{/if}
