<script lang="ts">
	import TimeAgo from '../threads/TimeAgo.svelte';
	import ProfileLink from '../threads/ProfileLink.svelte';
	import Reply from '../icons/Reply.svelte';
	import type { Comment } from '$lib/models/user_features/comments/Comment';
	import deleteComment from '$lib/services/user_features/comments/deleteComments';
	import updateComment from '$lib/services/user_features/comments/updateComment';
	import CommentVotingContainer from './CommentVotingContainer.svelte';
	import WriteCommentContainer from './WriteCommentContainer.svelte';
	import addReplyComment from '$lib/services/user_features/comments/addReplyComments';
	import { AppRoute } from '$lib/constants';

	export let reply: Comment;
	export let commentReplies: Comment[];
	export let replyCount: number;
	export let parentId: string;
	export let onViewReplies: () => void;

	let isReplyActive: boolean = false;
	let isReplyEdit: boolean = false;
	let validationErrors: { [key: string]: string } = {};

	function toggleActiveReply() {
		isReplyActive = !isReplyActive;
	}

	async function onSubmitReply(content: string) {
		let response = await addReplyComment(
			content,
			parentId,
			reply.fan.id,
			reply.teamThread?.id,
			reply.gameThread?.id
		);
		if (response.success === false) {
			validationErrors = response.validationErrors;
		} else {
			commentReplies = [...commentReplies, response.data];
			replyCount++;
			toggleActiveReply();
		}
	}

	async function onDeleteReply() {
		await deleteComment(reply.id);
		commentReplies = commentReplies.filter((c) => c.id !== reply.id);
		replyCount--;
		onViewReplies();
	}

	function onEditReply() {
		isReplyEdit = true;
	}

	async function onReplyEdited(content: string) {
		let response = await updateComment(reply.id, content);
		if (response.success === false) {
			validationErrors = response.validationErrors;
		} else {
			isReplyEdit = false;
		}
	}
</script>

{#if !isReplyEdit}
	<div
		class="w-[95%] variant-filled-surface p-2 my-1 {isReplyActive
			? 'drop-shadow rounded-lg'
			: 'rounded-none'}"
	>
		<div>
			<header class="flex justify-between px-2 items-center">
				<div class="flex">
					<ProfileLink author={reply.fan} />
					<span class="pr-2">&bull;</span>
					<p class="font-thin">
						Replies to <a
							class="hover:underline font-semibold text-secondary-800"
							href="{AppRoute.PROFILE}/{reply.respondsToFan.id}">{reply.respondsToFan.username}</a
						>
					</p>
					<span class="px-2">&bull;</span>
					<TimeAgo time={reply.createdDate} />
				</div>
				<button
					class="btn btn-primary hover:variant-filled-primary flex items-center"
					on:click={toggleActiveReply}
				>
					<Reply />
					<p class="px-2">Reply</p>
				</button>
			</header>
			<main>
				<div
					class="variant-filled-surface w-full px-2 mb-2 rounded-md
            focus:outline-0 focus:border-primary-700 focus:ring-1 focus:ring-primary-700 resize-none"
				>
					{reply.content}
				</div>
				<CommentVotingContainer comment={reply} onDelete={onDeleteReply} onEdit={onEditReply} />
			</main>
		</div>
	</div>
	<WriteCommentContainer
		isReply={true}
		bind:active={isReplyActive}
		onSubmit={onSubmitReply}
		bind:validationErrors
	/>
{:else}
	<WriteCommentContainer
		isReply={true}
		bind:active={isReplyEdit}
		onSubmit={onReplyEdited}
		bind:validationErrors
		bind:textData={reply.content}
	/>
{/if}
