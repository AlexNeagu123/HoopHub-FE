<script lang="ts">
    import {AppBar, Avatar} from "@skeletonlabs/skeleton";
    import {currentUser} from "$lib/stores/auth.store";
</script>

<style>
    .avatar:hover {
        filter: brightness(120%);
        transition: filter 0.3s ease;
    }
</style>

<AppBar gridColumns="grid-cols-3" slotDefault="place-content-start" slotTrail="place-content-end"
        background="bg-primary-500" border="border border-solid border-primary-600 border-t-0">
    <svelte:fragment slot="lead">
        <div class="avatar">
            <Avatar src="/images/logo/HoopHub.png" width="w-14" rounded="rounded-lg" background="bg-transparent"/>
        </div>
    </svelte:fragment>
    <div class="flex justify-around">
        <a type="button" class="btn variant-filled-primary text-xl" href="/teams">Teams</a>
        <a type="button" class="btn variant-filled-primary text-xl" href="/">Standings</a>
        <a type="button" class="btn variant-filled-primary text-xl" href="/">Games</a>
    </div>
    <svelte:fragment slot="trail">
        {#if $currentUser.isLoggedIn}
            <a type="button" class="btn variant-filled-primary text-xl" href="/login">Login</a>
        {:else}
            <a type="button" class="btn variant-filled-primary text-xl" href="/login">Login</a>
        {/if}
    </svelte:fragment>
</AppBar>
