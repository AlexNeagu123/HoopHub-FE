<script lang="ts">
    import type {Team} from "$lib/models/nba_data/teams/Team";
    import {Avatar} from "@skeletonlabs/skeleton";
    import {AppRoute} from "$lib/constants";

    export let team: Team;
</script>

<div class="card my-7 mx-6 w-1/5 text-center p-1 card-hover variant-filled-primary drop-shadow">
    <a href="{AppRoute.TEAM}/{team.id}">
        <header class="card-header text-3xl p-5">{team.fullName}</header>
        <section>
            <div class="flex justify-center items-center">
                <Avatar src="{team.imageUrl}" width="w-2/3" rounded="rounded-lg" background="bg-transparent"/>
            </div>
        </section>
    </a>
</div>