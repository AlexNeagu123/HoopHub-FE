<script lang="ts">
	import type { PageData } from './$types';
	import GameWithBoxScoreC from '$lib/components/games/GameWithBoxScoreC.svelte';

	import {
		GamePageTypes,
		TableTypes,
		headBoxScoreFieldsForSorting,
		updatableBoxScoreDtoProps
	} from '$lib/constants';
	import Table from '$lib/components/shared/Table.svelte';
	import { SlideToggle, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { BoxScorePlayer } from '$lib/models/nba_data/box-scores/BoxScorePlayer';
	import { completeStats } from '$lib/utils/game-stats';
	import { liveBoxScoreStore } from '$lib/stores/live-games.store';
	import { onDestroy } from 'svelte';
	import type { GameWithBoxScore } from '$lib/models/nba_data/box-scores/GameWithBoxScore';
	import GameSelectContainer from '$lib/components/games/GameSelectContainer.svelte';

	export let data: PageData;

	let gameDetails = data.gameWithBoxScore;
	let gameReviewAverages = data.gameReviewAverages;

	let sortingSelectedValue: number = 0;
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
				sortBothBoxScores();
			}
		});
	});

	onDestroy(unsubscribe);

	let headFieldsForSorting = headBoxScoreFieldsForSorting;
	let updatableDtoProps = updatableBoxScoreDtoProps;

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
		Array(updatableBoxScoreDtoProps.length).fill(false)
	);

	$: {
		let currentPlayersState = isHomeTeamBoxScore
			? gameDetails?.homeTeam.players
			: gameDetails?.visitorTeam.players;
		let prevPlayersState = isHomeTeamBoxScore
			? previousGameDetails?.homeTeam.players
			: previousGameDetails?.visitorTeam.players;

		currentPlayersState.forEach((player, playerIndex) => {
			updatableBoxScoreDtoProps.forEach((prop, propIndex) => {
				// @ts-ignore
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
				// @ts-ignore
				if (typeof a[prop] === 'string' && typeof b[prop] === 'string') {
					// @ts-ignore
					return b[prop].localeCompare(a[prop]);
				}
				// @ts-ignore
				return b[prop] - a[prop];
			});
		}
	}

	function sortBothBoxScores() {
		const prop = updatableBoxScoreDtoProps[sortingSelectedValue];
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

		<div class="flex w-full justify-center">
			<GameSelectContainer
				bind:selectedValue={sortingSelectedValue}
				labelTitle={'Sort By'}
				changeFunction={sortBothBoxScores}
				optionsArray={headBoxScoreFieldsForSorting}
			/>
			<GameSelectContainer
				bind:selectedValue={sortingSelectedValue}
				labelTitle={'Sort By'}
				changeFunction={sortBothBoxScores}
				optionsArray={headBoxScoreFieldsForSorting}
			/>
		</div>

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
