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

	const notificationsPopUp: PopupSettings = {
		event: 'click',
		target: 'notificationsPopUp',
		placement: 'bottom'
	};

	let notificationType: NotificationComponentTypes = NotificationComponentTypes.UNREAD;
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
			const notificationsResponse = await getNotifications(currentUnreadPage, allPageSize, false);
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
</script>

<div
	class="w-14 h-14 rounded-full bg-primary-200 flex items-center justify-center cursor-pointer avatar relative"
	use:popup={notificationsPopUp}
>
	<div class="w-1/2">
		<Inbox />
	</div>
	<div
		class="absolute bottom-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
	>
		{unreadNotificationsCount}
	</div>
</div>

<div
	class="card variant-filled-surface px-2 pt-4 pb-28 w-1/6 max-h-full overflow-y-auto flex-grow"
	data-popup="notificationsPopUp"
>
	<div class="flex items-center py-2">
		<h3 class="h3 font-bold">Notifications</h3>
	</div>
	<div class="flex w-3/4 justify-between py-3">
		<RadioGroup>
			<RadioItem
				bind:group={notificationType}
				name="justify"
				value={NotificationComponentTypes.UNREAD}
			>
				Unread
			</RadioItem>
			<RadioItem
				bind:group={notificationType}
				name="justify"
				value={NotificationComponentTypes.ALL}
			>
				All
			</RadioItem>
		</RadioGroup>
	</div>
	<div class="flex flex-col w-full">
		{#if notificationType === NotificationComponentTypes.UNREAD}
			{#each unreadNotifications as notification}
				<NotificationComponent {notification} />
			{/each}
		{:else}
			{#each allNotifications as notification}
				<NotificationComponent {notification} />
			{/each}
		{/if}
		<InfiniteLoading on:infinite={infiniteHandler}>
			<div slot="noMore"></div>
			<div slot="noResults"></div>
		</InfiniteLoading>
	</div>
</div>
