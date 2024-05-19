<script lang="ts">
	import type { GameReview } from '$lib/models/user_features/reviews/GameReview';
	import InfiniteLoading from 'svelte-infinite-loading';
	import LoadingIcon from '../shared/LoadingIcon.svelte';
	import ReviewComponent from './ReviewComponent.svelte';
	import AllReviewsTitle from './AllReviewsTitle.svelte';

	export let allReviewsLoading: boolean;
	export let reviews: GameReview[];
	export let reviewsBatch: GameReview[];
	export let fetchReviews: () => Promise<void>;

	function infiniteHandler({
		detail: { loaded, complete }
	}: {
		detail: { loaded: () => void; complete: () => void };
	}) {
		fetchReviews().then(() => {
			if (reviewsBatch.length > 0) {
				loaded();
			} else {
				complete();
			}
		});
	}
</script>

{#if allReviewsLoading}
	<LoadingIcon />
{:else}
		<div class="flex flex-col w-full m-5">
			<AllReviewsTitle />
			{#each reviews as review}
				<ReviewComponent {review} />
			{/each}
		</div>
		<InfiniteLoading on:infinite={infiniteHandler}>
			<div slot="noMore"></div>
			<div slot="noResults"></div>
		</InfiniteLoading>
{/if}
