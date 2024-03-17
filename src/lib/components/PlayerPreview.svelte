<script lang="ts">
    import type {Player} from "$lib/models/nba_data/Player";
    import {Avatar} from "@skeletonlabs/skeleton";
    export let player: Player;
</script>

<div class="card mt-5 w-[49%] drop-shadow variant-filled-primary flex justify-around">
    <div class="flex align-middle justify-center">
        <div class="mr-3 mt-3">
            <div>{player.jerseyNumber}</div>
            <div>{player.position}</div>
        </div>
        <div>
            <Avatar src="{player.imageUrl}" width="w-40" rounded="rounded-lg" background="bg-transparent"/>
        </div>
    </div>

    <div class="mt-3">
        {player.firstName}
        <div>
            {player.lastName}
        </div>
    </div>
</div>