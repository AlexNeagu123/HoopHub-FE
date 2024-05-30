<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { statusToET } from '$lib/utils/date-parser';
	import type { LocalStoredGame } from '$lib/models/nba_data/games/LocalStoredGame';

	export let game: LocalStoredGame;
</script>

<div class="w-full flex justify-center items-center">
	<div class="w-full flex flex-col items-center">
		<div class="flex justify-center">
			<Avatar
				src={game.visitorTeam.imageUrl}
				width="w-24"
				rounded="rounded-lg"
				background="bg-transparent"
			/>
		</div>
		<p class="lg:font-semibold lg:ext-lg text-gray-800">
			{game.visitorTeam.fullName.split(' ').pop()}
		</p>
	</div>
	<div class="w-full flex justify-around items-center">
		<div class="w-1/3">
			<p class="lg:font-semibold lg:text-lg">
				{game.visitorTeamScore}
			</p>
		</div>
		<h6 class="h6 font-semibold text-gray-400">
			{statusToET(game.status)}
		</h6>
		<div class="text-end w-1/3">
			<p class="lg:font-semibold lg:text-lg">
				{game.homeTeamScore}
			</p>
		</div>
	</div>
	<div class="w-full flex flex-col items-center">
		<div class="flex justify-center">
			<Avatar
				src={game.homeTeam.imageUrl}
				width="w-24"
				rounded="rounded-lg"
				background="bg-transparent"
			/>
		</div>
		<p class="lg:font-semibold lg:text-lg text-gray-800">
			{game.homeTeam.fullName.split(' ').pop()}
		</p>
	</div>
</div>
