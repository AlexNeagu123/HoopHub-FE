<script lang="ts">
    import {ProgressRadial} from "@skeletonlabs/skeleton";
    import type {Game} from "$lib/models/nba_data/games/Game";
    import Card from "$lib/components/games/Card.svelte";
    import GamePreview from "$lib/components/games/GamePreview.svelte";

    export let isLoading: boolean = true;
    export let hiddenScores: boolean = false;
    export let games: Game[] = [];
</script>

<Card inputClass="mt-2">
    {#if isLoading}
        <div class="my-5">
            <ProgressRadial width="w-12" value={undefined}/>
        </div>
    {:else}
        {#each games as game}
            <GamePreview hiddenScores={hiddenScores} game={game}/>
        {/each}
    {/if}
</Card>