<script lang="ts">
	import type { PageData } from './$types';
	import FanProfile from '$lib/components/fans/FanProfile.svelte';

	export let data: PageData;
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { DynamicPaginationThresholds, ProfilePageTypes, ThreadWidthTypes } from '$lib/constants';
	import TeamThreadList from '$lib/components/threads/TeamThreadList.svelte';
	import type { GameReview } from '$lib/models/user_features/reviews/GameReview';
	import getOwnGameReviewsPaged from '$lib/services/user_features/game-reviews/getOwnGameReviewsPaged';
	import AllGameReviewsContainer from '$lib/components/reviews/AllGameReviewsContainer.svelte';
	import FanGameReviewsContainer from '$lib/components/reviews/FanGameReviewsContainer.svelte';

	let currentPage = 1;
	let currentSize = DynamicPaginationThresholds.TeamThreadsThreshold;
	let allReviewsLoading: boolean = true;
	let id = $page.params.id;

	let reviewsBatch: GameReview[] = [];
	let reviews: GameReview[] = [];
	$: reviews = [...reviews, ...reviewsBatch];

	async function fetchReviews() {
		reviewsBatch = await getOwnGameReviewsPaged(currentPage, currentSize);
		currentPage++;
	}

	onMount(async () => {
		allReviewsLoading = true;
		await fetchReviews();
		allReviewsLoading = false;
	});
</script>

<FanProfile
	profilePageInfo={data.profilePageInfo}
	ownInfo={data.fanInfo}
	profilePageType={ProfilePageTypes.REVIEWS}
>
	<FanGameReviewsContainer bind:allReviewsLoading bind:reviews bind:reviewsBatch {fetchReviews} />
</FanProfile>
