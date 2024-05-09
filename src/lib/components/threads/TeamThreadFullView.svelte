<script lang="ts">
	import type FanInfo from '$lib/models/user_features/fans/FanInfo';
	import type { ThreadVoteStatus } from '$lib/models/user_features/threads/ThreadVoteStatus';
	import ThreadVotingContainer from './ThreadVotingContainer.svelte';
	import IComment from '$lib/components/icons/IComment.svelte';
	import ProfileLink from './ProfileLink.svelte';
	import TimeAgo from './TimeAgo.svelte';
	import TeamThreadHeader from './TeamThreadHeader.svelte';
	import type { Team } from '$lib/models/nba_data/teams/Team';
	import TeamLink from './TeamLink.svelte';
	
	export let title: string;
	export let author: FanInfo;
	export let time: Date;
	export let content: string;
	export let upvotes: number;
	export let downvotes: number;
	export let comments: number = 120;
	export let id: string;
    export let team: Team;
	export let threadVoteStatus: ThreadVoteStatus;
</script>

<div class="card variant-filled-surface p-5 my-2 shadow w-full">
	<div class="flex flex-col">
		<div class="flex flex-start justify-between py-3">
			<TeamThreadHeader>
				<ProfileLink {author} />
				<span class="font-bold">&bull;</span>
                <TeamLink {team}/>
			</TeamThreadHeader>
			<TimeAgo {time} />
		</div>
		<h2 class="h2">
			{title}
		</h2>
		<div class="container py-3 px-1">
			<p>
				{content}
			</p>
		</div>
		<div class="flex justify-between">
			<ThreadVotingContainer
				voteButtonWidth="w-1/4"
				{upvotes}
				{downvotes}
				{id}
				{threadVoteStatus}
			/>
			<div
				class="flex variant-filled-surface
                        items-center rounded-full justify-center m-1 cursor-default"
			>
				<IComment height={16} width={16} />
				<p class="px-1">
					{comments}
				</p>
			</div>
		</div>
	</div>
</div>
