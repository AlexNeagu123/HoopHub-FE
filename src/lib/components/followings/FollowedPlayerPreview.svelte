<script lang="ts">
	import { AppRoute } from '$lib/constants';
	import type { Player } from '$lib/models/nba_data/players/Player';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let player: Player;
</script>

<a
	href="{AppRoute.PLAYER}/{player.id}"
	class="card md:mx-3 w-full md:w-3/4 drop-shadow variant-filled-surface flex justify-between card-hover
            hover:bg-primary-200 cursor-pointer"
>
	<div class="flex align-middle justify-center md:ml-8 ml-4">
		<div class="mr-3 mt-3">
			<div class="font-semibold h3">{player.jerseyNumber}</div>
			<div class="text-gray-500">{player.position}</div>
		</div>
		<div class="flex items-center">
			<Avatar
				src={player.imageUrl}
				width="w-20 md:w-40"
				rounded="rounded-lg"
				background="bg-transparent"
			/>
		</div>
	</div>
	<div class="mt-3 md:mr-9 mr-2">
		<p class="mr-0 h5 md:h3 font-semibold">
			{player.firstName}
			{player.lastName}
		</p>
		<dl class="list-dl">
			<div>
				<span class="flex-auto">
					<dt class="text-gray-500 md:text-base text-sm">Draft Year</dt>
					<dd class="md:text-base text-sm">
						{#if player.draftYear !== null}
							{player.draftYear}
						{:else}
							<span class="text-gray-600">Undrafted</span>
						{/if}
					</dd>
				</span>
				<span class="flex-auto">
					<dt class="text-gray-500 md:text-base text-sm">Height</dt>
					<dd class="md:text-base text-sm">{player.height}</dd>
				</span>
				<span class="flex-auto">
					<dt class="text-gray-500 md:text-base text-sm">Weight</dt>
					<dd class="md:text-base text-sm">{player.weight}</dd>
				</span>
			</div>
		</dl>
	</div>
</a>
