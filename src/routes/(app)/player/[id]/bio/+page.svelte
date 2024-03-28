<script lang="ts">
    import PlayerExpanded from "$lib/components/players/PlayerExpanded.svelte";
    import {ProgressRadial, tableMapperValues} from "@skeletonlabs/skeleton";
    import {PlayerConstants, SeasonConstants, TableTypes} from "$lib/constants";
    import Table from "$lib/components/shared/Table.svelte";
    import {page} from "$app/stores";
    import getPlayerBio from "$lib/services/nba_data/players/getPlayerBio";
    import type {SeasonAverageStats} from "$lib/models/nba_data/players/SeasonAverageStats";
    import type {Player} from "$lib/models/nba_data/players/Player";
    import {onMount} from "svelte";
    import type {PageData} from './$types';

    export let data: PageData;
    let player: Player = data.player;
    let playerStats: SeasonAverageStats[] = player.seasonAverageStats;

    completeStats(playerStats);
    $: teamIds = playerStats.map(e => e.teamId);

    let id = $page.params.id;
    let isLoading: boolean = true;

    const groups: string[][] = [];
    for (let season = SeasonConstants.currentSeason; season >= player.draftYear; season -= PlayerConstants.seasonGroupSize) {
        const endSeason = (season + 1).toString();
        const startSeason = Math.max((season - PlayerConstants.seasonGroupSize + 1), player.draftYear).toString()
        if (endSeason == (SeasonConstants.currentSeason + 1).toString()) {
            updatePlayerStats(startSeason, endSeason);
        }
        groups.push([startSeason, endSeason, `${startSeason}-${endSeason.substring(2)}`]);
    }

    $: table = {
        head: ['Season', 'Team', 'GP', 'PTS', 'REB', 'AST', 'BLK', 'STL', 'FGM', 'FGA', 'FG%', '3PM', '3PA', '3P%',
        'FTM', 'FTA', 'FT%', 'TOV'],
        body: tableMapperValues(playerStats, ['seasonStr', 'teamStr', 'gamesPlayed', 'pts', 'reb', 'ast', 'blk', 'stl',
            'fgm', 'fga', 'fgp', 'fg3m', 'fg3a', 'fg3p', 'ftm', 'fta', 'ftp', 'turnover']),
    };


    let selectedGroup = 0;

    function completeStats(playerStats: SeasonAverageStats[]) {
        playerStats.forEach(stat => {
            const season = stat.season;
            stat.teamStr = stat.team.abbreviation;
            stat.teamId = stat.team.id;
            stat.seasonStr = `${season}-${(season + 1).toString().substring(2)}`;
            const roundToOneDecimal = (value: number) => parseFloat(value.toFixed(1));

            const propertiesToRound: (keyof SeasonAverageStats)[]
                = ['pts', 'reb', 'blk', 'stl', 'ast', 'fg3m', 'fg3a', 'fga', 'fgm', 'fta', 'ftm', 'turnover'];

            propertiesToRound.forEach((property: keyof SeasonAverageStats) => {
                stat[property] = roundToOneDecimal(stat[property]);
            });

            stat.fg3p = roundToOneDecimal((stat.fg3m / stat.fg3a) * 100);
            stat.fgp = roundToOneDecimal((stat.fgm / stat.fga) * 100);
            stat.ftp = roundToOneDecimal((stat.ftm / stat.fta) * 100);
        });

        // Sort by seasonStr in descending order
        playerStats.sort((a, b) => b.seasonStr.localeCompare(a.seasonStr));
    }

    async function updatePlayerStats(startSeason: string, endSeason: string): string[] {
        isLoading = true;
        player = await getPlayerBio(id, parseInt(startSeason), parseInt(endSeason));
        playerStats = player.seasonAverageStats;
        completeStats(playerStats);
        isLoading = false;
    }

    onMount(() => {
        updatePlayerStats((SeasonConstants.currentSeason - PlayerConstants.seasonGroupSize + 1).toString(),
            (SeasonConstants.currentSeason + 1).toString());
    });
</script>

<style>
    select option {
        background-color: #f2f2f2;
    }
</style>
<PlayerExpanded player={player} pageType="bio">
    <select bind:value={selectedGroup}
            on:change={() => updatePlayerStats(groups[selectedGroup][0], groups[selectedGroup][1])}
            class="mt-5 select variant-filled-primary border-none shadow">
        {#each groups as g, index}
            <option value={index}>{g[2]}</option>
        {/each}
    </select>
    {#if isLoading}
        <div class="my-5">
            <ProgressRadial width="w-12" value={undefined}/>
        </div>
    {:else}
        <Table table={table} tableType={TableTypes.playerTable} teamIds={teamIds}/>
    {/if}
</PlayerExpanded>