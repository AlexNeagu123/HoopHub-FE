<script lang="ts">
    import type {PageData} from './$types';
    import {TeamPageTypes} from "$lib/constants.js";
    import TeamExpanded from "$lib/components/teams/TeamExpanded.svelte";
    import LoadingIcon from "$lib/components/shared/LoadingIcon.svelte";
    import {onMount} from "svelte";
    import ThreadPreview from "$lib/components/threads/ThreadPreview.svelte";

    export let data: PageData;
    let isLoading: boolean = true;

    onMount(async () => {
        isLoading = true;
        isLoading = false;
    });
</script>

<TeamExpanded team={data.team} pageType={TeamPageTypes.THREADS}>
    {#if isLoading}
        <LoadingIcon/>
    {:else}
        <div class="mt-5 flex flex-wrap justify-between">
            <ThreadPreview title="Title" author="alexneagu" content="Lorem ipsum dolor amet ddddddsudsuhdsu dsgydsydsdssssssssssssssssssssssssss
dsjdshusdhudshudshudshdshudshudshds sdudsudsudsdsudsudsusdu udsgguhsdsudsd" time="1 week ago"/>
            <ThreadPreview title="Title" author="alexneagu" content="Lorem ipsum dolor amet ddddddsudsuhdsu dsgydsydsdssssssssssssssssssssssssss
dsjdshusdhudshudshudshdshudshudshds sdudsudsudsdsudsudsusdu udsgguhsdsudsd" time="1 week ago"/>
            <ThreadPreview title="Title" author="alexneagu" content="Lorem ipsum dolor amet ddddddsudsuhdsu dsgydsydsdssssssssssssssssssssssssss
dsjdshusdhudshudshudshdshudshudshds sdudsudsudsdsudsudsusdu udsgguhsdsudsd" time="1 week ago"/>
            <ThreadPreview title="Title" author="alexneagu" content="Lorem ipsum dolor amet ddddddsudsuhdsu dsgydsydsdssssssssssssssssssssssssss
dsjdshusdhudshudshudshdshudshudshds sdudsudsudsdsudsudsusdu udsgguhsdsudsd" time="1 week ago"/>
        </div>
    {/if}
</TeamExpanded>