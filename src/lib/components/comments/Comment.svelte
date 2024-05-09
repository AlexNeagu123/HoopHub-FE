<script lang="ts">
	import type FanInfo from '$lib/models/user_features/fans/FanInfo';
	import TimeAgo from '../threads/TimeAgo.svelte';
	import ProfileLink from '../threads/ProfileLink.svelte';
	import Reply from '../icons/Reply.svelte';
	import CommentVotingContainer from './CommentVotingContainer.svelte';
	import WriteCommentContainer from './WriteCommentContainer.svelte';
	import { ThreadVoteStatus } from '$lib/models/user_features/threads/ThreadVoteStatus';
	export let commenter: FanInfo;

	let replyActive: boolean = false;
	function onClickReply() {
		replyActive = !replyActive;
	}

	function onSubmitRootComment(comment: string) {}
</script>

<div
	class="w-full variant-filled-surface p-2 rounded-lg m-3 {replyActive
		? 'drop-shadow'
		: ''} hover:drop-shadow"
>
	<div>
		<header class="flex justify-between px-2 items-center">
			<div class="flex">
				<ProfileLink author={commenter} />
				<span class="pr-2">&bull;</span>
				<TimeAgo time={new Date()} />
			</div>
			<button
				class="btn btn-primary hover:variant-filled-primary flex items-center"
				on:click={onClickReply}
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
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet tenetur nihil velit aliquid
				repudiandae cupiditate, voluptate rerum enim voluptatibus. Facere debitis nobis quas minus
				adipisci beatae dolore non nihil praesentium.
			</div>
			<CommentVotingContainer
				upvotes={1}
				downvotes={1}
				threadVoteStatus={ThreadVoteStatus.None}
				voteButtonWidth="w-1/4"
			/>
		</main>
	</div>
</div>

<WriteCommentContainer bind:active={replyActive} />
