<script lang="ts">
	import type { GameReview } from '$lib/models/user_features/reviews/GameReview';
	import InfiniteLoading from 'svelte-infinite-loading';
	import LoadingIcon from '../shared/LoadingIcon.svelte';
	import FanPageReviewComponent from './FanPageReviewComponent.svelte';
	import type { Team } from '$lib/models/nba_data/teams/Team';

	export let allReviewsLoading: boolean;
	export let reviews: GameReview[];
	export let reviewsBatch: GameReview[];
	export let fetchReviews: () => Promise<void>;

	export let teams: Team[];
	function extractTeam(review: GameReview, isHome: boolean): Team | null {
		const searchTeamId = isHome ? review.homeTeamId : review.visitorTeamId;
		return teams.find((team) => team.apiId === searchTeamId) || null;
	}

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
	<div class="flex flex-col w-full">
		{#each reviews as review}
			<FanPageReviewComponent
				{review}
				homeTeam={extractTeam(review, true)}
				visitorTeam={extractTeam(review, false)}
			/>
		{/each}
		<InfiniteLoading on:infinite={infiniteHandler}>
			<div slot="noMore"></div>
			<div slot="noResults"></div>
		</InfiniteLoading>
	</div>
{/if}
