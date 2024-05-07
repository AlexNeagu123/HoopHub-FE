<script lang="ts">
    import TeamExpanded from "$lib/components/teams/TeamExpanded.svelte";
    import type {PageData} from './$types';
    import Table from "$lib/components/shared/Table.svelte";
    import {TableTypes, TeamConstants, TeamPageTypes} from "$lib/constants";
    import type {LabeledTeamBio} from "$lib/models/nba_data/teams/LabeledTeamBio";
    import {tableMapperValues} from "@skeletonlabs/skeleton";

    export let data: PageData;


    data.team.teamBio.forEach(t => {
        t.seasonStr = t.season.seasonPeriod;
        if (t.playoffs == null) {
            t.playoffs = "";
        }
    });

    const groups: LabeledTeamBio[] = [];
    for (let i = 0; i < data.team.teamBio.length; i += TeamConstants.seasonsGroupSize) {
        const group = data.team.teamBio.slice(i, i + TeamConstants.seasonsGroupSize);
        const endYear = group[0].seasonStr.split('-')[1];
        const startYear = group[group.length - 1].seasonStr.split('-')[0];

        const label = `${startYear}-${endYear}`;
        groups.push({teamBio: group, label});
    }

    let selectedGroup = 0;
    $: table = {
        head: ['Season', 'W', 'L', 'W-L %', 'Finish', 'SRS', 'PACE', 'Rel PACE', 'ORTG', 'DRTG', 'Playoffs'],
        body: tableMapperValues(groups[selectedGroup].teamBio, ['seasonStr', 'winCount', 'lossCount', 'winLossRatio', 'finish',
            'srs', 'pace', 'relPace', 'oRtg', 'dRtg', 'playoffs']),
    };
</script>

<style>
    select option {
        background-color: #f2f2f2;
    }
</style>

<TeamExpanded team={data.team} pageType={TeamPageTypes.BIO}>
    <select bind:value={selectedGroup} class="mt-5 select variant-filled-surface border-none shadow">
        {#each groups as g, index}
            <option value={index} class="font-thin text-sm">{g.label}</option>
        {/each}
    </select>
    <Table table={table} tableType={TableTypes.teamTable}/>
</TeamExpanded>
