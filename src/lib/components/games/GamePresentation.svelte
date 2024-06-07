<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { Game } from '$lib/models/nba_data/games/Game';
	import type { GameWithBoxScore } from '$lib/models/nba_data/box-scores/GameWithBoxScore';
	import { statusToET } from '$lib/utils/date-parser';
	import { liveBoxScoreStore } from '$lib/stores/live-games.store';
	import { onDestroy } from 'svelte';

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	import StarRating from '@ernane/svelte-star-rating';
	import { getDynamicStarConfig } from '$lib/constants';

	export let game: Game | GameWithBoxScore;
	export let hiddenScores: boolean = false;
	export let imageWidth: string = 'w-1/2';
	export let border: string = '';
	export let average: number | null = null;

	const reviewStarConfig = {
		readOnly: true,
		countStars: 5,
		range: {
			min: 0,
			max: 5,
			step: 0.1
		},
		score: average ?? 0,
		showScore: false,
		name: '',
		starConfig: getDynamicStarConfig(average)
	};

	let isLive = false;
	let gameFromSocket: GameWithBoxScore;

	const unsubscribe = liveBoxScoreStore.subscribe((boxScoreList) => {
		boxScoreList.forEach((boxScore) => {
			if (
				boxScore.homeTeam.apiId !== game.homeTeam.apiId ||
				boxScore.visitorTeam.apiId !== game.visitorTeam.apiId ||
				boxScore.date !== game.date
			) {
				return;
			}
			isLive = boxScore.status.includes('Qtr') || boxScore.status.includes('Halftime');
			gameFromSocket = boxScore;
		});
	});

	onDestroy(unsubscribe);
</script>

<div class={border}>
	<div class="flex flex-col">
		<div class="flex justify-center w-full">
			<div class="flex flex-col">
				<h5 class="h5 flex justify-center text-gray-400 py-1 font-semibold">Average Rating</h5>
				<div class="flex items-center justify-center">
					<StarRating config={reviewStarConfig} />
					<p class="px-3 font-semibold text-gray-500">{average ?? '-'} / 5</p>
				</div>
			</div>
		</div>
		<div class="w-full flex">
			<div class="w-1/4 flex flex-col items-center">
				<div class="flex justify-center">
					<Avatar
						src={game.visitorTeam.imageUrl}
						width={imageWidth}
						rounded="rounded-lg"
						background="bg-transparent"
					/>
				</div>
				<p class="lg:font-semibold lg:ext-lg text-gray-800">
					{game.visitorTeam.fullName.split(' ').pop()}
				</p>
			</div>
			<div class="w-1/2 flex justify-around items-center">
				<div class="w-1/3">
					{#if !hiddenScores}
						<p class="lg:font-semibold lg:text-lg">
							{isLive
								? gameFromSocket
									? gameFromSocket.visitorTeamScore
									: ''
								: game.visitorTeamScore
									? game.visitorTeamScore
									: ''}
						</p>
					{/if}
				</div>
				<h6 class="h6 font-semibold text-gray-400">
					{#if isLive}
						<div class="flex items-center">
							<span class="pr-1"
								><img
									src="/images/game/red-dot.png"
									class="w-4 rounded-lg bg-transparent pulse-animation"
									alt="AB"
								/></span
							>
							<span>{gameFromSocket.time}</span>
						</div>
					{:else}
						{statusToET(game.status)}
					{/if}
				</h6>
				<div class="text-end w-1/3">
					{#if !hiddenScores}
						<p class="lg:font-semibold lg:text-lg">
							{isLive
								? gameFromSocket
									? gameFromSocket.homeTeamScore
									: ''
								: game.homeTeamScore
									? game.homeTeamScore
									: ''}
						</p>
					{/if}
				</div>
			</div>
			<div class="w-1/4 flex flex-col items-center">
				<div class="flex justify-center">
					<Avatar
						src={game.homeTeam.imageUrl}
						width={imageWidth}
						rounded="rounded-lg"
						background="bg-transparent"
					/>
				</div>
				<p class="lg:font-semibold lg:text-lg text-gray-800">
					{game.homeTeam.fullName.split(' ').pop()}
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}

	.pulse-animation {
		animation: pulse 1s infinite;
	}
</style>
