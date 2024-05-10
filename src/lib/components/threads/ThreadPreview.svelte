<script lang="ts">
	import IComment from '$lib/components/icons/IComment.svelte';
	import ThreadVotingContainer from '$lib/components/threads/ThreadVotingContainer.svelte';
	import type FanInfo from '$lib/models/user_features/fans/FanInfo';
	import { truncateString } from '$lib/utils/string-utils';
	import {
		AppRoute,
		ThreadWidthTypes,
		ThreadWidthTypesConverter,
		TruncateLengths
	} from '$lib/constants';
	import { VoteStatus } from '$lib/models/user_features/threads/VoteStatus';
	import ProfileLink from './ProfileLink.svelte';
	import TimeAgo from './TimeAgo.svelte';

	export let title: string;
	export let author: FanInfo;
	export let time: Date;
	export let content: string;
	export let upvotes: number;
	export let downvotes: number;
	export let comments: number = 0;
	export let id: string;

	export let threadVoteStatus: VoteStatus;
	export let threadWidthType: string = ThreadWidthTypes.HALF;
</script>

<a
	href="{AppRoute.TEAM_THREAD}/{id}"
	class="{ThreadWidthTypesConverter[
		threadWidthType
	]} card card-hover variant-filled-surface shadow px-5 py-3 my-2 cursor-pointer"
>
	<div class="flex flex-col">
		<div class="flex flex-start justify-between py-3">
			<ProfileLink {author} />
			<TimeAgo {time} />
		</div>
		<h3 class="h3">
			{title}
		</h3>
		<div class="container py-3 px-1">
			<p>
				{truncateString(content, TruncateLengths.ThreadContent)}
			</p>
		</div>
		<div class="flex justify-between">
			<ThreadVotingContainer {upvotes} {downvotes} {id} {threadVoteStatus} />
			<div
				class="flex variant-filled-surface hover:variant-filled-primary
                        items-center rounded-full w-1/6 justify-center m-1"
			>
				<IComment height={14} width={14} />
				<p class="px-1">
					{comments}
				</p>
			</div>
		</div>
	</div>
</a>
