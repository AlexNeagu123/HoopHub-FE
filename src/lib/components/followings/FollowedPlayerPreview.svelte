<script lang="ts">
	import { AppRoute } from '$lib/constants';
	import type { Player } from '$lib/models/nba_data/players/Player';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let player: Player;
</script>

<a
	href="{AppRoute.PLAYER}/{player.id}"
	class="card mx-3 w-3/4 drop-shadow variant-filled-surface flex justify-between card-hover
            hover:bg-primary-200 cursor-pointer"
>
	<div class="flex align-middle justify-center ml-8">
		<div class="mr-3 mt-3">
			<div class="font-semibold h3">{player.jerseyNumber}</div>
			<div class="text-gray-500">{player.position}</div>
		</div>
		<div>
			<Avatar src={player.imageUrl} width="w-40" rounded="rounded-lg" background="bg-transparent" />
		</div>
	</div>
	<div class="mt-3 mr-9">
		<p class="mr-0 h3 font-semibold">
			{player.firstName}
			{player.lastName}
		</p>
		<dl class="list-dl">
			<div>
				<span class="flex-auto">
					<dt class="text-gray-500">Draft Year</dt>
					<dd>
						{#if player.draftYear !== null}
							{player.draftYear}
						{:else}
							<span class="text-gray-600">Undrafted</span>
						{/if}
					</dd>
				</span>
				<span class="flex-auto">
					<dt class="text-gray-500">Height</dt>
					<dd>{player.height}</dd>
				</span>
				<span class="flex-auto">
					<dt class="text-gray-500">Weight</dt>
					<dd>{player.weight}</dd>
				</span>
			</div>
		</dl>
	</div>
</a>
