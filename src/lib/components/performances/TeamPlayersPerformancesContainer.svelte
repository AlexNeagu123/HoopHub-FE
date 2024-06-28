<script lang="ts">
	import type { BoxScorePlayer } from '$lib/models/nba_data/box-scores/BoxScorePlayer';
	import type { GameWithBoxScore } from '$lib/models/nba_data/box-scores/GameWithBoxScore';
	import type { PlayerPerformanceAverage } from '$lib/models/user_features/performances/PlayerPerformanceAverage';

	import PlayerPerformanceCard from './PlayerPerformanceCard.svelte';

	export let players: BoxScorePlayer[] = [];
	export let averagePerformanceRatings: PlayerPerformanceAverage[] = [];
	export let gameDetails: GameWithBoxScore;

	players = players.filter((player) => Number(player.min) > 0);

	function getPlayerAverageRating(player: BoxScorePlayer): number | null {
		const playerAverage = averagePerformanceRatings.find(
			(average) => average.playerId === player.player!.id
		);
		return playerAverage ? playerAverage.averageRating : null;
	}

	function getPlayerOwnRating(player: BoxScorePlayer): number | null {
		const playerAverage = averagePerformanceRatings.find(
			(average) => average.playerId === player.player!.id
		);
		return playerAverage ? playerAverage.ownRating : null;
	}
</script>

<div class="flex md:w-[40%] justify-center md:justify-start">
	<div class="w-full flex flex-col">
		{#each players as playerWithBoxScore}
			<PlayerPerformanceCard
				{playerWithBoxScore}
				averageRating={getPlayerAverageRating(playerWithBoxScore)}
				ownRating={getPlayerOwnRating(playerWithBoxScore)}
				{gameDetails}
			/>
		{/each}
	</div>
</div>
