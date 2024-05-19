<script lang="ts">
	import type { GameWithBoxScore } from '$lib/models/nba_data/box-scores/GameWithBoxScore';
	import type { GameReview } from '$lib/models/user_features/reviews/GameReview';
	import CreateReviewContainer from './CreateReviewContainer.svelte';
	import ReviewContainerReadonly from './ReviewContainerReadonly.svelte';
	import ReviewTopButton from './ReviewTopButton.svelte';

	export let ownGameReview: GameReview;
	export let gameDetails: GameWithBoxScore;

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
