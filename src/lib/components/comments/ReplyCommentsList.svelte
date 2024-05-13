<script lang="ts">
	import type { Comment } from '$lib/models/user_features/comments/Comment';
	import LoadingIcon from '../shared/LoadingIcon.svelte';
	import ReplyCommentComponent from './ReplyCommentComponent.svelte';
	
	export let commentReplies: Comment[];
	export let isLoading: boolean;
    export let replyCount: number;
</script>

{#if isLoading}
	<LoadingIcon />
{:else}
	<div class="flex flex-col items-end w-full">
		{#each commentReplies as reply}
			<ReplyCommentComponent {reply} bind:commentReplies bind:replyCount />
		{/each}
	</div>
{/if}
