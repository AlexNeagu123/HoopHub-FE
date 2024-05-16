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

	export let teams: Team[];

	function extractTeam(comment: Comment, isHome: boolean): Team | null {
		if (comment.gameThread === null) return null;

		const searchTeamId = isHome ? comment.gameThread.homeTeamId : comment.gameThread.visitorTeamId;
		return teams.find((team) => team.apiId === searchTeamId) || null;
	}

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
			<FanCommentComponent
				{comment}
				homeTeam={extractTeam(comment, true)}
				visitorTeam={extractTeam(comment, false)}
			/>
		{/each}
	</div>
	<InfiniteLoading on:infinite={infiniteHandler}>
		<div slot="noMore"></div>
		<div slot="noResults"></div>
	</InfiniteLoading>
{/if}
