<script lang="ts">
	import type { PageData } from './$types';
	import GameWithBoxScoreC from '$lib/components/games/GameWithBoxScoreC.svelte';
	import { GamePageTypes } from '$lib/constants';
	import TeamPlayersPerformancesContainer from '$lib/components/performances/TeamPlayersPerformancesContainer.svelte';

	export let data: PageData;

	let gameDetails = data.gameWithBoxScore;
	let gameReviewAverages = data.gameReviewAverages;
    let averagePerformanceRatings = data.averagePerformanceRatings;
</script>

<GameWithBoxScoreC {gameDetails} pageType={GamePageTypes.PERFORMANCES} {gameReviewAverages}>
	<div class="flex w-full justify-around flex-wrap">
        <TeamPlayersPerformancesContainer players={gameDetails.visitorTeam.players} {averagePerformanceRatings} {gameDetails}/>
        <TeamPlayersPerformancesContainer players={gameDetails.homeTeam.players} {averagePerformanceRatings} {gameDetails}/>
	</div>
</GameWithBoxScoreC>
