<script lang="ts">
    import type {PageData} from './$types';
    import PlayerExpanded from "$lib/components/players/PlayerExpanded.svelte";
    import type {Player} from "$lib/models/nba_data/players/Player";
    import {tableMapperValues} from "@skeletonlabs/skeleton";
    import {TableTypes} from "$lib/constants";
    import Table from "$lib/components/shared/Table.svelte";
    export let data: PageData;

    const player: Player = data.player;
    const playerStats = player.seasonAverageStats;

    playerStats.forEach(e => {
        e.teamStr = e.team.abbreviation;
    });

    $: table = {
        head: ['Season', 'Team', 'GP'],
        body: tableMapperValues(playerStats, ['season', 'teamStr', 'gamesPlayed']),
    };
</script>

<PlayerExpanded player={data.player} pageType="bio">
    <Table table={table} tableType={TableTypes.playerTable}/>
</PlayerExpanded>

