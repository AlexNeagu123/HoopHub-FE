<script lang="ts">
    export let labelTitle: string;
    export let textData: string;
</script>

<label class="label">
    <span>{labelTitle}</span>
    <input class="input variant-filled-surface w-full border border-primary-600 px-3 py-2 rounded-full shadow
    focus:outline-0 focus:border-primary-700 focus:ring-1 focus:ring-primary-700" type="text"
           bind:value={textData}/>
</label>