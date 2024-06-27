<!-- SCRIPT -->
<script lang="ts">
	import type { Comment } from '$lib/models/user_features/comments/Comment';
	import LoadingIcon from '../shared/LoadingIcon.svelte';
	import ReplyCommentComponent from './ReplyCommentComponent.svelte';

	export let commentReplies: Comment[];
	export let isLoading: boolean;
	export let replyCount: number;
	export let parentId: string;
	export let onViewReplies: () => void;
</script>

<!-- MARKUP -->
{#if isLoading}
	<LoadingIcon />
{:else}
	<div class="flex flex-col items-end w-full">
		{#each commentReplies as reply}
			<ReplyCommentComponent
				{onViewReplies}
				{reply}
				{parentId}
				bind:commentReplies
				bind:replyCount
			/>
		{/each}
	</div>
{/if}



