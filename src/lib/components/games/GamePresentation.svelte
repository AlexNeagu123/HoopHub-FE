<script lang="ts">
    import {Avatar} from "@skeletonlabs/skeleton";
    import type {Game} from "$lib/models/nba_data/games/Game";
    import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";
    import {statusToET} from "$lib/utils/date-parser";
    import {liveBoxScoreStore} from "$lib/stores/live-games.store";
    import {onDestroy} from "svelte";

    export let game: Game | GameWithBoxScore;    
    export let hiddenScores: boolean = false;
    export let imageWidth: string = "w-1/2";
    export let border: string = "";

    let isLive = false;
    let gameFromSocket: GameWithBoxScore;

    const unsubscribe = liveBoxScoreStore.subscribe((boxScoreList) => {
        boxScoreList.forEach(boxScore => {
            if (boxScore.homeTeam.apiId !== game.homeTeam.apiId || boxScore.visitorTeam.apiId !== game.visitorTeam.apiId || boxScore.date !== game.date) {
                return;
            }
            isLive = boxScore.status.includes("Qtr") || boxScore.status.includes("Halftime");
            gameFromSocket = boxScore;
        });
    });

    onDestroy(unsubscribe);
</script>

<style>
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    .pulse-animation {
        animation: pulse 1s infinite;
    }
</style>

<div class="flex {border}">
    <div class="w-1/4 flex flex-col items-center">
        <div class="flex justify-center">
            <Avatar src="{game.visitorTeam.imageUrl}" width={imageWidth} rounded="rounded-lg"
                    background="bg-transparent"/>
        </div>
        <p class="lg:font-semibold lg:ext-lg text-gray-800">{game.visitorTeam.fullName.split(" ").pop()}</p>
    </div>
    <div class="w-1/2 flex justify-around items-center">
        <div class="w-1/3">
            {#if !hiddenScores}
                <p class="lg:font-semibold lg:text-lg">{
                    isLive ?
                        gameFromSocket ?
                            gameFromSocket.visitorTeamScore
                            : ""
                        : game.visitorTeamScore ?
                            game.visitorTeamScore
                            : ""
                }
                </p>
            {/if}
        </div>
        <h6 class="h6 font-semibold text-gray-400">
            {#if isLive}
                <div class="flex items-center">
                    <span class="pr-1"><img src="/images/game/red-dot.png"
                                            class="w-4 rounded-lg bg-transparent pulse-animation" alt="AB"></span>
                    <span>{gameFromSocket.time}</span>
                </div>
            {:else}
                {statusToET(game.status)}
            {/if}
        </h6>
        <div class="text-end w-1/3">
            {#if !hiddenScores}
                <p class="lg:font-semibold lg:text-lg"> {
                    isLive ?
                        gameFromSocket ?
                            gameFromSocket.homeTeamScore
                            : ""
                        : game.homeTeamScore ?
                            game.homeTeamScore
                            : ""
                }
                </p>
            {/if}
        </div>
    </div>
    <div class="w-1/4 flex flex-col items-center">
        <div class="flex justify-center">
            <Avatar src="{game.homeTeam.imageUrl}" width={imageWidth} rounded="rounded-lg"
                    background="bg-transparent"/>
        </div>
        <p class="lg:font-semibold lg:text-lg text-gray-800">{game.homeTeam.fullName.split(" ").pop()}</p>
    </div>
</div>