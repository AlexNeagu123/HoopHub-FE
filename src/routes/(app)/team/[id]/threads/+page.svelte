<script lang="ts">
	import type { PageData } from './$types';
	import { DynamicPaginationThresholds, TeamPageTypes } from '$lib/constants.js';
	import TeamExpanded from '$lib/components/teams/TeamExpanded.svelte';
	import { onMount } from 'svelte';
	import getTeamThreadsPaged from '$lib/services/user_features/threads/getTeamThreadsPaged';
	import { page } from '$app/stores';
	import type { TeamThread } from '$lib/models/user_features/threads/TeamThread';
	import TeamThreadList from '$lib/components/threads/TeamThreadList.svelte';

	export let data: PageData;

	let teamFollows = data.teamFollows;
	let isLoading: boolean = true;
	let id = $page.params.id;

	let threadsBatch: TeamThread[] = [];
	let threads: TeamThread[] = [];
	$: threads = [...threads, ...threadsBatch];

	let currentPage = 1;
	let currentSize = DynamicPaginationThresholds.TeamThreadsThreshold;
	
	async function fetchData() {
		threadsBatch = await getTeamThreadsPaged(currentPage, currentSize, id);
		currentPage++;
	}

	onMount(async () => {
		isLoading = true;
		await fetchData();
		isLoading = false;
	});
</script>

<TeamExpanded team={data.team} pageType={TeamPageTypes.THREADS} {teamFollows}>
	<TeamThreadList bind:threadsBatch bind:isLoading bind:threads {fetchData} />
</TeamExpanded>
