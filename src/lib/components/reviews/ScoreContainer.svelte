<script lang="ts">
	export let selectedScore: number | null;
	export let maxScore: number;
</script>

<div class="flex w-full my-3 justify-center">
	<h3 class="h3 font-semibold">
		{selectedScore ?? 0} / {maxScore}
    </h3>
</div>
