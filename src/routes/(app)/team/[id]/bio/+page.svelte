<script lang="ts">
    import TeamExpanded from "$lib/components/teams/TeamExpanded.svelte";
    import type {PageData} from './$types';
    import TeamBioTable from "$lib/components/teams/TeamBioTable.svelte";
    import {TeamConstants} from "$lib/constants";

    export let data: PageData;

    data.team.teamBio.forEach(t => {
        t.season = t.season.seasonPeriod;
        if (t.playoffs == null) {
            t.playoffs = "";
        }
    });

    const groups = [];
    for (let i = 0; i < data.team.teamBio.length; i += TeamConstants.seasonsGroupSize) {
        const group = data.team.teamBio.slice(i, i + TeamConstants.seasonsGroupSize);
        const endYear = group[0].season.split('-')[1];
        const startYear = group[group.length - 1].season.split('-')[0];

        const label = `${startYear}-${endYear}`;
        groups.push({teamBios: group, label});
    }

    let selectedGroup = 0;
</script>

<style>
    select option {
        background-color: #f2f2f2;
    }
</style>

<TeamExpanded team={data.team} pageType="bio">
    <select bind:value={selectedGroup} class="mt-5 select variant-filled-primary border-none shadow">
        {#each groups as g, index}
            <option value={index}>{g.label}</option>
        {/each}
    </select>
    <TeamBioTable teamBio={groups[selectedGroup].teamBios}/>
</TeamExpanded>
