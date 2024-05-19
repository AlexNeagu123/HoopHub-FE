<script lang="ts">
	import { AppRoute } from '$lib/constants';
	import type FanInfo from '$lib/models/user_features/fans/FanInfo';
	import { Avatar } from '@skeletonlabs/skeleton';
	export let author: FanInfo | null;
</script>

{#if author === null}
	<div class="flex justify-start">
		<Avatar width="w-5" background="bg-transparent" />
		<h6 class="h6 px-2 font-semibold">Anonymous</h6>
	</div>
{:else}
	<a class="flex justify-start hover:underline" href="{AppRoute.PROFILE}/{author.id}">
		<Avatar src={author.avatarPhotoUrl} width="w-5" background="bg-transparent" />
		<h6 class="h6 px-2 font-semibold">
			@{author.username}
		</h6>
	</a>
{/if}
