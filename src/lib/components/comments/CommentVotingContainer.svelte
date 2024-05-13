<script lang="ts">
	import Upvote from '$lib/components/icons/Upvote.svelte';
	import Downvote from '$lib/components/icons/Downvote.svelte';
	import { VoteStatus } from '$lib/models/user_features/threads/VoteStatus';
	import deleteComment from '$lib/services/user_features/comments/deleteComments';
	import addCommentVote from '$lib/services/user_features/comments/votes/addCommentVote';
	import updateCommentVote from '$lib/services/user_features/comments/votes/updateCommentVote';
	import { currentUser } from '$lib/stores/auth.store';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { ListBox, popup } from '@skeletonlabs/skeleton';
	import type { Comment } from '$lib/models/user_features/comments/Comment';

	export let comment: Comment;
	export let onDelete: () => void;
	export let onEdit: () => void;

	const voteButtonWidth: string = 'w-1/2';

	function modifyVotes(isUpvote: boolean, sign: number) {
		comment.upVotes += isUpvote ? sign : 0;
		comment.downVotes += isUpvote ? 0 : sign;
	}

	async function toggleVote(isUpvote: boolean) {
		if (
			(comment.voteStatus === VoteStatus.UpVoted && isUpvote) ||
			(comment.voteStatus === VoteStatus.DownVoted && !isUpvote)
		) {
			comment.voteStatus = VoteStatus.None;
			modifyVotes(isUpvote, -1);
			await deleteComment(comment.id);
		} else {
			const oldVoteStatus = comment.voteStatus;
			comment.voteStatus = isUpvote ? VoteStatus.UpVoted : VoteStatus.DownVoted;
			modifyVotes(isUpvote, +1);
			if (oldVoteStatus === VoteStatus.None) {
				await addCommentVote(comment.id, isUpvote);
			} else {
				oldVoteStatus === VoteStatus.UpVoted ? comment.upVotes-- : comment.downVotes--;
				await updateCommentVote(comment.id, isUpvote);
			}
		}
	}

	let ownCommentOptionsCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox' + comment.id,
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<div class="flex {$currentUser.userId === comment.fan.id ? 'w-[13%]' : 'w-[10%]'} justify-start">
	<button
		on:click={(event) => {
			event.preventDefault();
			toggleVote(true);
		}}
		class="flex hover:variant-filled-primary items-center rounded-full {voteButtonWidth} justify-center"
	>
		<Upvote height={16} width={16} isClicked={comment.voteStatus === VoteStatus.UpVoted} />
		<p class="px-1">
			{comment.upVotes}
		</p>
	</button>
	<button
		on:click={(event) => {
			event.preventDefault();
			toggleVote(false);
		}}
		class="flex hover:variant-filled-primary items-center rounded-full {voteButtonWidth} justify-center"
	>
		<Downvote height={16} width={16} isClicked={comment.voteStatus === VoteStatus.DownVoted} />
		<p class="px-1">
			{comment.downVotes}
		</p>
	</button>

	{#if $currentUser.userId === comment.fan.id}
		<button
			type="button"
			class="btn-icon variant-filled-surface hover:variant-filled-primary"
			use:popup={ownCommentOptionsCombobox}
		>
			<i class="fa-solid fa-ellipsis-vertical"></i>
		</button>
		<div class="z-50 variant-filled-primary card w-20 shadow-xl py-2" data-popup={'popupCombobox' + comment.id}>
			<ListBox rounded="rounded-none">
				<button
					class="btn rounded-none w-full hover:variant-filled-surface"
					on:click={onEdit}>Edit</button
				>
				<button
					class="btn rounded-none w-full hover:variant-filled-surface"
					on:click={onDelete}>Delete</button
				>
			</ListBox>
		</div>
	{/if}
</div>
