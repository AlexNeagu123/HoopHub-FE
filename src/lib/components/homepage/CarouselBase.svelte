<script lang="ts">
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	import Carousel from 'svelte-carousel';
	
	const autoplayDuration = 7000;
	export let title: string;
</script>

<div class="flex flex-col items-center my-7 md:my-0 md:m-10 w-full">
	<h3 class="md:h3 h1 font-semibold text-gray-600 p-3">{title}</h3>
	<div class="flex justify-center w-full md:w-2/3">
		<Carousel autoplay {autoplayDuration} arrows={false}>
			<slot />
		</Carousel>
	</div>
</div>
