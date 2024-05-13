<script lang="ts">
	export let repliesNo: number;
	export let arrowType: string = 'down';
	export let onClick: () => void;
</script>

<div class="w-full flex">
	<button type="button" class="btn variant-filled-surface" on:click={onClick}>
		<i class="fa-solid fa-chevron-{arrowType}"></i>
		<span class="font-semibold">{repliesNo} replies</span>
	</button>
</div>
