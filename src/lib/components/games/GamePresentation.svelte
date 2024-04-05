<script lang="ts">
import {Avatar} from "@skeletonlabs/skeleton";
import type {Game} from "$lib/models/nba_data/games/Game";
import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";
import {statusToET} from "$lib/utils/date-parser";
export let game: Game | GameWithBoxScore;
export let hiddenScores: boolean = false;
export let imageWidth: string = "w-1/2";
export let border: string = "";

if(game.time && game.time != "Final") {
    game.time = "Final";
}

</script>

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
                <p class="lg:font-semibold lg:text-lg">{game.visitorTeamScore ? game.visitorTeamScore : ""}</p>
            {/if}
        </div>
        <h6 class="h6 font-semibold text-gray-400">
            {statusToET(game.status)}
        </h6>
        <div class="text-end w-1/3">
            {#if !hiddenScores}
                <p class="lg:font-semibold lg:text-lg">{game.homeTeamScore ? game.homeTeamScore : ""}</p>
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