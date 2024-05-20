<script lang="ts">
	import type { GameReview } from '$lib/models/user_features/reviews/GameReview';
	export let ownGameReview: GameReview;

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	import StarRating from '@ernane/svelte-star-rating';

	import ScoreContainer from '$lib/components/reviews/ScoreContainer.svelte';
	import { starConfig } from '$lib/constants';

	const readonlyConfig = {
		readOnly: true,
		countStars: 5,
		range: {
			min: 0,
			max: 5,
			step: 0.1
		},
		score: ownGameReview.rating,
		showScore: false,
		starConfig: starConfig
	};
</script>

<div class="flex justify-center">
	<div class="shadow p-5 mt-4 w-2/3">
		<StarRating config={readonlyConfig} />
		<ScoreContainer bind:selectedScore={ownGameReview.rating} maxScore={5} />
		<div class="flex justify-start">
			<div class="flex flex-col w-full mt-2 px-10">
				<p class="text-center text-gray-700 font-semibold">{ownGameReview.content}</p>
			</div>
		</div>
	</div>
</div>
