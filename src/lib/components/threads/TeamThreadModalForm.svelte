<script lang="ts">
    import {getModalStore} from '@skeletonlabs/skeleton';
    import ModalInput from "$lib/components/threads/ModalInput.svelte";
    import ModalTextArea from "$lib/components/threads/ModalTextArea.svelte";
    import IComment from "$lib/components/icons/IComment.svelte";

    const modalStore = getModalStore();

    const formData = {
        title: '',
        content: '',
    };

    function onFormSubmit(): void {
        if ($modalStore[0].response) $modalStore[0].response(formData);
        modalStore.close();
    }

    const cBase = 'card p-4 w-modal shadow-xl space-y-4 variant-filled-surface';
    const cHeader = 'text-2xl font-bold';
    const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token variant-filled-surface';

    function onClose() {
        console.log("OnClose");
    }
</script>

{#if $modalStore[0]}
    <div class="modal-example-form {cBase}">
        <div class="flex justify-between">
            <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
            <button class="btn outline-0">
                <i class="fa-solid fa-x"></i>
            </button>
        </div>
        <article>{$modalStore[0].body ?? '(body missing)'}</article>
        <form class="modal-form {cForm}">
            <ModalInput labelTitle="Thread Title" bind:textData={formData.title}/>
            <ModalTextArea labelTitle="Thread Content" bind:textData={formData.content}/>
        </form>
        <footer class="modal-footer3">
            <button class="btn variant-filled-primary" on:click={onClose}>Close</button>
            <button class="btn variant-filled-success" on:click={onFormSubmit}>Submit Form</button>
        </footer>
    </div>
{/if}