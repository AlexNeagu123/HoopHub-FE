<script lang="ts">
	import type { PageData } from './$types';
	import FanProfile from '$lib/components/fans/FanProfile.svelte';

	export let data: PageData;
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import getCommentsByUser from '$lib/services/user_features/comments/getCommentsByUser';
	import { DynamicPaginationThresholds, ProfilePageTypes } from '$lib/constants';
	import FanCommentsList from '$lib/components/comments/FanCommentsList.svelte';
	import type { Comment } from '$lib/models/user_features/comments/Comment';
	import type { Team } from '$lib/models/nba_data/teams/Team';
	import getAllTeams from '$lib/services/nba_data/teams/getAllTeams';

	let isLoading = false;
	let id = $page.params.id;
	let currentPage = 1;
	let currentSize = DynamicPaginationThresholds.TeamThreadsThreshold;

	let comments: Comment[] = [];
	let commentsBatch: Comment[] = [];
	let teams: Team[] = [];

	$: comments = [...comments, ...commentsBatch];
	async function fetchComments() {
		commentsBatch = await getCommentsByUser(currentPage, currentSize, false, id);
		currentPage++;
	}

	onMount(async () => {
		isLoading = true;
		await fetchComments();
		teams = await getAllTeams();
		isLoading = false;
	});
</script>

<FanProfile
	profilePageInfo={data.profilePageInfo}
	ownInfo={data.fanInfo}
	profilePageType={ProfilePageTypes.COMMENTS}
>
	<FanCommentsList {comments} bind:isLoading {fetchComments} {commentsBatch} {teams} />
</FanProfile>
