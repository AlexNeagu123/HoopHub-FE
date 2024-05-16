<script lang="ts">
	export let textData: string | null;
	export let clearErrors: (e: KeyboardEvent) => void;
</script>

<textarea
	class="overflow-hidden variant-filled-surface w-full border border-primary-400
		px-3 py-2 rounded-xl focus:outline-0 focus:border-primary-700
		focus:ring-1 focus:ring-primary-700 resize-none hover:variant-filled-surface"
	bind:value={textData}
	on:keydown={clearErrors}
	rows="4"
/>
