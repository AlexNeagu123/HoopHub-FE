<script lang="ts">
	import type { PageData } from './$types';
	import FanProfile from '$lib/components/fans/FanProfile.svelte';

	export let data: PageData;
	import { onMount } from 'svelte';
	import { DynamicPaginationThresholds, ProfilePageTypes } from '$lib/constants';
	import type { GameReview } from '$lib/models/user_features/reviews/GameReview';
	import FanGameReviewsContainer from '$lib/components/reviews/FanGameReviewsContainer.svelte';
	import type { Team } from '$lib/models/nba_data/teams/Team';
	import getAllTeams from '$lib/services/nba_data/teams/getAllTeams';
	import getFanGameReviewsPaged from '$lib/services/user_features/game-reviews/getFanGameReviewsPaged';
	import { page } from '$app/stores';

	let currentPage = 1;
	let currentSize = DynamicPaginationThresholds.TeamThreadsThreshold;
	let allReviewsLoading: boolean = true;
	let teams: Team[] = [];
	let id = $page.params.id;

	let reviewsBatch: GameReview[] = [];
	let reviews: GameReview[] = [];
	$: reviews = [...reviews, ...reviewsBatch];

	async function fetchReviews() {
		reviewsBatch = await getFanGameReviewsPaged(id, currentPage, currentSize);
		currentPage++;
	}

	onMount(async () => {
		allReviewsLoading = true;
		await fetchReviews();
		teams = await getAllTeams();
		allReviewsLoading = false;
	});
</script>

<FanProfile
	profilePageInfo={data.profilePageInfo}
	ownInfo={data.fanInfo}
	profilePageType={ProfilePageTypes.REVIEWS}
>
	<FanGameReviewsContainer bind:allReviewsLoading bind:reviews bind:reviewsBatch {fetchReviews} {teams} />
</FanProfile>
