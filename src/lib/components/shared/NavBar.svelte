<script lang="ts">
	import { AppBar, Avatar } from '@skeletonlabs/skeleton';
	import { AppRoute, SeasonConstants } from '$lib/constants';
	import { seasonFromIntToStr } from '$lib/utils/standings-utils';

	import type FanInfo from '$lib/models/user_features/fans/FanInfo';
	import NotificationModel from '$lib/models/user_features/notifications/NotificationModel';
	import { Hamburger } from 'svelte-hamburgers';
	import NavbarTrail from './NavbarTrail.svelte';

	export let fanInfo: FanInfo;
	export let unreadNotificationsCount: number;
	export let unreadNotifications: NotificationModel[];
	export let allNotifications: NotificationModel[];

	export let hamburgerOpen: boolean = false;
</script>

<div class="hidden md:block">
	<AppBar background="bg-surface-400" border="border border-solid bg-surface-400 border-t-0">
		<svelte:fragment slot="lead">
			<a type="button" href={AppRoute.HOME} class="btn bg-surface-400">
				<span
					><Avatar
						src="/images/logo/HoopHub.png"
						width="w-12"
						rounded="rounded-full"
						background="bg-transparent"
					/></span
				>
				<span class="text-xl"> Home </span>
			</a>
		</svelte:fragment>
		<svelte:fragment>
			<div class="flex justify-evenly">
				<a type="button" class="btn bg-surface-400 text-xl" href={AppRoute.TEAMS}>Teams</a>
				<a type="button" class="btn bg-surface-400 text-xl" href={AppRoute.GAMES}>Games</a>
				<a
					type="button"
					class="btn bg-surface-400 text-xl"
					href="{AppRoute.STANDINGS}?season={seasonFromIntToStr(SeasonConstants.currentSeason)}"
				>
					Standings
				</a>
				<a
					type="button"
					class="btn bg-surface-400 text-xl"
					href="{AppRoute.PLAYOFFS}?season={seasonFromIntToStr(SeasonConstants.currentSeason)}"
				>
					Playoffs
				</a>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<NavbarTrail {allNotifications} {unreadNotifications} {fanInfo} {unreadNotificationsCount} />
		</svelte:fragment>
	</AppBar>
</div>

<div class="block md:hidden">
	<AppBar background="bg-surface-400" border="border border-solid bg-surface-400 border-t-0">
		<svelte:fragment slot="lead">
			<Hamburger bind:open={hamburgerOpen} />
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<NavbarTrail {allNotifications} {unreadNotifications} {fanInfo} {unreadNotificationsCount} />
		</svelte:fragment>
	</AppBar>
</div>

<style>
	.avatar:hover {
		filter: brightness(105%);
		transition: filter 0.3s ease;
	}
</style>
