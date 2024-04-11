<script lang="ts">
    import TeamPreview from "$lib/components/teams/TeamPreview.svelte";
    import type {PageData} from './$types';
    import {RadioGroup, RadioItem} from "@skeletonlabs/skeleton";

    export let data: PageData;
    let value: string = "East";
</script>

<div class="flex justify-center mt-5">
    <RadioGroup gap="gap-5" border="none" background="variant-filled-surface" active="variant-filled-primary"
                hover="hover:variant-filled-primary">
        <RadioItem bind:group={value} name="conference" value="East">East</RadioItem>
        <RadioItem bind:group={value} name="conference" value="West">West</RadioItem>
    </RadioGroup>
</div>

<div class="flex flex-wrap justify-evenly mx-32">
    {#each data.teams as team}
        {#if team.conference === value}
            <TeamPreview team={team}/>
        {/if}
    {/each}
</div>