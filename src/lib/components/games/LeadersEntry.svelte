<script lang="ts">
    import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";
    import {Avatar} from "@skeletonlabs/skeleton";
    import type {BoxScorePlayer} from "$lib/models/nba_data/box-scores/BoxScorePlayer";

    export let entryName: string = "";
    export let homeTeamPlayerIndex: number = 0;
    export let visitorTeamPlayerIndex: number = 0;
    export let game: GameWithBoxScore;
    export let field: string;

    $: homePlayer = game.homeTeam.players[homeTeamPlayerIndex];
    $: visitorPlayer = game.visitorTeam.players[visitorTeamPlayerIndex];
</script>

<div class="w-full flex justify-around mt-5">
    <div class="flex flex-col w-1/5 justify-center items-center">
        <Avatar src="{visitorPlayer.player.imageUrl}" width="w-1/2" rounded="rounded-full"
                background="bg-transparent"/>
        <h6 class="text-gray-600 font-semibold h6">{visitorPlayer.player.firstName[0]}. {visitorPlayer.player.lastName}</h6>
    </div>
    <div class="flex justify-center items-center w-1/6">
        <h2 class="h3">{visitorPlayer[field]}</h2>
    </div>
    <div class="flex justify-center items-center w-1/5">
        <h4 class="h4">{entryName}</h4>
    </div>
    <div class="flex justify-center items-center w-1/6">
        <h3 class="h3">{homePlayer[field]}</h3>
    </div>
    <div class="flex flex-col w-1/5 justify-center items-center">
        <Avatar src="{homePlayer.player.imageUrl}" width="w-1/2" rounded="rounded-full"
                background="bg-transparent"/>
        <h6 class="text-gray-600 font-semibold h6">{homePlayer.player.firstName[0]}. {homePlayer.player.lastName}</h6>
    </div>
</div>