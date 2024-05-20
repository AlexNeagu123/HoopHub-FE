<script lang="ts">
	import type { PageData } from './$types';
	import GameWithBoxScoreC from '$lib/components/games/GameWithBoxScoreC.svelte';

	import { GamePageTypes, TableTypes } from '$lib/constants';
	import Table from '$lib/components/shared/Table.svelte';
	import { SlideToggle, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { BoxScorePlayer } from '$lib/models/nba_data/box-scores/BoxScorePlayer';
	import { completeStats } from '$lib/utils/game-stats';
	import { liveBoxScoreStore } from '$lib/stores/live-games.store';
	import { onDestroy } from 'svelte';
	import type { GameWithBoxScore } from '$lib/models/nba_data/box-scores/GameWithBoxScore';

	export let data: PageData;

	let gameDetails = data.gameWithBoxScore;
	let gameReviewAverages = data.gameReviewAverages;

	const headFieldsForSorting: string[] = [
		'MIN',
		'PTS',
		'REB',
		'AST',
		'STL',
		'BLK',
		'FGM',
		'FGA',
		'FG%',
		'3PM',
		'3PA',
		'3P%',
		'FTM',
		'FTA',
		'FT%',
		'TOV'
	];

	const updatableDtoProps: string[] = [
		'min',
		'pts',
		'reb',
		'ast',
		'stl',
		'blk',
		'fgm',
		'fga',
		'fgPct',
		'fg3m',
		'fg3a',
		'fg3Pct',
		'ftm',
		'fta',
		'ftPct',
		'turnover'
	];

	let selectedValue: number;
	let isHomeTeamBoxScore: boolean = true;
	let isVisitorTeamBoxScore: boolean = false;

	completeStats(gameDetails.homeTeam.players);
	completeStats(gameDetails.visitorTeam.players);

	const unsubscribe = liveBoxScoreStore.subscribe((boxScoreList) => {
		boxScoreList.forEach((boxScore) => {
			if (
				boxScore.homeTeam.apiId !== gameDetails.homeTeam.apiId ||
				boxScore.visitorTeam.apiId !== gameDetails.visitorTeam.apiId ||
				boxScore.date !== gameDetails.date
			) {
				return;
			}
			if (boxScore.status.includes('Qtr') || boxScore.status.includes('Halftime')) {
				gameDetails = boxScore;
				completeStats(gameDetails.homeTeam.players);
				completeStats(gameDetails.visitorTeam.players);
				sortBothBoxScores(updatableDtoProps[selectedValue]);
			}
		});
	});

	onDestroy(unsubscribe);

	$: teamBoxScore = isHomeTeamBoxScore
		? gameDetails.homeTeam.players
		: gameDetails.visitorTeam.players;
	$: table = {
		head: ['Player', ...headFieldsForSorting],
		body: tableMapperValues(teamBoxScore, ['playerFullName', ...updatableDtoProps])
	};

	let previousGameDetails: GameWithBoxScore = gameDetails;
	let maxPlayerCount = Math.max(
		gameDetails?.homeTeam.players.length,
		gameDetails?.visitorTeam.players.length
	);

	let playerStatUpdated: boolean[][] = Array.from({ length: maxPlayerCount }, () =>
		Array(updatableDtoProps.length).fill(false)
	);

	$: {
		let currentPlayersState = isHomeTeamBoxScore
			? gameDetails?.homeTeam.players
			: gameDetails?.visitorTeam.players;
		let prevPlayersState = isHomeTeamBoxScore
			? previousGameDetails?.homeTeam.players
			: previousGameDetails?.visitorTeam.players;

		currentPlayersState.forEach((player, playerIndex) => {
			updatableDtoProps.forEach((prop, propIndex) => {
				if (player[prop] !== prevPlayersState[playerIndex][prop]) {
					playerStatUpdated[playerIndex][propIndex] = true;
					setTimeout(() => {
						playerStatUpdated[playerIndex][propIndex] = false;
					}, 2000);
				}
			});
		});

		previousGameDetails = gameDetails;
	}

	function sortBoxScoreStats(playerGameStats: BoxScorePlayer[], prop: string) {
		const isValidProp = playerGameStats.every((player) => prop in player);
		if (isValidProp) {
			playerGameStats.sort((a, b) => {
				if (typeof a[prop] === 'string' && typeof b[prop] === 'string') {
					return b[prop].localeCompare(a[prop]);
				}
				return b[prop] - a[prop];
			});
		}
	}

	function sortBothBoxScores(prop: string) {
		sortBoxScoreStats(gameDetails.homeTeam.players, prop);
		sortBoxScoreStats(gameDetails.visitorTeam.players, prop);
		teamBoxScore = isHomeTeamBoxScore
			? gameDetails.homeTeam.players
			: gameDetails.visitorTeam.players;
	}

	function toggleBoxScore() {
		isHomeTeamBoxScore = !isHomeTeamBoxScore;
		isVisitorTeamBoxScore = !isVisitorTeamBoxScore;
	}
</script>

<GameWithBoxScoreC {gameDetails} pageType={GamePageTypes.BOX_SCORE} {gameReviewAverages}>
	<div class="flex justify-between mx-10">
		<SlideToggle
			active="bg-primary-800"
			background="bg-surface-700"
			name="slider-label"
			bind:checked={isVisitorTeamBoxScore}
			on:click={toggleBoxScore}
		/>
		<select
			bind:value={selectedValue}
			on:change={() => sortBothBoxScores(updatableDtoProps[selectedValue])}
			class="w-1/6 select variant-filled-surface border-none shadow"
		>
			{#each headFieldsForSorting as g, index}
				<option value={index} class="font-thin text-sm">{g}</option>
			{/each}
		</select>
		<SlideToggle
			active="bg-primary-800"
			background="bg-surface-700"
			name="slider-label"
			bind:checked={isHomeTeamBoxScore}
			on:click={toggleBoxScore}
		/>
	</div>
	<Table
		{table}
		tableType={TableTypes.boxScoreType}
		playersInfo={teamBoxScore}
		playersUpdates={playerStatUpdated}
	/>
</GameWithBoxScoreC>

<style>
	select option {
		background-color: #f2f2f2;
	}
</style>
