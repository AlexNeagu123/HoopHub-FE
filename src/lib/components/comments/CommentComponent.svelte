<script lang="ts">
	import TimeAgo from '../threads/TimeAgo.svelte';
	import ProfileLink from '../threads/ProfileLink.svelte';
	import Reply from '../icons/Reply.svelte';
	import CommentVotingContainer from './CommentVotingContainer.svelte';
	import WriteCommentContainer from './WriteCommentContainer.svelte';
	import ViewReplies from './ViewReplies.svelte';
	import type { Comment } from '$lib/models/user_features/comments/Comment';
	import deleteComment from '$lib/services/user_features/comments/deleteComments';
	import updateComment from '$lib/services/user_features/comments/updateComment';
	import addReplyComment from '$lib/services/user_features/comments/addReplyComments';
	import ReplyCommentsList from './ReplyCommentsList.svelte';
	import getRepliesByComment from '$lib/services/user_features/comments/getRepliesByComment';

	export let comment: Comment;
	export let firstCommentId: string | null = null;

	let replyActive: boolean = false;
	let repliesLoading: boolean = false;
	let arrowType: string = 'down';
	let editMode: boolean = false;
	let repliesFetched: boolean = false;

	let repliesViewed: boolean = false;
	let validationErrors: { [key: string]: string } = {};

	let commentReplies: Comment[] = [];

	async function onSubmitReply(content: string) {
		let response = await addReplyComment(
			content,
			comment.id,
			comment.fan.id,
			comment.teamThread?.id,
			comment.gameThread?.id
		);
		if (response.success === false) {
			validationErrors = response.validationErrors;
		} else {
			commentReplies = [...commentReplies, response.data];
			comment.repliesCount++;
			toggleActiveReply();
		}
	}

	function toggleActiveReply() {
		replyActive = !replyActive;
	}

	async function onDeleteComment() {
		await deleteComment(comment.id);
		window.location.reload();
	}

	function onEditComment() {
		editMode = true;
	}

	async function onCommentEdited(content: string) {
		let response = await updateComment(comment.id, content);
		if (response.success === false) {
			validationErrors = response.validationErrors;
		} else {
			editMode = false;
		}
	}

	async function onViewReplies() {
		repliesViewed = !repliesViewed;
		arrowType = arrowType === 'down' ? 'up' : 'down';
		if (!repliesFetched && repliesViewed) {
			repliesLoading = true;
			commentReplies = await getRepliesByComment(comment.id);
			repliesLoading = false;
			repliesFetched = true;
		}
	}
</script>

{#if !editMode}
	<div
		class="w-full variant-filled-surface p-2 my-1 {replyActive
			? 'drop-shadow rounded-lg'
			: 'rounded-none'}
			{firstCommentId === comment.id ? 'shadow' : ''}"
	>
		<div>
			<header class="flex justify-between px-2 items-center">
				<div class="flex">
					<ProfileLink author={comment.fan} />
					<span class="pr-2">&bull;</span>
					<TimeAgo time={comment.createdDate} />
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
					{comment.content}
				</div>
				<CommentVotingContainer {comment} onDelete={onDeleteComment} onEdit={onEditComment} />
			</main>
		</div>
	</div>

	<WriteCommentContainer bind:active={replyActive} onSubmit={onSubmitReply} bind:validationErrors />
	{#if comment.repliesCount > 0}
		<ViewReplies {arrowType} repliesNo={comment.repliesCount} onClick={onViewReplies} />
	{/if}
	{#if repliesViewed}
		<ReplyCommentsList
			bind:commentReplies
			bind:isLoading={repliesLoading}
			bind:replyCount={comment.repliesCount}
			parentId={comment.id}
			{onViewReplies}
		/>
	{/if}
{:else}
	<WriteCommentContainer
		bind:active={editMode}
		onSubmit={onCommentEdited}
		bind:validationErrors
		bind:textData={comment.content}
	/>
{/if}
