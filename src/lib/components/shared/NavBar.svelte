<script lang="ts">
    import {AppBar, Avatar} from "@skeletonlabs/skeleton";
    import {currentUser} from "$lib/stores/auth.store";
    import logout from "$lib/services/user_access/logout";
    import {AppRoute, SeasonConstants} from "$lib/constants";
    import {seasonFromIntToStr} from "$lib/utils/standings-utils";
</script>

<style>
    .avatar:hover {
        filter: brightness(120%);
        transition: filter 0.3s ease;
    }
</style>

<AppBar gridColumns="grid-cols-3" slotDefault="place-content-start" slotTrail="place-content-end"
        background="bg-surface-500" border="border border-solid border-surface-600 border-t-0">
    <svelte:fragment slot="lead">
        <div class="avatar">
            <Avatar src="/images/logo/HoopHub.png" width="w-10" rounded="rounded-lg" background="bg-transparent"/>
        </div>
    </svelte:fragment>
    <div class="flex justify-around">
        <a type="button" class="btn variant-filled-surface text-xl" href="{AppRoute.TEAMS}">Teams</a>
        <a type="button" class="btn variant-filled-surface text-xl" href="{AppRoute.GAMES}">Games</a>
        <a type="button" class="btn variant-filled-surface text-xl"
           href="{AppRoute.STANDINGS}?season={seasonFromIntToStr(SeasonConstants.currentSeason)}">
            Standings
        </a>
        <a type="button" class="btn variant-filled-surface text-xl"
           href="{AppRoute.PLAYOFFS}?season={seasonFromIntToStr(SeasonConstants.currentSeason - 1)}">
            Playoffs
        </a>
    </div>
    <svelte:fragment slot="trail">
        {#if $currentUser.isLoggedIn}
            <a on:click={logout} href="{AppRoute.HOME}" type="button"
               class="btn variant-filled-surface text-xl">Logout</a>
        {:else}
            <a type="button" class="btn variant-filled-surface text-xl" href="{AppRoute.LOGIN}">Login</a>
        {/if}
    </svelte:fragment>
</AppBar>
