<script lang="ts">
	import Validation from '../auth/Validation.svelte';
	import CustomTextArea from '../shared/CustomTextArea.svelte';

	export let textData: string | null = '';
	export let active: boolean;
	export let onSubmit: (content: string) => void;

	function onDiscard() {
		active = !active;
	}

	function clearErrors() {
		validationErrors = {};
	}

	export let validationErrors: { [key: string]: string } = {};
</script>

{#if active}
	<div class="flex justify-center">
		<div class="flex flex-col md:w-1/2 mt-2 items-center">
			<div class="flex py-2">
				<Validation {validationErrors} errorKey="Content" />
				<Validation {validationErrors} errorKey="Rating" />
			</div>
			<CustomTextArea bind:textData {clearErrors} />
			<div class="flex">
				<button
					on:click={async () => {
						if (textData) onSubmit(textData);
					}}
					class="btn mt-1 variant-filled-surface hover:variant-filled-secondary rounded-xl"
				>
					Submit
				</button>
				<button
					class="btn mt-1 variant-filled-surface hover:variant-filled-primary rounded-xl"
					on:click={onDiscard}
				>
					Discard
				</button>
			</div>
		</div>
	</div>
{/if}
