<script lang="ts">
    import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";
    import GamePresentation from "$lib/components/games/GamePresentation.svelte";
    import {TabAnchor, TabGroup} from "@skeletonlabs/skeleton";
    import {AppRoute} from "$lib/constants";

    export let gameDetails: GameWithBoxScore;
    export let hiddenScores: boolean = false;
    export let pageType: string = 'box-scores';
    $: isBoxScores = pageType === 'box-scores';

    const url = new URL(window.location.href);

    const homeTeamId = url.searchParams.get("homeTeam");
    const visitorTeamId = url.searchParams.get("visitorTeam");
    const date = url.searchParams.get("date");
    const boxScoresUrl = `${AppRoute.GAME}?homeTeam=${homeTeamId}&visitorTeam=${visitorTeamId}&date=${date}`;
    const chartsUrl = `${AppRoute.GAME}/charts/?homeTeam=${homeTeamId}&visitorTeam=${visitorTeamId}&date=${date}`;
</script>

<div class="flex justify-center">
    <div class="w-5/6 shadow p-5 my-5 rounded-2xl">
        <GamePresentation hiddenScores={hiddenScores} game={gameDetails} imageWidth="w-1/3"/>
        <div class="flex justify-center my-10 mx-4">
            <TabGroup border="none" justify="justify-start"
                      active="hover:bg-secondary-500 border-b-2 border-secondary-600 font-semibold"
                      hover="hover:bg-secondary-500">
                <TabAnchor href="{boxScoresUrl}" selected={isBoxScores}>Box Scores</TabAnchor>
                <TabAnchor href="{chartsUrl}" selected={!isBoxScores}>Game Charts</TabAnchor>
            </TabGroup>
        </div>
        <div class="mt-3">
            <slot/>
        </div>
    </div>
</div>