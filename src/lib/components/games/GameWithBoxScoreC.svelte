<script lang="ts">
    import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";
    import GamePresentation from "$lib/components/games/GamePresentation.svelte";
    import {TabAnchor, TabGroup} from "@skeletonlabs/skeleton";
    import {AppRoute, GamePageTypes} from "$lib/constants";

    export let gameDetails: GameWithBoxScore;
    export let hiddenScores: boolean = false;
    export let pageType: GamePageTypes;

    const url = new URL(window.location.href);

    const homeTeamId = url.searchParams.get("homeTeam");
    const visitorTeamId = url.searchParams.get("visitorTeam");
    const date = url.searchParams.get("date");
    const boxScoresUrl = `${AppRoute.GAME}?homeTeam=${homeTeamId}&visitorTeam=${visitorTeamId}&date=${date}`;
    const chartsUrl = `${AppRoute.GAME}/charts/?homeTeam=${homeTeamId}&visitorTeam=${visitorTeamId}&date=${date}`;
    const threadUrl = `${AppRoute.GAME_THREAD}?homeTeam=${homeTeamId}&visitorTeam=${visitorTeamId}&date=${date}`;
</script>

<div class="flex justify-center">
    <div class="w-5/6 shadow p-5 my-5 rounded-2xl">
        <GamePresentation hiddenScores={hiddenScores} game={gameDetails} imageWidth="w-1/3"/>
        <div class="flex justify-center my-10 mx-4">
            <TabGroup border="none" justify="justify-start"
                      active="hover:bg-secondary-500 border-b-2 border-secondary-600 font-semibold"
                      hover="hover:bg-secondary-500">
                <TabAnchor href="{boxScoresUrl}" selected={pageType === GamePageTypes.BOX_SCORE}>Box Scores</TabAnchor>
                <TabAnchor href="{chartsUrl}" selected={pageType === GamePageTypes.CHARTS}>Game Charts</TabAnchor>
                <TabAnchor href="{threadUrl}" selected={pageType === GamePageTypes.THREAD}>Thread</TabAnchor>
            </TabGroup>
        </div>
        <div class="mt-3">
            <slot/>
        </div>
    </div>
</div>