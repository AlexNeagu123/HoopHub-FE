<script lang="ts">
    export let inputClass: string = "mt-10";
</script>
<div class="flex justify-center">
    <div class="card variant-filled-surface m-10 {inputClass} w-5/6 p-3 px-10 shadow flex justify-between flex-wrap">
        <slot/>
    </div>
</div>
