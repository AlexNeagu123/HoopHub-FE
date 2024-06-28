<script lang="ts">
	import type { PageData } from './$types';
	import GameWithBoxScoreC from '$lib/components/games/GameWithBoxScoreC.svelte';

	import {
		GamePageTypes,
		TableTypes,
		displayFieldsForAdvancedStatsEntry,
		gameStatsTypes,
		headBoxScoreFieldsForSorting,
		updatableBoxScoreDtoProps,
		updatableFieldsForAdvancedStatsEntry
	} from '$lib/constants';
	import Table from '$lib/components/shared/Table.svelte';
	import { SlideToggle, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { BoxScorePlayer } from '$lib/models/nba_data/box-scores/BoxScorePlayer';
	import { completeAdvancedStats, completeStats } from '$lib/utils/game-stats';
	import { liveBoxScoreStore } from '$lib/stores/live-games.store';
	import { onDestroy, onMount } from 'svelte';
	import type { GameWithBoxScore } from '$lib/models/nba_data/box-scores/GameWithBoxScore';
	import GameSelectContainer from '$lib/components/games/GameSelectContainer.svelte';
	import type { AdvancedStatsEntry } from '$lib/models/nba_data/box-scores/AdvancedStatsEntry';
	import LoadingIcon from '$lib/components/shared/LoadingIcon.svelte';
	import type { Unsubscriber } from 'svelte/motion';

	export let data: PageData;
	let gameDetails = data.gameWithBoxScore;
	let gameReviewAverages = data.gameReviewAverages;
	let allPlayers = data.allPlayers;

	let sortingSelectedValue: number = 0;
	let statsTypeSelectedValue: number = 0;
	let advancedStatsEntries: AdvancedStatsEntry[] = data.advancedStatsEntries;
	let isHometeamStats: boolean = true;
	let isVisitorteamStats: boolean = false;

	let headFieldsForSorting = headBoxScoreFieldsForSorting;
	let updatableDtoProps = updatableBoxScoreDtoProps;

	function hasDistinctValues(playerIndexMap: { [currentIndex: number]: number }): boolean {
		let valueSet = new Set<number>();
		for (let key in playerIndexMap) {
			if (playerIndexMap.hasOwnProperty(key)) {
				let value = playerIndexMap[key];
				if (valueSet.has(value)) {
					return false;
				}
				valueSet.add(value);
			}
		}

		return true;
	}

	$: teamStats = isHometeamStats
		? statsTypeSelectedValue === 0
			? gameDetails.homeTeam.players
			: advancedStatsEntries.filter((entry) => entry.team.id === gameDetails.homeTeam.id)
		: statsTypeSelectedValue === 0
			? gameDetails.visitorTeam.players
			: advancedStatsEntries.filter((entry) => entry.team.id === gameDetails.visitorTeam.id);

	$: table = {
		head: ['Player', ...headFieldsForSorting],
		body: tableMapperValues(teamStats, ['playerFullName', ...updatableDtoProps])
	};

	$: statsNumber = teamStats.length;

	let previousGameDetails: GameWithBoxScore = gameDetails;
	let maxPlayerCount = Math.max(
		gameDetails?.homeTeam.players.length,
		gameDetails?.visitorTeam.players.length
	);

	let playerStatUpdated: boolean[][] = Array.from({ length: maxPlayerCount }, () =>
		Array(updatableBoxScoreDtoProps.length).fill(false)
	);

	$: {
		let currentPlayersState = isHometeamStats
			? gameDetails?.homeTeam.players
			: gameDetails?.visitorTeam.players;
		let prevPlayersState = isHometeamStats
			? previousGameDetails?.homeTeam.players
			: previousGameDetails?.visitorTeam.players;

		currentPlayersState = currentPlayersState.filter(
			(player) => player.min !== undefined && player.min !== '' && player.min !== '0'
		);

		prevPlayersState = prevPlayersState.filter(
			(player) => player.min !== undefined && player.min !== '' && player.min !== '0'
		);

		let playerIndexMap: { [currentIndex: number]: number } = {};
		currentPlayersState.forEach((currentPlayer, currentIndex) => {
			const prevIndex = prevPlayersState.findIndex(
				(prevPlayer) => prevPlayer.player?.id === currentPlayer.player?.id
			);
			if (prevIndex !== -1) {
				playerIndexMap[currentIndex] = prevIndex;
			}
		});
		if (hasDistinctValues(playerIndexMap)) {
			currentPlayersState.forEach((player, playerIndex) => {
				updatableBoxScoreDtoProps.forEach((prop, propIndex) => {
					const prevIndex = playerIndexMap[playerIndex];
					// @ts-ignore
					if (player[prop] !== prevPlayersState[prevIndex][prop]) {
						playerStatUpdated[playerIndex][propIndex] = true;
						setTimeout(() => {
							playerStatUpdated[playerIndex][propIndex] = false;
						}, 2000);
					}
				});
			});
		}
		previousGameDetails = gameDetails;
	}

	function sortBoxScoreStats(playerGameStats: BoxScorePlayer[], prop: string) {
		const isValidProp = playerGameStats.every((player) => prop in player);
		if (isValidProp) {
			playerGameStats = playerGameStats.slice().sort((a, b) => {
				// @ts-ignore
				if (typeof a[prop] === 'string' && typeof b[prop] === 'string') {
					if (prop !== 'min')
						// @ts-ignore
						return b[prop].localeCompare(a[prop]);
					return Number(b[prop]) - Number(a[prop]);
				}
				// @ts-ignore
				return b[prop] - a[prop];
			});
		}
		return playerGameStats;
	}

	function sortAdvancedStats(advancedStats: AdvancedStatsEntry[], prop: string) {
		const isValidProp = advancedStats.every((entry) => prop in entry);
		if (isValidProp) {
			advancedStats = advancedStats.slice().sort((a, b) => {
				// @ts-ignore
				if (typeof a[prop] === 'string' && typeof b[prop] === 'string') {
					if (prop !== 'min')
						// @ts-ignore
						return b[prop].localeCompare(a[prop]);
					return Number(b[prop]) - Number(a[prop]);
				}
				// @ts-ignore
				return b[prop] - a[prop];
			});
		}
		return advancedStats;
	}

	function sortStats() {
		if (statsTypeSelectedValue === 0) {
			const prop = updatableDtoProps[sortingSelectedValue];
			gameDetails.homeTeam.players = sortBoxScoreStats(gameDetails.homeTeam.players, prop);
			gameDetails.visitorTeam.players = sortBoxScoreStats(gameDetails.visitorTeam.players, prop);
		} else {
			const prop = updatableDtoProps[sortingSelectedValue];
			advancedStatsEntries = sortAdvancedStats(advancedStatsEntries, prop);
		}
	}

	function statsTypeChangedHandler() {
		headFieldsForSorting =
			statsTypeSelectedValue === 0
				? headBoxScoreFieldsForSorting
				: displayFieldsForAdvancedStatsEntry;
		updatableDtoProps =
			statsTypeSelectedValue === 0
				? updatableBoxScoreDtoProps
				: updatableFieldsForAdvancedStatsEntry;
	}

	function toggleBoxScore() {
		isHometeamStats = !isHometeamStats;
		isVisitorteamStats = !isVisitorteamStats;
	}

	let isLoading = true;
	let unsubscribe: Unsubscriber | null = null;

	onMount(() => {
		gameDetails.homeTeam.players = completeStats(gameDetails.homeTeam.players, allPlayers);
		gameDetails.visitorTeam.players = completeStats(gameDetails.visitorTeam.players, allPlayers);
		unsubscribe = liveBoxScoreStore.subscribe((boxScoreList) => {
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
					completeStats(gameDetails.homeTeam.players, allPlayers);
					completeStats(gameDetails.visitorTeam.players, allPlayers);
					const prop = updatableDtoProps[sortingSelectedValue];
					gameDetails.homeTeam.players = sortBoxScoreStats(gameDetails.homeTeam.players, prop);
					gameDetails.visitorTeam.players = sortBoxScoreStats(
						gameDetails.visitorTeam.players,
						prop
					);
				}
			});
		});

		advancedStatsEntries = completeAdvancedStats(
			advancedStatsEntries,
			gameDetails.homeTeam.players,
			gameDetails.visitorTeam.players
		);
		isLoading = false;
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

