<script lang="ts">
    import {AppRoute} from "$lib/constants";
    import logout from "$lib/services/user_access/logout";
    import {goto} from "$app/navigation";

    export let link: string;
    export let linkText: string;

    function logoutHandler() {
        logout();
        goto(AppRoute.TEAMS)
    }
</script>

{#if link === AppRoute.LOGOUT}
    <div on:click={logoutHandler} class="flex justify-around p-6 rounded-md mb-2 card-hover cursor-pointer">
        <div class="w-5">
            <slot/>
        </div>
        <p class="mx-4">
            {linkText}
        </p>
    </div>
{:else}
    <a href={link} class="flex justify-around p-6 rounded-md mb-2 card-hover cursor-pointer">
        <div class="w-5">
            <slot/>
        </div>
        <p class="mx-4">
            {linkText}
        </p>
    </a>
{/if}