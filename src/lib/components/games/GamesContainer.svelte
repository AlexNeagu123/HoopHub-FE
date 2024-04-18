<script lang="ts">
    import type {Game} from "$lib/models/nba_data/games/Game";
    import Card from "$lib/components/shared/Card.svelte";
    import GamePreview from "$lib/components/games/GamePreview.svelte";
    import LoadingIcon from "$lib/components/shared/LoadingIcon.svelte";

    export let isLoading: boolean = true;
    export let hiddenScores: boolean = false;
    export let games: Game[] = [];
</script>

<Card inputClass="mt-2">
    {#if isLoading}
        <LoadingIcon/>
    {:else}
        {#each games as game}
            <GamePreview hiddenScores={hiddenScores} game={game}/>
        {/each}
    {/if}
</Card>