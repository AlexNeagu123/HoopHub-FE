<script lang="ts">
	import type { PageData } from './$types';
	import PlayerExpanded from '$lib/components/players/PlayerExpanded.svelte';
	import { onMount } from 'svelte';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import type { LatestPlayerBoxScore } from '$lib/models/nba_data/box-scores/LatestPlayerBoxScore';
	import LoadingIcon from '$lib/components/shared/LoadingIcon.svelte';
	import PlayerLatestGamesTable from '$lib/components/shared/PlayerLatestGamesTable.svelte';
	import type { PlayerFollowEntry } from '$lib/models/user_features/followings/PlayerFollowEntry';
	import type { LocalStoredBoxScoresDto } from '$lib/models/nba_data/box-scores/LocalStoredBoxScores';
	import getLatestBoxScoresByPlayer from '$lib/services/nba_data/games/getLatestBoxScoresByPlayer';
	import { dateToString } from '$lib/utils/date-parser';
	import { completeStats } from '$lib/utils/game-stats';

	export let data: PageData;
	let id = $page.params.id;

	let playerStatsFromBoxScore: LatestPlayerBoxScore[] = [];
	let playerFollows: PlayerFollowEntry[] = data.playerFollows;

	const hasWon: boolean[] = [];

	const headFields: string[] = [
		'Date',
		'Team',
		'Opp',
		'Result',
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
		'TOV',
		'homeTeamId',
		'visitorTeamId',
		'ownTeamId',
		'oppTeamId'
	];

	const bodyFields: string[] = [
		'date',
		'ownTeamAbbr',
		'oppTeamAbbr',
		'result',
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
		'turnover',
		'homeTeamId',
		'visitorTeamId',
		'ownTeamId',
		'oppTeamId'
	];

	$: table = {
		head: headFields,
		body: tableMapperValues(playerStatsFromBoxScore, bodyFields)
	};

	let isLoading: boolean = true;
	onMount(async () => {
		let playerBoxScore: LatestPlayerBoxScore[] = [];
		let latestBoxScores: LocalStoredBoxScoresDto[] = [];

		isLoading = true;
		latestBoxScores = await getLatestBoxScoresByPlayer(id);
        console.log(latestBoxScores);

		latestBoxScores.forEach((bs) => {
			let oppTeamAbbr = '';
			let ownTeamId = '';
			let result = '';
			let oppTeamId = '';

			if (bs.team.id === bs.game.homeTeam.id) {
				result =
					(bs.game.homeTeamScore! < bs.game.visitorTeamScore! ? 'Lost ' : 'Won ') +
					`${bs.game.homeTeamScore}-${bs.game.visitorTeamScore}`;
				oppTeamAbbr = bs.game.visitorTeam.abbreviation!;
				ownTeamId = bs.game.homeTeam.id;
				oppTeamId = bs.game.visitorTeam.id;
				hasWon.push(result.indexOf('Won') !== -1);
			} else {
				result =
					(bs.game.homeTeamScore! < bs.game.visitorTeamScore! ? 'Won ' : 'Lost ') +
					`${bs.game.visitorTeamScore}-${bs.game.homeTeamScore}`;
				oppTeamAbbr = bs.game.homeTeam.abbreviation!;
				ownTeamId = bs.game.visitorTeam.id;
				oppTeamId = bs.game.homeTeam.id;
				hasWon.push(result.indexOf('Won') !== -1);
			}

			playerBoxScore.push({
				date: dateToString(bs.game.date),
				ownTeamAbbr: bs.team.abbreviation!,
				oppTeamAbbr: oppTeamAbbr,
				result: result,
				ownTeamId: ownTeamId,
				oppTeamId: oppTeamId,
				homeTeamId: bs.game.homeTeam.apiId,
				visitorTeamId: bs.game.visitorTeam.apiId,
				min: bs.min === undefined ? '0' : bs.min,
				pts: bs.pts,
				reb: bs.reb,
				oreb: bs.oreb,
				dreb: bs.dreb,
				ast: bs.ast,
				stl: bs.stl,
				blk: bs.blk,
				fgm: bs.fgm,
				fga: bs.fga,
				fgPct: bs.fgPct,
				fg3m: bs.fg3m,
				fg3a: bs.fg3a,
				fg3Pct: bs.fg3Pct,
				ftm: bs.ftm,
				fta: bs.fta,
				ftPct: bs.ftPct,
				turnover: bs.turnover,
				pf: bs.pf,
				player: bs.player,
				playerFullName: `${bs.player.firstName} ${bs.player.lastName}`,
				playerImageUrl: bs.player.imageUrl
			});
		});
        
        completeStats(playerBoxScore, true);
		playerStatsFromBoxScore = playerBoxScore;
		isLoading = false;
	});
</script>

<PlayerExpanded player={data.player} {playerFollows} pageType="latest">
	{#if isLoading}
		<LoadingIcon />
	{:else}
		<PlayerLatestGamesTable {table} {hasWon} />
	{/if}
</PlayerExpanded>
