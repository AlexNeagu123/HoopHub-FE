<script lang="ts">
	import type { PageData } from './$types';
	import GameWithBoxScoreC from '$lib/components/games/GameWithBoxScoreC.svelte';

	import { DynamicPaginationThresholds, GamePageTypes } from '$lib/constants';
	import type { Comment } from '$lib/models/user_features/comments/Comment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import getCommentsByThread from '$lib/services/user_features/comments/getCommentsByThread';
	import WriteCommentContainer from '$lib/components/comments/WriteCommentContainer.svelte';
	import addComment from '$lib/services/user_features/comments/addComment';
	import CommentsList from '$lib/components/comments/CommentsList.svelte';

	export let data: PageData;

	let gameDetails = data.gameWithBoxScore;
	let gameThread = data.gameThread;
	let firstCommentId: string | null = $page.url.searchParams.get('firstComment');
	let passCommentId = firstCommentId;

	let commentsBatch: Comment[] = [];
	let comments: Comment[] = [];

	let validationErrors: { [key: string]: string } = {};
	let isLoading = false;

	$: comments = [...comments, ...commentsBatch];

	let currentPage = 1;
	let currentSize = DynamicPaginationThresholds.CommentsThreshold;

	let rootCommentAdded: boolean = false;
	function toggleAddRootComment() {
		rootCommentAdded = !rootCommentAdded;
	}

	async function fetchComments() {
		commentsBatch = await getCommentsByThread(
			currentPage,
			currentSize,
			false,
			firstCommentId,
			null,
			gameThread.id
		);

		firstCommentId = null;
		currentPage++;
	}

	async function onSubmitComment(comment: string) {
		var response = await addComment(comment, null, gameThread.id);
		if (response.success === false) {
			validationErrors = response.validationErrors;
		} else {
			window.location.reload();
		}
	}

	onMount(async () => {
		isLoading = true;
		await fetchComments();
		isLoading = false;
	});
</script>

<GameWithBoxScoreC {gameDetails} pageType={GamePageTypes.THREAD}>
	<div class="flex justify-center">
		<div class="w-[80%]">
			<div
				class="card flex flex-col variant-filled-surface border-b-2 border-primary-400 w-full justify-between"
			>
				<button
					class="btn btn-primary hover:variant-filled-secondary items-center rounded-md"
					on:click={toggleAddRootComment}>Add a comment</button
				>
			</div>
			{#if rootCommentAdded}
				<WriteCommentContainer
					bind:active={rootCommentAdded}
					bind:validationErrors
					onSubmit={onSubmitComment}
				/>
			{/if}
			<div class="flex flex-col w-full py-5">
				<CommentsList
					firstCommentId={passCommentId}
					bind:isLoading
					bind:comments
					bind:commentsBatch
					{fetchComments}
				/>
			</div>
		</div>
	</div>
</GameWithBoxScoreC>
