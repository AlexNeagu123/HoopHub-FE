<script lang="ts">
	import type { PageData } from './$types';
	import GameWithBoxScoreC from '$lib/components/games/GameWithBoxScoreC.svelte';
	import CreateReviewContainer from '$lib/components/reviews/CreateReviewContainer.svelte';
	import { GamePageTypes } from '$lib/constants';
	import ReviewTopButton from '$lib/components/reviews/ReviewTopButton.svelte';
	import ReviewContainerReadonly from '$lib/components/reviews/ReviewContainerReadonly.svelte';

	export let data: PageData;

	let gameDetails = data.gameWithBoxScore;
	let ownGameReview = data.ownGameReview;
	let date = gameDetails.date;

	let addReviewActive = false;
	let isUpdateReadonly = false;

	let selectedScore: number | null = ownGameReview.fan == null ? 0 : ownGameReview.rating;
	let textData: string | null = ownGameReview.fan == null ? '' : ownGameReview.content;

	function toggleAddReview() {
		addReviewActive = !addReviewActive;
	}

	function toggleUpdate() {
		isUpdateReadonly = !isUpdateReadonly;
	}
</script>

<GameWithBoxScoreC {gameDetails} pageType={GamePageTypes.REVIEWS}>
	{#if ownGameReview.fan == null}
		<ReviewTopButton onClick={toggleAddReview} text={'Add a review'} />
		{#if addReviewActive}
			<CreateReviewContainer
				bind:isActive={addReviewActive}
				bind:selectedScore
				homeTeamId={gameDetails.homeTeam.apiId}
				visitorTeamId={gameDetails.visitorTeam.apiId}
				{date}
			/>
		{/if}
	{:else}
		<ReviewTopButton onClick={toggleUpdate} text={'Update your review'} />
		{#if isUpdateReadonly}
			<CreateReviewContainer
				bind:isActive={isUpdateReadonly}
				bind:selectedScore
				bind:textData
				isUpdate={true}
				homeTeamId={gameDetails.homeTeam.apiId}
				visitorTeamId={gameDetails.visitorTeam.apiId}
				{date}
			/>
		{:else}
			<ReviewContainerReadonly {ownGameReview} />
		{/if}
	{/if}
</GameWithBoxScoreC>
