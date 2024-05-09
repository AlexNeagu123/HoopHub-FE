<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import TeamThreadFullView from '$lib/components/threads/TeamThreadFullView.svelte';
	import TeamThreadExpanded from '$lib/components/threads/TeamThreadExpanded.svelte';

	export let data: PageData;
	const teamThread = data.teamThread;
	const team = data.team;
	let isLoading = false;

	onMount(async () => {
		isLoading = true;

		isLoading = false;
	});
</script>

<TeamThreadExpanded {teamThread} {team} />
