<script lang="ts">
	import InfiniteLoading from 'svelte-infinite-loading';
	import LoadingIcon from '../shared/LoadingIcon.svelte';
	import ThreadPreview from './ThreadPreview.svelte';
	import type { TeamThread } from '$lib/models/user_features/threads/TeamThread';
	import { ThreadWidthTypes } from '$lib/constants';

	export let fetchData = async () => {};
	export let threadsBatch: TeamThread[] = [];
	export let threads: TeamThread[] = [];
	export let isLoading: boolean = true;
	export let threadWidthType: string = ThreadWidthTypes.HALF;

	function infiniteHandler({
		detail: { loaded, complete }
	}: {
		detail: { loaded: () => void; complete: () => void };
	}) {
		fetchData().then(() => {
			if (threadsBatch.length > 0) {
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
	<div
		class="mt-5 flex flex-wrap {threadWidthType === ThreadWidthTypes.FULL
			? 'justify-center'
			: 'justify-between'}"
	>
		{#each threads as t}
			<ThreadPreview
				id={t.id}
				title={t.title}
				author={t.fan}
				time={t.createdDate}
				content={t.content}
				upvotes={t.upVotes}
				downvotes={t.downVotes}
                threadVoteStatus={t.voteStatus}
				{threadWidthType}
			/>
		{/each}
	</div>
	<InfiniteLoading on:infinite={infiniteHandler}>
		<div slot="noMore"></div>
		<div slot="noResults"></div>
	</InfiniteLoading>
{/if}
