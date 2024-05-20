<script lang="ts">
	import { GameStarRatingConfig, starConfig, starRange } from '$lib/constants';
	import { getModalStore } from '@skeletonlabs/skeleton';

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	import StarRating from '@ernane/svelte-star-rating';
	import ScoreContainer from '../reviews/ScoreContainer.svelte';

	const modalStore = getModalStore();

	let ownRating: number | null = $modalStore[0].meta.ownRating;
	const playerName = $modalStore[0].meta.playerName;

	let labelTitle: string =
		ownRating === null
			? `Rate the performance of ${playerName}`
			: `Update your rating for ${playerName} performance`;

	const buttonText: string = ownRating === null ? 'Add Review' : 'Update Review';

	const config = {
		readOnly: false,
		countStars: 5,
		range: {
			min: 0,
			max: 5,
			step: 0.1
		},
		score: 0,
		showScore: false,
		starConfig: {
			size: 40,
			fillColor: '#F9ED4F',
			strokeColor: '#BB8511',
			unfilledColor: '#FFF',
			strokeUnfilledColor: '#000'
		}
	};

	function changeTriggered(e: { target: { valueAsNumber: any } }) {
		ownRating = e.target.valueAsNumber;
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4 variant-filled-surface';
	const cHeader = 'h4 font-semibold';

	function onClose() {
		modalStore.close();
	}

	async function onFormSubmit(e: Event) {
		e.preventDefault();
		await $modalStore[0].meta.submitFormHandler(ownRating);
		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<div class="flex justify-between">
			<header class={cHeader}>{labelTitle ?? '(title missing)'}</header>
			<button class="btn variant-filled-surface focus:border-none !outline-none" on:click={onClose}>
				<i class="fa-solid fa-x"></i>
			</button>
		</div>
		<StarRating {config} on:change={changeTriggered} />
		<ScoreContainer selectedScore={ownRating} maxScore={5} />
		<footer class="modal-footer flex justify-center">
			<button
				class="btn variant-filled-surface drop-shadow hover:variant-filled-success"
				on:click={onFormSubmit}
				disabled={ownRating == $modalStore[0].meta.ownRating}>{buttonText}</button
			>
		</footer>
	</div>
{/if}
