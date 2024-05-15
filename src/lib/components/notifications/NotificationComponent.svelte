<script lang="ts">
	import type NotificationModel from '$lib/models/user_features/notifications/NotificationModel';
	import { Avatar } from '@skeletonlabs/skeleton';
	import TimeAgo from '../threads/TimeAgo.svelte';
	export let notification: NotificationModel;

    
</script>

<div class="p-3 card variant-filled-surface hover:variant-filled-primary cursor-pointer relative">
	<div class="flex items-center">
		<Avatar src={notification.sender?.avatarPhotoUrl} width="w-7" background="bg-transparent" />
		<div class="flex flex-col ml-2">
			<span class="font-semibold w-full">{notification.title}</span>
			<TimeAgo time={notification.createdDate} />
		</div>
	</div>
	<div class="mt-2 flex justify-center">
		<p>{notification.content}</p>
	</div>
	{#if !notification.isRead}
		<div class="absolute top-4 right-4 h-3 w-3 bg-blue-500 rounded-full"></div>
	{/if}
</div>
