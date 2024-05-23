<script lang="ts">
	import type NotificationModel from '$lib/models/user_features/notifications/NotificationModel';
	import { Avatar } from '@skeletonlabs/skeleton';
	import TimeAgo from '../threads/TimeAgo.svelte';
	import markNotificationAsRead from '$lib/services/user_features/notifications/markNotificationAsRead';

	export let notification: NotificationModel;

	let attachedPhoto: string | null = notification.sender
		? notification.sender.avatarPhotoUrl
		: notification.attachedImageUrl;
	if (attachedPhoto === null) {
		attachedPhoto = '';
	}

	async function markAsRead() {
		await markNotificationAsRead(notification.id);
		if (notification.attachedNavigationData)
			window.location.href = notification.attachedNavigationData;
	}
</script>

<a
	class="p-3 card variant-filled-surface hover:variant-filled-primary cursor-pointer relative"
	href={notification.attachedNavigationData}
	on:click={markAsRead}
>
	<div class="flex items-center">
		<div class="w-1/5">
			<Avatar src={attachedPhoto} width="w-full" background="bg-transparent" />
		</div>
		<div class="flex flex-col ml-2">
			<span class="font-semibold w-full">{notification.title}</span>
			<TimeAgo time={notification.createdDate} />
		</div>
	</div>
	<div class="m-2 flex justify-center {!notification.isRead ? 'font-semibold' : 'text-gray-700'}">
		<p class="whitespace-normal">{notification.content}</p>
	</div>
	{#if !notification.isRead}
		<div class="absolute top-4 right-4 h-3 w-3 bg-blue-500 rounded-full"></div>
	{/if}
</a>
