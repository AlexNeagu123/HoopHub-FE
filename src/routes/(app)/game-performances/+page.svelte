<script lang="ts">
	import type { PageData } from './$types';
	import GameWithBoxScoreC from '$lib/components/games/GameWithBoxScoreC.svelte';
	import { GamePageTypes } from '$lib/constants';
	import TeamPlayersPerformancesContainer from '$lib/components/performances/TeamPlayersPerformancesContainer.svelte';
	import { completeStats } from '$lib/utils/game-stats';
	import { onMount } from 'svelte';
	import LoadingIcon from '$lib/components/shared/LoadingIcon.svelte';

	export let data: PageData;

	let gameDetails = data.gameWithBoxScore;
	let gameReviewAverages = data.gameReviewAverages;
	let averagePerformanceRatings = data.averagePerformanceRatings;
	let allPlayers = data.allPlayers;
	let isLoading = true;

	onMount(() => {
		gameDetails.homeTeam.players = completeStats(gameDetails.homeTeam.players, allPlayers);
		gameDetails.visitorTeam.players = completeStats(gameDetails.visitorTeam.players, allPlayers);
		isLoading = false;
	});
</script>

{#if isLoading}
	<LoadingIcon />
{:else}
	<GameWithBoxScoreC {gameDetails} pageType={GamePageTypes.PERFORMANCES} {gameReviewAverages}>
		<div class="flex w-full justify-around flex-wrap">
			<TeamPlayersPerformancesContainer
				players={gameDetails.visitorTeam.players}
				{averagePerformanceRatings}
				{gameDetails}
			/>
			<TeamPlayersPerformancesContainer
				players={gameDetails.homeTeam.players}
				{averagePerformanceRatings}
				{gameDetails}
			/>
		</div>
	</GameWithBoxScoreC>
{/if}
