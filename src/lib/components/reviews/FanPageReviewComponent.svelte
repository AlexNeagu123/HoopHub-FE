<script lang="ts">
	import { AppRoute, getDynamicStarConfig } from '$lib/constants';
	import type { Team } from '$lib/models/nba_data/teams/Team';
	import type { GameReview } from '$lib/models/user_features/reviews/GameReview';
	import VersusLink from '../comments/VersusLink.svelte';
	import ProfileLink from '../threads/ProfileLink.svelte';
	import TimeAgo from '../threads/TimeAgo.svelte';

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	import StarRating from '@ernane/svelte-star-rating';

	export let review: GameReview;
	export let homeTeam: Team | null;
	export let visitorTeam: Team | null;

	const reviewStarConfig = {
		readOnly: true,
		countStars: 5,
		range: {
			min: 0,
			max: 5,
			step: 0.1
		},
		score: review.rating,
		showScore: false,
		name: '',
		starConfig: getDynamicStarConfig(review.rating)
	};
</script>

<a
	class="w-full variant-filled-surface py-5 card card-hover"
	href="{AppRoute.GAME_REVIEWS}?homeTeam={review.homeTeamId}&visitorTeam={review.visitorTeamId}&date={review.date}"
>
	<div class="p-2">
		<div>
			<header class="flex justify-between px-2 items-center">
				<div class="flex">
					<ProfileLink author={review.fan} />
					<span class="pr-2">&bull;</span>
					<span class="flex items-center">
						<StarRating config={reviewStarConfig} />
						<p class="text-sm font-semibold pl-2">{review.rating} / 5</p>
					</span>
					<span class="px-2">&bull;</span>
                    <VersusLink
						{homeTeam}
						{visitorTeam}
					/>
					<span class="px-2">&bull;</span>
					<TimeAgo time={review.createdDate} />
				</div>
			</header>
			<main>
				<div
					class="variant-filled-surface w-full px-2 my-1 rounded-md
        focus:outline-0 focus:border-primary-700 focus:ring-1 focus:ring-primary-700 resize-none"
				>
					{review.content}
				</div>
			</main>
		</div>
	</div>
</a>
