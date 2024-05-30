<script lang="ts">
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	import Carousel from 'svelte-carousel';
	const autoplayDuration = 3000;
	export let title: string;
</script>

<div class="flex flex-col items-center m-7 w-full">
	<h3 class="h3 font-semibold text-gray-600 p-3">{title}</h3>
	<div class="flex justify-center w-2/3">
		<Carousel autoplay {autoplayDuration} arrows={false}>
			<slot />
		</Carousel>
	</div>
</div>
