<script lang="ts">
	import getGamesByDate from '$lib/services/nba_data/games/getGamesByDate';
	import type { Game } from '$lib/models/nba_data/games/Game';
	import GamesHeader from '$lib/components/games/GamesHeader.svelte';
	import GamesContainer from '$lib/components/games/GamesContainer.svelte';
	import { onMount } from 'svelte';
	import { dateToString } from '$lib/utils/date-parser';
	import getAllGameReviewsByDateAndFan from '$lib/services/user_features/game-reviews/getAllGameReviewsByDateAndFan';
	import type { GameReviewAverage } from '$lib/models/user_features/reviews/GameReviewAverage';

	let isLoading: boolean = false;

	let games: Game[] = [];
	let gameReviewAverages: GameReviewAverage[] = [];

	let lastDate: string = dateToString(new Date());
	let scoresHidden: boolean = false;

	async function fetchGames(date: string) {
		isLoading = true;
		games = await getGamesByDate(date);
		gameReviewAverages = await getAllGameReviewsByDateAndFan(date);
		isLoading = false;
	}

	onMount(async () => {
		await fetchGames(dateToString(new Date()));
	});

	async function changeGames(e: CustomEvent) {
		if (e.detail === lastDate) {
			return;
		}
		lastDate = e.detail;
		await fetchGames(e.detail);
	}

	function hideScores() {
		scoresHidden = !scoresHidden;
	}
</script>

<GamesHeader dateChangeHandler={changeGames} hideScoresHandler={hideScores} />
<GamesContainer hiddenScores={scoresHidden} {isLoading} {games} {gameReviewAverages} />