{#if isLoading}
	<LoadingIcon />
{:else}
	<GameWithBoxScoreC {gameDetails} pageType={GamePageTypes.BOX_SCORE} {gameReviewAverages}>
		<div class="flex md:justify-between w-full justify-between">
			<div class="w-[20%] md:w-1/4 ml-5 md:ml-0">
				<SlideToggle
					active="bg-primary-800"
					background="bg-surface-700"
					name="slider-label"
					bind:checked={isVisitorteamStats}
					on:click={toggleBoxScore}
				/>
			</div>
			<div class="flex w-[80%] justify-between md:w-full md:justify-center mx-4">
				<GameSelectContainer
					bind:selectedValue={statsTypeSelectedValue}
					labelTitle={'Stats Type'}
					changeFunction={statsTypeChangedHandler}
					optionsArray={gameStatsTypes}
				/>
				<GameSelectContainer
					bind:selectedValue={sortingSelectedValue}
					labelTitle={'Sort By'}
					changeFunction={sortStats}
					optionsArray={headFieldsForSorting}
				/>
			</div>

			<div class="w-[20%] md:w-1/4 flex md:justify-end mr-5 md:mr-0">
				<SlideToggle
					active="bg-primary-800"
					background="bg-surface-700"
					name="slider-label"
					bind:checked={isHometeamStats}
					on:click={toggleBoxScore}
				/>
			</div>
		</div>
		{#if statsNumber === 0}
			<p class="text-center text-gray-500 mt-7">Statistics of these type are not yet available</p>
		{:else}
			<Table
				{table}
				tableType={TableTypes.boxScoreType}
				playersInfo={teamStats}
				playersUpdates={playerStatUpdated}
			/>
		{/if}
	</GameWithBoxScoreC>
{/if}
