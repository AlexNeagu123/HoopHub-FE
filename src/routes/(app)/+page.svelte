<script lang="ts">
	import { onMount } from 'svelte';
	import getRecentBoxScores from '$lib/services/nba_data/games/getRecentBoxScores';
	import LoadingIcon from '$lib/components/shared/LoadingIcon.svelte';
	import type { LocalStoredBoxScoresDto } from '$lib/models/nba_data/box-scores/LocalStoredBoxScores';
	import type { LocalStoredGame } from '$lib/models/nba_data/games/LocalStoredGame';
	import RecentGamesCarousel from '$lib/components/homepage/RecentGamesCarousel.svelte';
	import ImpressivePerformancesCarousel from '$lib/components/homepage/ImpressivePerformancesCarousel.svelte';

	let isLoading = false;
	let recentBoxScores: LocalStoredBoxScoresDto[] = [];
	let recentGames: LocalStoredGame[] = [];

	onMount(async () => {
		isLoading = true;
		recentBoxScores = await getRecentBoxScores();

		recentGames = recentBoxScores.map((boxScore) => boxScore.game);
		recentGames = recentGames.filter(
			(game, index, self) =>
				index ===
				self.findIndex(
					(t) =>
						t.visitorTeam.id === game.visitorTeam.id &&
						t.homeTeam.id === game.homeTeam.id &&
						t.date === game.date
				)
		);

		isLoading = false;
	});
</script>

{#if isLoading}
	<div class="flex justify-center">
		<LoadingIcon />
	</div>
{:else}
	<div class="flex flex-col h-full items-center justify-center">
		<RecentGamesCarousel {recentGames} />
		<ImpressivePerformancesCarousel boxScores={recentBoxScores} />
	</div>
{/if}
