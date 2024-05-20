<script lang="ts">
    import type {PageData} from './$types';
    import PlayerExpanded from "$lib/components/players/PlayerExpanded.svelte";
    import {onMount} from "svelte";
    import {tableMapperValues} from "@skeletonlabs/skeleton";
    import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";
    import getLatestBoxScoresByTeam from "$lib/services/nba_data/games/getLatestBoxScoresByTeam";
    import {page} from "$app/stores";
    import {completeStats} from "$lib/utils/game-stats";
    import type {LatestPlayerBoxScore} from "$lib/models/nba_data/box-scores/LatestPlayerBoxScore";
    import LoadingIcon from "$lib/components/shared/LoadingIcon.svelte";
    import PlayerLatestGamesTable from "$lib/components/shared/PlayerLatestGamesTable.svelte";
	import type { PlayerFollowEntry } from '$lib/models/user_features/followings/PlayerFollowEntry';

    export let data: PageData;
    let id = $page.params.id;

    let latestBoxScores: GameWithBoxScore[] = [];
    let playerStatsFromBoxScore: LatestPlayerBoxScore[] = [];
    let playerFollows: PlayerFollowEntry[] = data.playerFollows;

    const hasWon: boolean[] = [];

    const headFields: string[] = ['Date', 'Team', 'Opp', 'Result', 'MIN', 'PTS', 'REB', 'AST', 'STL', 'BLK', 'FGM', 'FGA',
        'FG%', '3PM', '3PA', '3P%', 'FTM', 'FTA', 'FT%', 'TOV', 'homeTeamId', 'visitorTeamId', 'ownTeamId', 'oppTeamId'];

    const bodyFields: string[] = ['date', 'ownTeamAbbr', 'oppTeamAbbr', 'result', 'min', 'pts', 'reb', 'ast', 'stl', 'blk', 'fgm',
        'fga', 'fgPct', 'fg3m', 'fg3a', 'fg3Pct', 'ftm', 'fta', 'ftPct', 'turnover', 'homeTeamId', 'visitorTeamId', 'ownTeamId',
        'oppTeamId'];

    $: table = {
        head: headFields,
        body: tableMapperValues(playerStatsFromBoxScore, bodyFields),
    };

    let isLoading: boolean = true;
    onMount(async () => {
        let playerBoxScore: LatestPlayerBoxScore[] = [];
        isLoading = true;
        latestBoxScores = await getLatestBoxScoresByTeam(data.player.seasonAverageStats[0].team.id);
        latestBoxScores.forEach(bs => {
            completeStats(bs.homeTeam.players);
            completeStats(bs.visitorTeam.players);

            bs.homeTeam.players.forEach(p => {
                if (p.player.id === id) {
                    const result = (bs.homeTeamScore! < bs.visitorTeamScore! ? 'Lost ' : 'Won ') + `${bs.homeTeamScore}-${bs.visitorTeamScore}`;
                    hasWon.push(result.indexOf("Won") !== -1);

                    playerBoxScore.push({
                        ...p, date: bs.date, ownTeamAbbr: bs.homeTeam.abbreviation!,
                        oppTeamAbbr: bs.visitorTeam.abbreviation!, result: result,
                        ownTeamId: bs.homeTeam.id, oppTeamId: bs.visitorTeam.id,
                        homeTeamId: bs.homeTeam.apiId, visitorTeamId: bs.visitorTeam.apiId
                    });
                }
            });

            bs.visitorTeam.players.forEach(p => {
                if (p.player.id === id) {
                    const result = (bs.visitorTeamScore! < bs.homeTeamScore! ? 'Lost ' : 'Won ') + `${bs.visitorTeamScore}-${bs.homeTeamScore}`;
                    hasWon.push(result.indexOf("Won") !== -1);

                    playerBoxScore.push({
                        ...p, date: bs.date, ownTeamAbbr: bs.visitorTeam.abbreviation!,
                        oppTeamAbbr: bs.homeTeam.abbreviation!, result: result,
                        ownTeamId: bs.visitorTeam.id, oppTeamId: bs.homeTeam.id,
                        homeTeamId: bs.homeTeam.apiId, visitorTeamId: bs.visitorTeam.apiId
                    });
                }
            });
        });

        playerStatsFromBoxScore = playerBoxScore;
        isLoading = false;
    });
</script>

<PlayerExpanded player={data.player} {playerFollows} pageType="latest">
    {#if isLoading}
        <LoadingIcon/>
    {:else}
        <PlayerLatestGamesTable table={table} hasWon={hasWon}/>
    {/if}
</PlayerExpanded>
