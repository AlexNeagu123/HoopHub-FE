<script lang="ts">
	import Upvote from '$lib/components/icons/Upvote.svelte';
	import Downvote from '$lib/components/icons/Downvote.svelte';
	import deleteTeamThreadVote from '$lib/services/user_features/thread-votes/deleteTeamThreadVote';
	import updateTeamThreadVote from '$lib/services/user_features/thread-votes/updateTeamThreadVote';
	import addTeamThreadVote from '$lib/services/user_features/thread-votes/addTeamThreadVote';
	import { ThreadVoteStatus } from '$lib/models/user_features/threads/ThreadVoteStatus';

	export let upvotes: number;
	export let downvotes: number;
	export let threadVoteStatus: ThreadVoteStatus;
	export let id: string;
	export let voteButtonWidth: string = 'w-1/2';

	function modifyVotes(isUpvote: boolean, sign: number) {
		upvotes += isUpvote ? sign : 0;
		downvotes += isUpvote ? 0 : sign;
	}

	async function toggleVote(isUpvote: boolean) {
		if (
			(threadVoteStatus === ThreadVoteStatus.UpVoted && isUpvote) ||
			(threadVoteStatus === ThreadVoteStatus.DownVoted && !isUpvote)
		) {
			threadVoteStatus = ThreadVoteStatus.None;
			modifyVotes(isUpvote, -1);
			await deleteTeamThreadVote(id);
		} else {
			const oldVoteStatus = threadVoteStatus;
			threadVoteStatus = isUpvote ? ThreadVoteStatus.UpVoted : ThreadVoteStatus.DownVoted;
			modifyVotes(isUpvote, +1);
			if (oldVoteStatus === ThreadVoteStatus.None) {
				await addTeamThreadVote(id, isUpvote);
			} else {
				oldVoteStatus === ThreadVoteStatus.UpVoted ? upvotes-- : downvotes--;
				await updateTeamThreadVote(id, isUpvote);
			}
		}
	}
</script>

<div class="flex w-1/5 justify-start">
	<button
		on:click={(event) => {
			event.preventDefault();
			toggleVote(true);
		}}
		class="flex hover:variant-filled-primary items-center rounded-full {voteButtonWidth} justify-center"
	>
		<Upvote height={16} width={16} isClicked={threadVoteStatus === ThreadVoteStatus.UpVoted} />
		<p class="px-1">
			{upvotes}
		</p>
	</button>
	<button
		on:click={(event) => {
			event.preventDefault();
			toggleVote(false);
		}}
		class="flex hover:variant-filled-primary items-center rounded-full {voteButtonWidth} justify-center"
	>
		<Downvote height={16} width={16} isClicked={threadVoteStatus === ThreadVoteStatus.DownVoted} />
		<p class="px-1">
			{downvotes}
		</p>
	</button>
</div>
