<script lang="ts">
    export let purpose: string;
    export let label: string;
    export let type: string;
</script>
<label class="label mb-3">
    <span class="text-gray-500">{label}</span>
    <input required class="w-full border border-secondary-600 px-3 py-2 rounded-xl shadow-sm
            focus:outline-0 focus:border-secondary-700 focus:ring-1 focus:ring-secondary-700"
           type="{type}" id="{purpose}" name="{purpose}" placeholder="{purpose}.."/>
</label>