<script lang="ts">
	import { AppRoute } from '$lib/constants';
	import logout from '$lib/services/user_access/logout';
	import { goto } from '$app/navigation';

	export let link: string;
	export let linkText: string;
	export let isUserOpen: boolean;

	function logoutHandler() {
		logout();
		goto(AppRoute.HOME);
	}

	function navigateTo(url: string) {
		isUserOpen = false;
		goto(url);
	}
</script>

{#if link === AppRoute.LOGOUT}
	<button
		on:click={logoutHandler}
		class="flex justify-around p-6 rounded-md hover:variant-filled-primary mb-2 cursor-pointer"
	>
		<div class="w-5">
			<slot />
		</div>
		<p class="mx-4">
			{linkText}
		</p>
	</button>
{:else}
	<button
		on:click={() => navigateTo(link)}
		class="flex justify-around p-6 hover:variant-filled-primary w-full rounded-md mb-2 cursor-pointer"
	>
		<div class="w-5">
			<slot />
		</div>
		<p class="mx-4">
			{linkText}
		</p>
	</button>
{/if}
