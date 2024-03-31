<script lang="ts">
    import type {PageData} from './$types';
    import GameWithBoxScore from "$lib/components/games/GameWithBoxScore.svelte";
    import {TableTypes} from "$lib/constants";
    import Table from "$lib/components/shared/Table.svelte";
    import {tableMapperValues} from "@skeletonlabs/skeleton";
    import type {BoxScorePlayer} from "$lib/models/nba_data/box-scores/BoxScorePlayer";

    export let data: PageData;

    let gameDetails = data.gameWithBoxScore;

    completeStats(gameDetails.homeTeam.players);
    completeStats(gameDetails.visitorTeam.players);

    let isHomeTeamBoxScore: boolean = true;
    let isVisitorTeamBoxScore: boolean = false;
    $: teamBoxScore = isHomeTeamBoxScore ? gameDetails.homeTeam.players : gameDetails.visitorTeam.players;

    function completeStats(playerGameStats: BoxScorePlayer[]) {
        playerGameStats.forEach(stat => {
            const roundToOneDecimal = (value: number) => parseFloat(value.toFixed(1));
            const convertToPercent = (value: number | undefined) => {
                if (!value) {
                    return 0;
                }
                return roundToOneDecimal(value * 100);
            }

            const propertiesToRound: (keyof BoxScorePlayer)[]
                = ['pts', 'reb', 'blk', 'stl', 'ast', 'fg3m', 'fg3a', 'fga', 'fgm', 'fta', 'ftm', 'turnover'];

            propertiesToRound.forEach((property: keyof BoxScorePlayer) => {
                stat[property] = roundToOneDecimal(stat[property]);
            });

            stat.fgPct = convertToPercent(stat.fgPct);
            stat.fg3Pct = convertToPercent(stat.fg3Pct);
            stat.ftPct = convertToPercent(stat.ftPct);
        });

        playerGameStats.sort((a, b) => b.min.localeCompare(a.min));
    }

    $: table = {
        head: ['Player', 'MIN', 'PTS', 'REB', 'AST', 'STL', 'BLK', 'FGM', 'FGA', 'FG%', '3PM', '3PA', '3P%',
            'FTM', 'FTA', 'FT%', 'TOV'],
        body: tableMapperValues(teamBoxScore, ['playerFullName', 'min', 'pts', 'reb', 'ast', 'stl', 'blk', 'fgm',
            'fga', 'fgPct', 'fg3m', 'fg3a', 'fg3Pct', 'ftm', 'fta', 'ftPct', 'turnover']),
    };
</script>

<GameWithBoxScore gameDetails={gameDetails} bind:isHomeTeamBoxScore={isHomeTeamBoxScore}
                  bind:isVisitorTeamBoxScore={isVisitorTeamBoxScore}>
    <Table table={table} tableType={TableTypes.boxScoreType}/>
</GameWithBoxScore>