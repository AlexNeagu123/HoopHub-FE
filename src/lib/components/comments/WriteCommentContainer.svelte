<script lang="ts">
	let textData = '';
	export let active: boolean;
	export let currentWidth = 100;
	// export let onSubmitComment: (content: string) => void;
	function onDiscard() {
		active = !active;
	}
</script>

{#if active}
	<div class="flex flex-col w-[{currentWidth}%] mt-2">
		<textarea
			class="overflow-hidden variant-filled-surface w-full border border-primary-400
    px-3 py-2 rounded-xl focus:outline-0 focus:border-primary-700
    focus:ring-1 focus:ring-primary-700 resize-none hover:variant-filled-surface"
			bind:value={textData}
			rows="4"
		/>
		<div class="flex">
			<button
				class="btn mt-1 w-[10%] variant-filled-surface hover:variant-filled-secondary rounded-xl"
				>Comment</button
			>
			<button
				class="btn mt-1 w-[10%] variant-filled-surface hover:variant-filled-primary rounded-xl"
				on:click={onDiscard}>Discard</button
			>
		</div>
	</div>
{/if}
