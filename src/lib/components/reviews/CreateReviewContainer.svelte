<script lang="ts">
	export let isActive: boolean = false;

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	import StarRating from '@ernane/svelte-star-rating';
	import ScoreContainer from '$lib/components/reviews/ScoreContainer.svelte';
	import WriteReviewContainer from '$lib/components/reviews/WriteReviewContainer.svelte';
	import { GameStarRatingConfig } from '$lib/constants';
	import addGameReview from '$lib/services/user_features/game-reviews/addGameReview';
	import updateGameReview from '$lib/services/user_features/game-reviews/updateGameReview';

	export let selectedScore: number | null = 0;
	export let isUpdate: boolean = false;
	export let homeTeamId: number;
	export let visitorTeamId: number;
	export let date: string;
	export let textData: string | null = '';

	let validationErrors: { [key: string]: string } = {};
	let config = GameStarRatingConfig;

	if (isUpdate && selectedScore) {
		config.score = selectedScore;
	}

	function changeTriggered(e: { target: { valueAsNumber: any } }) {
		selectedScore = e.target.valueAsNumber;
	}

	async function onSubmitReview(content: string) {
		const response = await addGameReview(selectedScore!, content, homeTeamId, visitorTeamId, date);
		if (!response.success) {
			validationErrors = response.validationErrors;
		} else {
			window.location.reload();
		}
	}

	async function onSubmitUpdate(content: string) {
		const response = await updateGameReview(
			selectedScore!,
			content,
			homeTeamId,
			visitorTeamId,
			date
		);
		if (!response.success) {
			validationErrors = response.validationErrors;
		} else {
			window.location.reload();
		}
	}
</script>

<div class="flex justify-center">
	<div class="shadow p-5 mt-4 w-2/3">
		<StarRating {config} on:change={changeTriggered} />
		<ScoreContainer bind:selectedScore maxScore={5} />
		{#if isUpdate}
			<WriteReviewContainer
				bind:textData
				bind:active={isActive}
				bind:validationErrors
				onSubmit={onSubmitUpdate}
			/>
		{:else}
			<WriteReviewContainer
				bind:textData
				bind:active={isActive}
				bind:validationErrors
				onSubmit={onSubmitReview}
			/>
		{/if}
	</div>
</div>
