<script lang="ts">
    import type {PageData} from './$types';
    import TeamExpanded from "$lib/components/teams/TeamExpanded.svelte";

    export let data: PageData;
</script>

<p>
    <TeamExpanded team={data.team}/>
</p>