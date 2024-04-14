<script lang="ts">
    import {onMount} from "svelte";
    import {ProgressRadial} from "@skeletonlabs/skeleton";
    import type {Standings} from "$lib/models/nba_data/standings/Standings";
    import getStandingsBySeason from "$lib/services/nba_data/standings/getStandingsBySeason";
    import {seasonFromStrToInt} from "$lib/utils/standings-utils";

    export let season: string;
    export let group: string;

    let isLoading = false;

    let standings: Standings;

    onMount(async () => {
        isLoading = true;
        standings = await getStandingsBySeason(seasonFromStrToInt(season));
        
        isLoading = false;
    });
</script>

<div class="flex justify-center">
    <div class="card variant-filled-surface w-5/6 p-3 px-10 shadow">
        {#if isLoading}
            <div class="my-5">
                <ProgressRadial width="w-12" value={undefined}/>
            </div>
        {:else}
            {season}
            {group}
        {/if}
    </div>
</div>
