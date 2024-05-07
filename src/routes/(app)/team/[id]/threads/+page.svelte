<script lang="ts">
	import type { PageData } from './$types';
	import { DynamicPaginationThresholds, TeamPageTypes } from '$lib/constants.js';
	import TeamExpanded from '$lib/components/teams/TeamExpanded.svelte';
	import LoadingIcon from '$lib/components/shared/LoadingIcon.svelte';
	import { onMount } from 'svelte';
	import getTeamThreadsPaged from '$lib/services/user_features/threads/getTeamThreadsPaged';
	import { page } from '$app/stores';
	import type { TeamThread } from '$lib/models/user_features/threads/TeamThread';
	import ThreadPreview from '$lib/components/threads/ThreadPreview.svelte';
	import InfiniteLoading from 'svelte-infinite-loading';

	export let data: PageData;

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

	function infiniteHandler({
		detail: { loaded, complete }
	}: {
		detail: { loaded: () => void; complete: () => void };
	}) {
		fetchData().then(() => {
			if (threadsBatch.length > 0) {
				loaded();
			} else {
				complete();
			}
		});
	}
</script>

<TeamExpanded team={data.team} pageType={TeamPageTypes.THREADS}>
	{#if isLoading}
		<LoadingIcon />
	{:else}
		<div class="mt-5 flex flex-wrap justify-between">
			{#each threads as t}
				<ThreadPreview title={t.title} author={t.fan} time={t.createdDate} content={t.content} />
			{/each}
		</div>
		<InfiniteLoading on:infinite={infiniteHandler}>
			<div slot="noMore"></div>
			<div slot="noResults"></div>
		</InfiniteLoading>
	{/if}
</TeamExpanded>
