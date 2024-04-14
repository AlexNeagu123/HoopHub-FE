<script lang="ts">
    import StandingsHeader from "$lib/components/standings/StandingsHeader.svelte";
    import {StandingGroups} from "$lib/constants";
    import StandingsContent from "$lib/components/standings/StandingsContent.svelte";

    const url = new URL(window.location.href);
    let season = url.searchParams.get("season");
    let group = StandingGroups.CONFERENCE;
</script>

<StandingsHeader bind:season={season} bind:group={group}/>
<StandingsContent season={season} group={group}/>