<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import TeamThreadExpanded from '$lib/components/threads/TeamThreadExpanded.svelte';

	export let data: PageData;
	const teamThread = data.teamThread;
	const team = data.team;

	onMount(async () => {
	});
</script>

<TeamThreadExpanded {teamThread} {team} />
