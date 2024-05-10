<script lang="ts">
	import Upvote from '$lib/components/icons/Upvote.svelte';
	import Downvote from '$lib/components/icons/Downvote.svelte';
	import { VoteStatus } from '$lib/models/user_features/threads/VoteStatus';

	export let upvotes: number;
	export let downvotes: number;
	export let threadVoteStatus: VoteStatus;
	// export let id: string;
	export let voteButtonWidth: string = 'w-1/2';

	function modifyVotes(isUpvote: boolean, sign: number) {
		upvotes += isUpvote ? sign : 0;
		downvotes += isUpvote ? 0 : sign;
	}

	async function toggleVote(isUpvote: boolean) {
		if (
			(threadVoteStatus === VoteStatus.UpVoted && isUpvote) ||
			(threadVoteStatus === VoteStatus.DownVoted && !isUpvote)
		) {
			threadVoteStatus = VoteStatus.None;
			modifyVotes(isUpvote, -1);
			// await deleteTeamThreadVote(id);
		} else {
			const oldVoteStatus = threadVoteStatus;
			threadVoteStatus = isUpvote ? VoteStatus.UpVoted : VoteStatus.DownVoted;
			modifyVotes(isUpvote, +1);
			if (oldVoteStatus === VoteStatus.None) {
				// await addTeamThreadVote(id, isUpvote);
			} else {
				oldVoteStatus === VoteStatus.UpVoted ? upvotes-- : downvotes--;
				// await updateTeamThreadVote(id, isUpvote);
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
		<Upvote height={16} width={16} isClicked={threadVoteStatus === VoteStatus.UpVoted} />
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
		<Downvote height={16} width={16} isClicked={threadVoteStatus === VoteStatus.DownVoted} />
		<p class="px-1">
			{downvotes}
		</p>
	</button>
</div>
