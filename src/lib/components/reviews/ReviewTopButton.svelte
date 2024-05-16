<script lang="ts">
	export let onClick: () => void;
	export let text: string;
</script>

<div class="flex justify-center">
	<div
		class="card flex flex-col variant-filled-surface border-b-2 border-primary-400 w-1/2 items-center"
	>
		<button
			class="btn btn-primary hover:variant-filled-warning items-center w-full rounded-md"
			on:click={onClick}
		>
			{text}
		</button>
	</div>
</div>
