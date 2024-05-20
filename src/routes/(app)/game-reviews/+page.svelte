<script lang="ts">
	import type { PageData } from './$types';
	import GameWithBoxScoreC from '$lib/components/games/GameWithBoxScoreC.svelte';
	import { DynamicPaginationThresholds, GamePageTypes } from '$lib/constants';
	import ReviewOwnSection from '$lib/components/reviews/ReviewOwnSection.svelte';
	import { onMount } from 'svelte';
	import AllGameReviewsContainer from '$lib/components/reviews/AllGameReviewsContainer.svelte';
	import type { GameReview } from '$lib/models/user_features/reviews/GameReview';
	import getAllGameReviewsPaged from '$lib/services/user_features/game-reviews/getAllGameReviewsPaged';

	export let data: PageData;

	let gameDetails = data.gameWithBoxScore;
	let ownGameReview = data.ownGameReview;
	let gameReviewAverages = data.gameReviewAverages;

	let allReviewsLoading = false;
	let currentPage = 1;
	let currentSize = DynamicPaginationThresholds.GameReviewsThreshold;

	let reviewsBatch: GameReview[] = [];
	let reviews: GameReview[] = [];
	$: reviews = [...reviews, ...reviewsBatch];

	async function fetchReviews() {
		reviewsBatch = await getAllGameReviewsPaged(
			currentPage,
			currentSize,
			gameDetails.homeTeam.apiId,
			gameDetails.visitorTeam.apiId,
			gameDetails.date
		);

		currentPage++;
	}

	onMount(async () => {
		allReviewsLoading = true;
		await fetchReviews();
		allReviewsLoading = false;
	});
</script>

<GameWithBoxScoreC {gameDetails} pageType={GamePageTypes.REVIEWS} {gameReviewAverages}>
	<ReviewOwnSection {ownGameReview} {gameDetails} />
</GameWithBoxScoreC>
<AllGameReviewsContainer bind:allReviewsLoading bind:reviews bind:reviewsBatch {fetchReviews} />
