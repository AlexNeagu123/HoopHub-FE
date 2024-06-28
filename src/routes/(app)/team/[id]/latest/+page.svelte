<script lang="ts">
	import type { PageData } from './$types';
	import TeamExpanded from '$lib/components/teams/TeamExpanded.svelte';
	import { onMount } from 'svelte';
	import LoadingIcon from '$lib/components/shared/LoadingIcon.svelte';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import type { LatestTeamBoxScore } from '$lib/models/nba_data/box-scores/LatestTeamBoxScore';
	import getLatestBoxScoresByTeam from '$lib/services/nba_data/games/getLatestBoxScoresByTeam';
	import TeamLatestGamesTable from '$lib/components/shared/TeamLatestGamesTable.svelte';
	import { TeamPageTypes, latestGameOptions } from '$lib/constants';
	import type { LocalStoredGame } from '$lib/models/nba_data/games/LocalStoredGame';
	import { dateToString } from '$lib/utils/date-parser';
	import GameCountSelect from '$lib/components/games/GameCountSelect.svelte';

	export let data: PageData;
	let teamFollows = data.teamFollows;
	let isLoading: boolean = true;

	let latestTeamBoxScores: LatestTeamBoxScore[] = [];

	let hasWon: boolean[] = [];
	const headFields: string[] = [
		'Date',
		'Against',
		'Result',
		'oppTeamPhoto',
		'oppTeamId',
		'homeTeamId',
		'visitorTeamId'
	];
	const bodyFields: string[] = [
		'date',
		'oppTeamAbbr',
		'result',
		'oppTeamPhoto',
		'oppTeamId',
		'homeTeamId',
		'visitorTeamId'
	];

	$: table = {
		head: headFields,
		body: tableMapperValues(latestTeamBoxScores, bodyFields)
	};

	async function loadGames(gameCount: number) {
		isLoading = true;
		let latestGames: LocalStoredGame[] = [];
		let teamBoxScores: LatestTeamBoxScore[] = [];
		let newHasWon: boolean[] = [];

		latestGames = await getLatestBoxScoresByTeam(data.team.id, gameCount);
		latestGames.forEach((g) => {
			if (g.homeTeam?.id === data.team.id) {
				const result =
					(g.homeTeamScore! < g.visitorTeamScore! ? 'Lost ' : 'Won ') +
					`${g.homeTeamScore}-${g.visitorTeamScore}`;
				newHasWon.push(result.indexOf('Won') !== -1);
				teamBoxScores.push({
					date: dateToString(g.date),
					oppTeamAbbr: g.visitorTeam?.abbreviation!,
					result: result,
					oppTeamPhoto: g.visitorTeam?.imageUrl!,
					oppTeamId: g.visitorTeam?.id,
					homeTeamId: g.homeTeam.apiId,
					visitorTeamId: g.visitorTeam?.apiId
				});
			} else {
				const result =
					(g.homeTeamScore! < g.visitorTeamScore! ? 'Won ' : 'Lost ') +
					`${g.visitorTeamScore}-${g.homeTeamScore}`;
				newHasWon.push(result.indexOf('Won') !== -1);
				teamBoxScores.push({
					date: dateToString(g.date),
					oppTeamAbbr: g.homeTeam.abbreviation!,
					result: result,
					oppTeamPhoto: g.homeTeam.imageUrl!,
					oppTeamId: g.homeTeam.id,
					homeTeamId: g.homeTeam.apiId,
					visitorTeamId: g.visitorTeam.apiId
				});
			}
		});

		hasWon = newHasWon;
		latestTeamBoxScores = teamBoxScores;
		isLoading = false;
	}

	onMount(async () => {
		await loadGames(selectedGameCount);
	});

	let selectedGameCount: number = 5;
	async function handleGameCountChange() {
		await loadGames(selectedGameCount);
	}
</script>

<TeamExpanded team={data.team} pageType={TeamPageTypes.LATEST} {teamFollows}>
	{#if isLoading}
		<LoadingIcon />
	{:else}
		<div class="flex justify-center md:justify-start">
			<div class="w-1/2">
				<GameCountSelect
					bind:selectedValue={selectedGameCount}
					changeFunction={handleGameCountChange}
					optionsArray={latestGameOptions}
					labelTitle="Games Count"
				/>
			</div>
		</div>
		<div class="flex justify-center md:justify-start">
			<div class="w-3/4">
				<TeamLatestGamesTable {table} {hasWon} />
			</div>
		</div>
	{/if}
</TeamExpanded>
