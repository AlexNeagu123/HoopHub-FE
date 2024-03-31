<script lang="ts">
    import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";
    import GamePresentation from "$lib/components/games/GamePresentation.svelte";
    import {SlideToggle, TabAnchor, TabGroup} from "@skeletonlabs/skeleton";

    export let gameDetails: GameWithBoxScore;
    export let hiddenScores: boolean = false;
    export let pageType: string = 'box-scores';
    $: isBoxScores = pageType === 'box-scores';
    export let isHomeTeamBoxScore: boolean = true;
    export let isVisitorTeamBoxScore: boolean = false;

    function toggleBoxScore() {
        isHomeTeamBoxScore = !isHomeTeamBoxScore;
        isVisitorTeamBoxScore = !isVisitorTeamBoxScore;
    }
</script>

<div class="flex justify-center">
    <div class="w-5/6 shadow p-5 my-5 rounded-2xl">
        <GamePresentation hiddenScores={hiddenScores} game={gameDetails} imageWidth="w-1/3"/>
        <div class="mt-3 flex justify-around">
            <SlideToggle active="bg-secondary-600" background="bg-secondary-400" name="slider-label" bind:checked={isHomeTeamBoxScore} on:click={toggleBoxScore}/>
            <TabGroup border="none" justify="justify-start"
                      active="hover:bg-secondary-500 border-b-2 border-secondary-600 font-semibold"
                      hover="hover:bg-secondary-500">
                <TabAnchor href="/" selected={isBoxScores}>Box Scores</TabAnchor>
                <TabAnchor href="/" selected={!isBoxScores}>Game Charts</TabAnchor>
            </TabGroup>
            <SlideToggle active="bg-secondary-600" background="bg-secondary-400" name="slider-label" bind:checked={isVisitorTeamBoxScore} on:click={toggleBoxScore}/>
        </div>
        <div class="mt-3">
            <slot/>
        </div>
    </div>
</div>