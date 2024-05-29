<script lang="ts">
	import type { GameWithBoxScore } from '$lib/models/nba_data/box-scores/GameWithBoxScore';
	import GamePresentation from '$lib/components/games/GamePresentation.svelte';
	import { TabAnchor, TabGroup, getToastStore } from '@skeletonlabs/skeleton';
	import { AppRoute, GamePageTypes, ToastMessages } from '$lib/constants';
	import getGameThreadsByDate from '$lib/services/user_features/game-threads/getGameThreadsByDate';
	import type { GameThread } from '$lib/models/user_features/threads/GameThread';
	import type { GameReviewAverage } from '$lib/models/user_features/reviews/GameReviewAverage';
	import { currentUser } from '$lib/stores/auth.store';

	export let gameDetails: GameWithBoxScore;
	export let hiddenScores: boolean = false;
	export let pageType: GamePageTypes;
	export let gameReviewAverages: GameReviewAverage[];

	const url = new URL(window.location.href);
	const toastStore = getToastStore();

	const homeTeamId = url.searchParams.get('homeTeam');
	const visitorTeamId = url.searchParams.get('visitorTeam');
	const date = url.searchParams.get('date');

	const boxScoresUrl = `${AppRoute.GAME}?homeTeam=${homeTeamId}&visitorTeam=${visitorTeamId}&date=${date}`;
	const chartsUrl = `${AppRoute.GAME}/charts/?homeTeam=${homeTeamId}&visitorTeam=${visitorTeamId}&date=${date}`;
	const threadUrl = `${AppRoute.GAME_THREAD}?homeTeam=${homeTeamId}&visitorTeam=${visitorTeamId}&date=${date}`;
	const reviewsUrl = `${AppRoute.GAME_REVIEWS}?homeTeam=${homeTeamId}&visitorTeam=${visitorTeamId}&date=${date}`;
	const performancesUrl = `${AppRoute.GAME_PERFORMANCES}?homeTeam=${homeTeamId}&visitorTeam=${visitorTeamId}&date=${date}`;

	async function checkThreadExists(event: Event) {
		event.preventDefault();
		var gameThreads: GameThread[] = await getGameThreadsByDate(date!);
		gameThreads.filter(
			(thread) =>
				thread.homeTeamId === Number(homeTeamId) && thread.visitorTeamId === Number(visitorTeamId)
		);

		if (gameThreads.length === 0) {
			toastStore.trigger({
				message: ToastMessages.noGameThread,
				background: 'variant-filled-error'
			});
		} else {
			window.location.href = threadUrl;
		}
	}

	function getGameAverage(): number | null {
		const reviews = gameReviewAverages.filter(
			(review) =>
				review.homeTeamId === gameDetails.homeTeam.apiId &&
				review.visitorTeamId === gameDetails.visitorTeam.apiId &&
				review.date === gameDetails.date
		);

		if (reviews.length === 0) return null;
		return reviews[0].averageRating;
	}

	function checkLoggedIn(event: Event) {
		if (!$currentUser.isLoggedIn) {
			event.preventDefault();
			toastStore.trigger({
				message: ToastMessages.actionRequiresLogIn,
				background: 'variant-filled-error'
			});
		}
	}

	async function checkGameStarted(event: Event) {
		event.preventDefault();
		if (gameDetails.period === 0) {
			toastStore.trigger({
				message: ToastMessages.gameNotStarted,
				background: 'variant-filled-error'
			});
		} else {
			window.location.href = chartsUrl;
		}
	}
</script>

<div class="flex justify-center">
	<div class="w-5/6 shadow p-5 my-5 rounded-2xl">
		<GamePresentation
			{hiddenScores}
			game={gameDetails}
			imageWidth="w-1/3"
			average={getGameAverage()}
		/>
		<div class="flex justify-center my-10 mx-4">
			<TabGroup
				border="none"
				justify="justify-start"
				active="hover:bg-secondary-500 border-b-2 border-secondary-600 font-semibold"
				hover="hover:bg-secondary-500"
			>
				<TabAnchor href={boxScoresUrl} selected={pageType === GamePageTypes.BOX_SCORE}
					>Box Scores</TabAnchor
				>
				<TabAnchor
					href={chartsUrl}
					selected={pageType === GamePageTypes.CHARTS}
					on:click={checkGameStarted}>Game Charts</TabAnchor
				>
				<TabAnchor
					on:click={checkLoggedIn}
					href={threadUrl}
					selected={pageType === GamePageTypes.THREAD}
					on:click={checkThreadExists}>Thread</TabAnchor
				>
				<TabAnchor
					on:click={checkLoggedIn}
					href={reviewsUrl}
					selected={pageType === GamePageTypes.REVIEWS}
				>
					Reviews
				</TabAnchor>
				<TabAnchor
					on:click={checkLoggedIn}
					href={performancesUrl}
					selected={pageType === GamePageTypes.PERFORMANCES}
				>
					Performances
				</TabAnchor>
			</TabGroup>
		</div>
		<div class="mt-3">
			<slot />
		</div>
	</div>
</div>
