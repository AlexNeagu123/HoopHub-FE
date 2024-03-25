<script lang="ts">
    import type {PageData} from './$types';
    import PlayerExpanded from "$lib/components/players/PlayerExpanded.svelte";
    export let data: PageData;
</script>

<PlayerExpanded player={data.player}/>
