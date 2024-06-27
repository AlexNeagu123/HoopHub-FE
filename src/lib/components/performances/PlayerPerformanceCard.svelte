<script lang="ts">
	import type { BoxScorePlayer } from '$lib/models/nba_data/box-scores/BoxScorePlayer';
	import {
		Avatar,
		Modal,
		getModalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	import StarRating from '@ernane/svelte-star-rating';
	import { getDynamicStarConfig, starRange } from '$lib/constants';
	import PlayerPerformanceRateModal from './PlayerPerformanceRateModal.svelte';
	import type { GameWithBoxScore } from '$lib/models/nba_data/box-scores/GameWithBoxScore';
	import addPlayerPerformanceReview from '$lib/services/user_features/performance/addPlayerPerformanceReview';
	import updatePlayerPerformanceReview from '$lib/services/user_features/performance/updatePlayerPerformanceReview';

	export let playerWithBoxScore: BoxScorePlayer;
	export let averageRating: number | null;
	export let gameDetails: GameWithBoxScore;
	export let ownRating: number | null;

	const modalStore = getModalStore();

	const modalRegistry: Record<string, ModalComponent> = {
		rateModal: { ref: PlayerPerformanceRateModal }
	};

	function getReviewStarConfig(score: number | null) {
		return {
			readOnly: true,
			countStars: 5,
			range: starRange,
			score: score ?? 0,
			showScore: false,
			name: '',
			starConfig: getDynamicStarConfig(score ?? 0, 12)
		};
	}

	const modal: ModalSettings = {
		type: 'component',
		component: 'rateModal',
		meta: {
			ownRating: ownRating,
			playerName: `${playerWithBoxScore.player?.firstName} ${playerWithBoxScore.player?.lastName}`,
			submitFormHandler: addPlayerPerformanceRating
		}
	};

	async function addPlayerPerformanceRating(rating: number) {
		if (ownRating === null) {
			await addPlayerPerformanceReview(
				rating,
				gameDetails.homeTeam.apiId,
				gameDetails.visitorTeam.apiId,
				gameDetails.date,
				playerWithBoxScore.player!.id
			);
		} else {
			await updatePlayerPerformanceReview(
				rating,
				gameDetails.homeTeam.apiId,
				gameDetails.visitorTeam.apiId,
				gameDetails.date,
				playerWithBoxScore.player!.id
			);
		}

		ownRating = rating;
		modal.meta.ownRating = rating;
	}

	async function openModal(event: Event) {
		event.preventDefault();
		modalStore.trigger(modal);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-invalid-attribute -->
<a
	class="card mt-5 w-full drop-shadow variant-filled-surface flex justify-around card-hover
    hover:bg-primary-200 cursor-pointer"
	on:click={openModal}
	href="#"
>
	<div class="flex align-middle justify-center ml-8">
		<div class="mr-3 mt-3">
			<div class="font-s2emibold h3">{playerWithBoxScore.player?.jerseyNumber}</div>
			<div class="text-gray-500">{playerWithBoxScore.player?.position}</div>
		</div>
		<div>
			<Avatar
				src={playerWithBoxScore.player?.imageUrl}
				width="w-40"
				rounded="rounded-lg"
				background="bg-transparent"
			/>
		</div>
	</div>
	<div class="mt-3 mr-9 flex flex-col justify-evenly">
		<p class="mr-0 h5 font-semibold flex justify-center">
			{playerWithBoxScore.player?.firstName}
			{playerWithBoxScore.player?.lastName}
		</p>
		<div class="w-full flex flex-col items-center">
			<h4 class="text-gray-500 h6">Average Rating</h4>
			<div class="flex w-full justify-end">
				<StarRating config={getReviewStarConfig(averageRating)} />
				<p class="px-3 font-semibold text-gray-500">{averageRating ?? '-'} / 5</p>
			</div>
			<h4 class="text-gray-500 h6">Your rating</h4>
			<div class="flex w-full justify-end">
				<StarRating config={getReviewStarConfig(ownRating)} />
				<p class="px-3 font-semibold text-gray-500">{ownRating ?? '-'} / 5</p>
			</div>
		</div>
		<p class="text-gray-500 text-sm font-semibold flex justify-end py-2">
			Click on the card to rate
			<span><i class="fa-solid fa-arrow-turn-down px-1"></i> </span>
		</p>
	</div>
</a>

<Modal components={modalRegistry} />
