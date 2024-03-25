<script lang="ts">
    import type {PageData} from './$types';
    import TeamExpanded from "$lib/components/teams/TeamExpanded.svelte";
    import PlayerPreview from "$lib/components/players/PlayerPreview.svelte";
    export let data: PageData;
</script>

<TeamExpanded team={data.team} pageType="roster">
    <section>
        <div class="flex justify-between flex-wrap">
            {#each data.team.players as player}
                <PlayerPreview player={player}/>
            {/each}
        </div>
    </section>
</TeamExpanded>
