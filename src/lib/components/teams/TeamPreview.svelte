<script lang="ts">
	import type { Team } from '$lib/models/nba_data/teams/Team';
	import { AppRoute } from '$lib/constants';

	export let team: Team;
</script>

<div
	class="shrink-0 w-full md:w-1/3 snap-start mx-2 text-center p-1 card-hover variant-filled-surface shadow"
>
	<a href="{AppRoute.TEAM}/{team.id}">
		<header class="card-header sm:text-sm md:text-3xl p-5">{team.fullName}</header>
		<section>
			<div class="flex justify-center items-center">
				<img src={team.imageUrl} class="sm:w-full md:w-2/3 rounded-lg bg-transparent" alt="AB" />
			</div>
		</section>
	</a>
</div>
