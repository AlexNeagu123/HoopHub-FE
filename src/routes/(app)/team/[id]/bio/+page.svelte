<script lang="ts">
    import TeamExpanded from "$lib/components/teams/TeamExpanded.svelte";
    import PlayerPreview from "$lib/components/players/PlayerPreview.svelte";
    import type {PageData} from './$types';

    export let data: PageData;
</script>

<TeamExpanded team={data.team} pageType="bio">
</TeamExpanded>
