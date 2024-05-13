<script lang="ts">
	import ThreadVotingContainer from './ThreadVotingContainer.svelte';
	import ProfileLink from './ProfileLink.svelte';
	import TimeAgo from './TimeAgo.svelte';
	import TeamThreadHeader from './TeamThreadHeader.svelte';
	import type { Team } from '$lib/models/nba_data/teams/Team';
	import TeamLink from './TeamLink.svelte';
	import type { TeamThread } from '$lib/models/user_features/threads/TeamThread';

	export let teamThread: TeamThread;
	export let team: Team;
</script>

<div class="card variant-filled-surface px-5 py-3 my-2 shadow w-full">
	<div class="flex flex-col">
		<div class="flex flex-start justify-between py-3">
			<TeamThreadHeader>
				<ProfileLink author={teamThread.fan} />
				<span class="font-bold">&bull;</span>
				<TeamLink {team} />
			</TeamThreadHeader>
			<TimeAgo time={teamThread.createdDate} />
		</div>
		<h2 class="h2">
			{teamThread.title}
		</h2>
		<div class="container py-3 px-1">
			<p>
				{teamThread.content}
			</p>
		</div>
		<div class="flex justify-between">
			<ThreadVotingContainer
				voteButtonWidth="w-1/4"
				upvotes={teamThread.upVotes}
				downvotes={teamThread.downVotes}
				id={teamThread.id}
				threadVoteStatus={teamThread.voteStatus}
			/>
		</div>
	</div>
</div>
