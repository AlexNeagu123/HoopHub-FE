<script lang="ts">
	import { Avatar, RadioGroup } from '@skeletonlabs/skeleton';
	import IComment from '$lib/components/icons/IComment.svelte';
	import VotingContainer from '$lib/components/threads/VotingContainer.svelte';
	import type FanInfo from '$lib/models/user_features/fans/FanInfo';
	import Time from 'svelte-time/Time.svelte';
	import { truncateString } from '$lib/utils/string-utils';
	import { AppRoute, TruncateLengths } from '$lib/constants';

	export let title: string;
	export let author: FanInfo;
	export let time: Date;
	export let content: string;
	export let upvotes: number = 120;
	export let downvotes: number = 120;
	export let comments: number = 120;
</script>

<div class="w-[48%] card card-hover variant-filled-surface shadow p-5 my-2 cursor-pointer">
	<div class="flex flex-col">
		<div class="flex flex-start justify-between py-3">
			<a class="flex flex-start hover:underline" href="{AppRoute.PROFILE}/{author.id}">
				<Avatar src={author.avatarPhotoUrl} width="w-5" background="bg-transparent" />
				<h6 class="h6 px-2 font-semibold">
					@{author.username}
				</h6>
			</a>
			<div>
				<p class="text-gray-600 font-light">
					<Time relative timestamp={time} />
				</p>
			</div>
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
			<RadioGroup background="bg-surface" active="variant-filled-primary">
				<div class="flex">
					<VotingContainer {upvotes} {downvotes} />
				</div>
			</RadioGroup>
			<div
				class="flex variant-filled-secondary hover:variant-filled-tertiary
                        items-center rounded-full w-1/4 justify-center m-1"
			>
				<IComment height={14} width={14} />
				<p class="px-1">
					{comments}
				</p>
			</div>
		</div>
	</div>
</div>
