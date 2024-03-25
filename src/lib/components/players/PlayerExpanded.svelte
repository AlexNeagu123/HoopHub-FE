<script lang="ts">
    import {Avatar} from "@skeletonlabs/skeleton";
    import type {Player} from "$lib/models/nba_data/players/Player";
    import type {SeasonAverageStats} from "$lib/models/nba_data/players/SeasonAverageStats";
    import PlayerHeader from "$lib/components/players/PlayerHeader.svelte";

    export let player: Player;
    let playerStats: SeasonAverageStats = player.seasonAverageStats[0];

</script>

<div class="flex justify-center">
    <div class="card variant-filled-primary m-10 w-3/4 p-5 px-10 drop-shadow">
        <div class="flex justify-start border-b-2 border-b-secondary-400">
            <div class="w-1/4 drop-shadow">
                <a href="/team/{playerStats.team.id}">
                    <Avatar width="w-1/3" rounded="rounded-lg" background="bg-transparent"
                            src="{playerStats.team.imageUrl}"/>
                </a>
                <div class="mb-0">
                    <img class="drop-shadows w-6/7 bg-transparent" alt="AB" src="{player.imageUrl}"/>
                </div>
            </div>
            <PlayerHeader player={player} playerStats={playerStats}/>
        </div>
    </div>
</div>

