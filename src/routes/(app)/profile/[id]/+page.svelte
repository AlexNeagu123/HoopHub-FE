<script lang="ts">
	import type { PageData } from './$types';
	import FanProfile from '$lib/components/fans/FanProfile.svelte';

	export let data: PageData;
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { DynamicPaginationThresholds, ThreadWidthTypes } from '$lib/constants';
	import type { TeamThread } from '$lib/models/user_features/threads/TeamThread';
	import getTeamThreadsByUserPaged from '$lib/services/user_features/threads/getTeamThreadsByUserPaged';
	import TeamThreadList from '$lib/components/threads/TeamThreadList.svelte';

	let currentPage = 1;
	let currentSize = DynamicPaginationThresholds.TeamThreadsThreshold;
	let isLoading: boolean = true;
	let id = $page.params.id;
	let threadsBatch: TeamThread[] = [];

	let threads: TeamThread[] = [];
	$: threads = [...threads, ...threadsBatch];

	async function fetchData() {
		threadsBatch = await getTeamThreadsByUserPaged(currentPage, currentSize, id);
		currentPage++;
	}

	onMount(async () => {
		isLoading = true;
		await fetchData();
		isLoading = false;
	});
</script>

<FanProfile profilePageInfo={data.profilePageInfo} ownInfo={data.fanInfo}>
	<TeamThreadList
		bind:threadsBatch
		bind:isLoading
		bind:threads
		{fetchData}
		threadWidthType={ThreadWidthTypes.FULL}
	/>
</FanProfile>
