<script lang="ts">
    import type {PageData} from './$types';
    import GameWithBoxScore from "$lib/components/games/GameWithBoxScore.svelte";
    import {TableTypes} from "$lib/constants";
    import Table from "$lib/components/shared/Table.svelte";
    import {SlideToggle, tableMapperValues} from "@skeletonlabs/skeleton";
    import type {BoxScorePlayer} from "$lib/models/nba_data/box-scores/BoxScorePlayer";
    import {completeStats} from "$lib/utils/game-stats";

    export let data: PageData;

    let gameDetails = data.gameWithBoxScore;

    completeStats(gameDetails.homeTeam.players);
    completeStats(gameDetails.visitorTeam.players);

    let isHomeTeamBoxScore: boolean = true;
    let isVisitorTeamBoxScore: boolean = false;

    const headFieldsForSorting: string[] = ['MIN', 'PTS', 'REB', 'AST', 'STL', 'BLK', 'FGM', 'FGA', 'FG%', '3PM', '3PA', '3P%',
        'FTM', 'FTA', 'FT%', 'TOV'];

    const sortingMappedFields: string[] = ['min', 'pts', 'reb', 'ast', 'stl', 'blk', 'fgm',
        'fga', 'fgPct', 'fg3m', 'fg3a', 'fg3Pct', 'ftm', 'fta', 'ftPct', 'turnover'];

    let selectedValue: number;

    $: teamBoxScore = isHomeTeamBoxScore ? gameDetails.homeTeam.players : gameDetails.visitorTeam.players;

    $: table = {
        head: ['Player', 'MIN', 'PTS', 'REB', 'AST', 'STL', 'BLK', 'FGM', 'FGA', 'FG%', '3PM', '3PA', '3P%',
            'FTM', 'FTA', 'FT%', 'TOV'],
        body: tableMapperValues(teamBoxScore, ['playerFullName', 'min', 'pts', 'reb', 'ast', 'stl', 'blk', 'fgm',
            'fga', 'fgPct', 'fg3m', 'fg3a', 'fg3Pct', 'ftm', 'fta', 'ftPct', 'turnover']),
    };

    function sortBoxScoreStats(playerGameStats: BoxScorePlayer[], prop: string) {
        const isValidProp = playerGameStats.every(player => prop in player);
        if (isValidProp) {
            playerGameStats.sort((a, b) => {
                if (typeof a[prop] === 'string' && typeof b[prop] === 'string') {
                    return b[prop].localeCompare(a[prop]);
                }
                return b[prop] - a[prop];
            });
        }
    }

    function getCurrentBoxScore() {
        return isHomeTeamBoxScore ? gameDetails.homeTeam.players : gameDetails.visitorTeam.players;
    }

    function sortBothBoxScores(prop: string) {
        sortBoxScoreStats(gameDetails.homeTeam.players, prop);
        sortBoxScoreStats(gameDetails.visitorTeam.players, prop)
        teamBoxScore = getCurrentBoxScore();
    }

    function toggleBoxScore() {
        isHomeTeamBoxScore = !isHomeTeamBoxScore;
        isVisitorTeamBoxScore = !isVisitorTeamBoxScore;
    }
</script>

<style>
    select option {
        background-color: #f2f2f2;
    }
</style>

<GameWithBoxScore gameDetails={gameDetails}>
    <div class="flex justify-between mx-10">
        <SlideToggle active="bg-success-700" background="bg-surface-700" name="slider-label"
                     bind:checked={isVisitorTeamBoxScore} on:click={toggleBoxScore}/>
        <select bind:value={selectedValue}
                on:change={() => sortBothBoxScores(sortingMappedFields[selectedValue]) }
                class="w-1/6 select variant-filled-primary border-none shadow">
            {#each headFieldsForSorting as g, index}
                <option value={index}>{g}</option>
            {/each}
        </select>
        <SlideToggle active="bg-success-700" background="bg-surface-700" name="slider-label" bind:checked={isHomeTeamBoxScore} on:click={toggleBoxScore}/>
    </div>
    <Table table={table} tableType={TableTypes.boxScoreType} playersInfo={teamBoxScore}/>
</GameWithBoxScore>