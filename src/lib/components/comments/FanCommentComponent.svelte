<script lang="ts">
	import type { Comment } from '$lib/models/user_features/comments/Comment';
	import TimeAgo from '../threads/TimeAgo.svelte';
	import ProfileLink from '../threads/ProfileLink.svelte';
	import { AppRoute } from '$lib/constants';
	import type { Team } from '$lib/models/nba_data/teams/Team';
	import VersusLink from './VersusLink.svelte';

	export let comment: Comment;
	export let homeTeamRefferedByComments: { [key: string]: Team } = {};
	export let visitorTeamRefferedByComments: { [key: string]: Team } = {};

	let redirectId = comment.parentId ? comment.parentId : comment.id;
	let link: string =
		comment.teamThread !== null
			? `${AppRoute.TEAM_THREAD}/${comment.teamThread?.id}?firstComment=${redirectId}`
			: '';

	$: {
		if (homeTeamRefferedByComments[comment.id] && visitorTeamRefferedByComments[comment.id]) {
			link =
				comment.teamThread !== null
					? `${AppRoute.TEAM_THREAD}/${comment.teamThread?.id}?firstComment=${redirectId}`
					: `${AppRoute.GAME_THREAD}?homeTeam=${homeTeamRefferedByComments[comment.id].apiId}&visitorTeam=${visitorTeamRefferedByComments[comment.id].apiId}&date=${comment.gameThread?.date}&firstComment=${redirectId}`;
		}
	}
</script>

<a class="w-full variant-filled-surface p-2 my-1 card card-hover cursor-pointer" href={link}>
	<div>
		<header class="flex justify-between px-2 py-2 items-center">
			<div class="flex">
				<ProfileLink author={comment.fan} />
				<span class="pr-2">&bull;</span>

				{#if comment.respondsToFan !== null}
					<p class="font-thin">
						Replies to <a
							class="hover:underline font-semibold text-secondary-800"
							href="{AppRoute.PROFILE}/{comment.respondsToFan.id}"
							>{comment.respondsToFan.username}</a
						>
					</p>
					<span class="px-2">&bull;</span>
				{/if}
				{#if comment.gameThread !== null}
					<VersusLink
						homeTeam={homeTeamRefferedByComments[comment.id]}
						visitorTeam={visitorTeamRefferedByComments[comment.id]}
					/>
					<span class="px-2">&bull;</span>
				{/if}
				<TimeAgo time={comment.createdDate} />
			</div>
		</header>
		<main>
			<div
				class="variant-filled-surface w-full px-2 mb-2 rounded-md
            focus:outline-0 focus:border-primary-700 focus:ring-1 focus:ring-primary-700 resize-none"
			>
				{comment.content}
			</div>
		</main>
	</div>
</a>
