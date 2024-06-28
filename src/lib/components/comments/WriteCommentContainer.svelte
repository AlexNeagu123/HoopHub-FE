<script lang="ts">
	import Validation from '../auth/Validation.svelte';
	import CustomTextArea from '../shared/CustomTextArea.svelte';

	export let textData = '';
	export let active: boolean;
	export let onSubmit: (content: string) => void;

	function onDiscard() {
		active = !active;
	}

	function clearErrors() {
		validationErrors = {};
	}

	export let isReply: boolean = false;
	export let validationErrors: { [key: string]: string } = {};
</script>

{#if active}
	<div class="flex md:justify-start justify-center w-full">
		<div class="flex flex-col {!isReply ? 'w-[95%] md:w-full' : 'w-[90%] ml-12 md:w-[95%]'} mt-2">
			<div class="flex justify-start py-2">
				<Validation {validationErrors} errorKey="Content" />
			</div>
			<CustomTextArea bind:textData {clearErrors} />
			<div class="flex">
				<button
					on:click={async () => {
						onSubmit(textData);
					}}
					class="btn mt-1 md:w-[10%] variant-filled-surface hover:variant-filled-secondary rounded-xl"
				>
					Comment
				</button>
				<button
					class="btn mt-1 md:w-[10%] variant-filled-surface hover:variant-filled-primary rounded-xl"
					on:click={onDiscard}
				>
					Discard
				</button>
			</div>
		</div>
	</div>
{/if}
