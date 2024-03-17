<script>
    import {AppBar, Avatar} from "@skeletonlabs/skeleton";
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
            <Avatar src="/images/logo/HoopHub.png" width="w-16" rounded="rounded-lg" background="bg-transparent"/>
        </div>
    </svelte:fragment>
    <div class="flex justify-around">
        <a type="button" class="btn variant-filled-primary text-xl" href="/teams">Teams</a>
        <a type="button" class="btn variant-filled-primary text-xl" href="/">Standings</a>
        <a type="button" class="btn variant-filled-primary text-xl" href="/">Games</a>
    </div>
    <svelte:fragment slot="trail">
        <button type="button" class="btn variant-filled-primary text-xl">Sign Up</button>
    </svelte:fragment>
</AppBar>
