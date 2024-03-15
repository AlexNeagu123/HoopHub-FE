<script lang="ts">
	import '../app.pcss';
    import {AppShell} from "@skeletonlabs/skeleton";
    import Navigation from "$lib/components/Navigation.svelte";
</script>


<AppShell slotHeader="bg-primary-600/10">
    <svelte:fragment slot="header"><Navigation /></svelte:fragment>
    <svelte:fragment slot="sidebarLeft">
    </svelte:fragment>
    <slot />
    <svelte:fragment slot="footer"></svelte:fragment>
</AppShell>