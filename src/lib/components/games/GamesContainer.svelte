<script lang="ts">
	import type { Game } from '$lib/models/nba_data/games/Game';
	import Card from '$lib/components/shared/Card.svelte';
	import GamePreview from '$lib/components/games/GamePreview.svelte';
	import LoadingIcon from '$lib/components/shared/LoadingIcon.svelte';
	import type { GameReviewAverage } from '$lib/models/user_features/reviews/GameReviewAverage';

	export let isLoading: boolean = true;
	export let hiddenScores: boolean = false;

	export let games: Game[] = [];
	export let gameReviewAverages: GameReviewAverage[] = [];

	function getGameAverage(game: Game): number | null {
		const reviews = gameReviewAverages.filter(
			(review) =>
				review.homeTeamId === game.homeTeam.apiId &&
				review.visitorTeamId === game.visitorTeam.apiId &&
				review.date === game.date
		);

		if (reviews.length === 0) return null;

		return reviews[0].averageRating;
	}
</script>

<Card inputClass="mt-2">
	{#if isLoading}
		<LoadingIcon />
	{:else}
		<div class="flex w-full justify-center flex-wrap">
			{#each games as game}
				<GamePreview {hiddenScores} {game} average={getGameAverage(game)} />
			{/each}
		</div>
	{/if}
</Card>
