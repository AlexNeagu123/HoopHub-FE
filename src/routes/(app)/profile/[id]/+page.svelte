<script lang="ts">
    import type {PageData} from './$types';
    import FanProfile from "$lib/components/fans/FanProfile.svelte";

    export let data: PageData;
</script>

<FanProfile profilePageInfo={data.profilePageInfo} ownInfo={data.fanInfo}>
</FanProfile>