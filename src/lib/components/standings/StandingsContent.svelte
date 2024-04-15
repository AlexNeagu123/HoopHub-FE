<script lang="ts">
    import {tableMapperValues} from "@skeletonlabs/skeleton";
    import type {Standings} from "$lib/models/nba_data/standings/Standings";
    import StandingsTable from "$lib/components/standings/StandingsTable.svelte";

    export let group: string;
    export let standings: Standings[] = [];

    const tableHead = ['Team', 'Record', 'Win%', 'Home', 'Road', 'Eastern', 'Western', 'Id', 'Photo'];
    const tableBody = ['teamFullName', 'overall', 'winLossPercentage', 'home', 'road',
        'easternRecord', 'westernRecord', 'teamId', 'teamPhotoUrl'];

    const divisionTableTitles = ['Atlantic Division', 'Central Division', 'Southeast Division',
        'Northwest Division', 'Pacific Division', 'Southwest Division'];

    const conferenceTableTitles = ['Eastern Conference', 'Western Conference'];

    const accumulatedTitle = ['Accumulated Standings'];

    $: tables = group === 'Division' ? getDivisionTables()
        : group === 'Conference' ? getConferenceTables()
            : getAllTable();

    let tableTitles = [];

    $: {
        if (group) {
            onGroupChange();
        }
    }

    function getAllTable() {
        return [{
            head: tableHead,
            body: tableMapperValues(standings, tableBody)
        }]
    }

    function getConferenceTables() {
        return ['East', 'West'].map((conference) => ({
            head: tableHead,
            body: tableMapperValues(standings.filter((standing) => standing.team.conference === conference),
                tableBody)
        }));
    }

    function getDivisionTables() {
        const divisions = ['Atlantic', 'Central', 'Southeast', 'Northwest', 'Pacific', 'Southwest'];
        return divisions.map((division) => ({
            head: tableHead,
            body: tableMapperValues(standings.filter((standing) => standing.team.division === division),
                tableBody)
        }));
    }

    function onGroupChange() {
        if (group === "Division") {
            tableTitles = divisionTableTitles;
        } else if (group === "Conference") {
            tableTitles = conferenceTableTitles;
        } else {
            tableTitles = accumulatedTitle;
        }
    }
</script>

<div class="flex justify-center">
    <div class="w-[55%] flex justify-center flex-col">
        {#each tables as table, index}
            <h3 class="h3 font-bold mt-7">{tableTitles[index]}</h3>
            <StandingsTable table={table}/>
        {/each}
    </div>
</div>
