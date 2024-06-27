<script lang="ts">
	import type { PageData } from './$types';
	import TeamThreadExpanded from '$lib/components/threads/TeamThreadExpanded.svelte';

	export let data: PageData;
	const teamThread = data.teamThread;
	const team = data.team;
</script>

<TeamThreadExpanded {teamThread} {team} />



