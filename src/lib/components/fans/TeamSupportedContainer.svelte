<script lang="ts">
    import type {Team} from "$lib/models/nba_data/teams/Team";
    import {AppRoute} from "$lib/constants";

    export let team: Team | null;
</script>

<h5 class="h5 text-gray-900 font-semibold my-2">
    Team Supported:
    {#if team === null}
        <span class="opacity-40">None</span>
    {:else}
        <a href="{AppRoute.TEAM}/{team.id}"
           class="cursor-pointer font-semibold text-secondary-700 hover:text-blue-600">
            {team.fullName}
        </a>
    {/if}
</h5>

