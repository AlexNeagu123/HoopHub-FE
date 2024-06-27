<script lang="ts">
	import NotificationModel from '$lib/models/user_features/notifications/NotificationModel';
	import Inbox from '../icons/Inbox.svelte';

	export let unreadNotificationsCount: number = 0;
	export let unreadNotifications: NotificationModel[] = [];
	export let allNotifications: NotificationModel[];

	import { RadioGroup, RadioItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import NotificationComponent from '../notifications/NotificationComponent.svelte';
	import { DynamicPaginationThresholds, NotificationComponentTypes } from '$lib/constants';
	import InfiniteLoading from 'svelte-infinite-loading';
	import getNotifications from '$lib/services/user_features/notifications/getNotifications';

	let notificationType: NotificationComponentTypes = NotificationComponentTypes.ALL;
	let unreadNotificationsBatch: NotificationModel[] = [];

	let allNotificationsBatch: NotificationModel[] = [];
	let currentUnreadPage: number = 2;
	let unreadPageSize: number = DynamicPaginationThresholds.NotificationsThreshold;

	let currentAllPage: number = 2;
	let allPageSize: number = DynamicPaginationThresholds.NotificationsThreshold;

	$: unreadNotifications = [...unreadNotifications, ...unreadNotificationsBatch];
	$: allNotifications = [...allNotifications, ...allNotificationsBatch];

	async function fetchNotifications() {
		if (notificationType === NotificationComponentTypes.UNREAD) {
			const notificationsResponse = await getNotifications(currentUnreadPage, unreadPageSize, true);
			unreadNotificationsBatch = notificationsResponse.data;
			currentUnreadPage++;
		} else {
			const notificationsResponse = await getNotifications(currentAllPage, allPageSize, false);
			allNotificationsBatch = notificationsResponse.data;
			currentAllPage++;
		}
	}

	function infiniteHandler({
		detail: { loaded, complete }
	}: {
		detail: { loaded: () => void; complete: () => void };
	}) {
		if (notificationType === NotificationComponentTypes.UNREAD) {
			fetchNotifications().then(() => {
				if (unreadNotificationsBatch.length > 0) {
					loaded();
				} else {
					complete();
				}
			});
		} else {
			fetchNotifications().then(() => {
				if (allNotificationsBatch.length > 0) {
					loaded();
				} else {
					complete();
				}
			});
		}
	}

	export let isNotificationOpen = false;
	export let isUserOpen = false;
</script>

<button
	class="w-14 h-14 rounded-full bg-surface-400 flex items-center justify-center cursor-pointer avatar relative"
	on:click={() => {
		isNotificationOpen = !isNotificationOpen;
		if (isNotificationOpen) isUserOpen = false;
	}}
>
	<div class="w-1/2">
		<Inbox />
	</div>
	{#if unreadNotificationsCount > 0}
		<div
			class="absolute bottom-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
		>
			{unreadNotificationsCount}
		</div>
	{/if}
</button>

{#if isNotificationOpen}
	<div
		class="fixed
		w-full
		top-20
		md:top-24
		right-0
		card
		variant-filled-surface
		px-2
		pt-4
		xl:w-1/5
		lg:w-1/4
		md:w-1/3
		max-h-full
		overflow-y-auto
		border-l-primary-300
		border-l-8
		shadow"
	>
		<div class="flex items-center justify-center py-2">
			<h3 class="h3 font-bold">Notifications</h3>
		</div>
		<div class="flex w-full justify-center py-3">
			<RadioGroup
				background="variant-filled-surface"
				active="variant-filled-primary"
				hover="hover:variant-filled-surface"
			>
				<RadioItem
					bind:group={notificationType}
					name="justify"
					value={NotificationComponentTypes.ALL}
				>
					All
				</RadioItem>
				<RadioItem
					bind:group={notificationType}
					name="justify"
					value={NotificationComponentTypes.UNREAD}
				>
					Unread
				</RadioItem>
			</RadioGroup>
		</div>
		<div class="flex flex-col w-full variant-filled-surface">
			{#if notificationType === NotificationComponentTypes.UNREAD}
				{#each unreadNotifications as notification}
					<NotificationComponent {notification} />
				{/each}
				<InfiniteLoading on:infinite={infiniteHandler}>
					<div slot="noMore"></div>
					<div slot="noResults"></div>
				</InfiniteLoading>
			{:else}
				{#each allNotifications as notification}
					<NotificationComponent {notification} />
				{/each}
				<InfiniteLoading on:infinite={infiniteHandler}>
					<div slot="noMore"></div>
					<div slot="noResults"></div>
				</InfiniteLoading>
			{/if}
		</div>
	</div>
{/if}
