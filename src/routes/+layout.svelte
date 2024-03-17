<script lang="ts">
    import '../app.pcss';
    import {AppShell} from "@skeletonlabs/skeleton";
    import NavBar from "$lib/components/NavBar.svelte";
</script>


<AppShell>
    <svelte:fragment slot="header">
        <NavBar/>
    </svelte:fragment>
    <slot/>
</AppShell>