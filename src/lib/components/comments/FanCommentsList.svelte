<script lang="ts">
	import InfiniteLoading from 'svelte-infinite-loading';
	import LoadingIcon from '../shared/LoadingIcon.svelte';
	import type { Comment } from '$lib/models/user_features/comments/Comment';
	import FanCommentComponent from './FanCommentComponent.svelte';
	import type { Team } from '$lib/models/nba_data/teams/Team';

	export let comments: Comment[];
	export let isLoading: boolean;
	export let fetchComments = async () => {};
	export let commentsBatch: Comment[];
	
	export let homeTeamRefferedByComments: { [key: string]: Team } = {};
	export let visitorTeamRefferedByComments: { [key: string]: Team } = {};
	
	function infiniteHandler({
		detail: { loaded, complete }
	}: {
		detail: { loaded: () => void; complete: () => void };
	}) {
		fetchComments().then(() => {
			if (commentsBatch.length > 0) {
				loaded();
			} else {
				complete();
			}
		});
	}
</script>

{#if isLoading}
	<LoadingIcon />
{:else}
	<div class="flex flex-col items-end w-full">
		{#each comments as comment}
			<FanCommentComponent {homeTeamRefferedByComments} {visitorTeamRefferedByComments} {comment} />
		{/each}
	</div>
	<InfiniteLoading on:infinite={infiniteHandler}>
		<div slot="noMore"></div>
		<div slot="noResults"></div>
	</InfiniteLoading>
{/if}
