<script lang="ts">
    import {Avatar} from "@skeletonlabs/skeleton";
    import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore.ts";
    import LeadersEntry from "$lib/components/games/LeadersEntry.svelte";
    import {findMaxByProperty} from "$lib/utils/game-stats";

    export let game: GameWithBoxScore
    $: homeTeamPlayerStats = game.homeTeam.players;
    $: visitorTeamPlayerStats = game.visitorTeam.players;

    $: pointIndexes = [findMaxByProperty(homeTeamPlayerStats, "pts"), findMaxByProperty(visitorTeamPlayerStats, "pts")];
    $: reboundIndexes = [findMaxByProperty(homeTeamPlayerStats, "reb"), findMaxByProperty(visitorTeamPlayerStats, "reb")];
    $: assistIndexes = [findMaxByProperty(homeTeamPlayerStats, "ast"), findMaxByProperty(visitorTeamPlayerStats, "ast")];
    $: blockIndexes = [findMaxByProperty(homeTeamPlayerStats, "blk"), findMaxByProperty(visitorTeamPlayerStats, "blk")];
    $: stealIndexes = [findMaxByProperty(homeTeamPlayerStats, "stl"), findMaxByProperty(visitorTeamPlayerStats, "stl")];
</script>

<div class="flex justify-center">
    <div class="card container w-3/4 variant-filled-surface shadow p-6">
        <div class="card-header flex justify-around">
            <Avatar src="{game.visitorTeam.imageUrl}" width="w-1/12" rounded="rounded-lg"
                    background="bg-transparent"/>
            <div class="flex items-center">
                <h2 class="h2 font-semibold text-gray-600">Leaders</h2>
            </div>
            <Avatar src="{game.homeTeam.imageUrl}" width="w-1/12" rounded="rounded-lg"
                    background="bg-transparent"/>
        </div>
        <div class="flex flex-wrap">
            <LeadersEntry field="pts" game={game} homeTeamPlayerIndex={pointIndexes[0]}
                          visitorTeamPlayerIndex={pointIndexes[1]} entryName="Points"/>
            <LeadersEntry field="reb" game={game} homeTeamPlayerIndex={reboundIndexes[0]}
                          visitorTeamPlayerIndex={reboundIndexes[1]} entryName="Rebounds"/>
            <LeadersEntry field="ast" game={game} homeTeamPlayerIndex={assistIndexes[0]}
                          visitorTeamPlayerIndex={assistIndexes[1]} entryName="Assists"/>
            <LeadersEntry field="stl" game={game} homeTeamPlayerIndex={stealIndexes[0]}
                          visitorTeamPlayerIndex={stealIndexes[1]} entryName="Steals"/>
            <LeadersEntry field="blk" game={game} homeTeamPlayerIndex={blockIndexes[0]}
                          visitorTeamPlayerIndex={blockIndexes[1]} entryName="Blocks"/>
        </div>
    </div>
</div>