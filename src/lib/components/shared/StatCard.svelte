<script lang="ts">
    import { popup } from '@skeletonlabs/skeleton';
    import InformativePopUps from "$lib/components/shared/InformativePopUps.svelte";
    import {getInformativePopUpSettings} from "$lib/utils/pop-ups";
    export let title: string;
    export let content: number | string;
    export let border: boolean;
</script>

<span class:border-r-2={border} class:border-primary-600={border} class="p-3 md:p-5">
    <dt class="text-gray-500 [&>*]:pointer-events-none cursor-default" use:popup={getInformativePopUpSettings(title)}>{title}</dt>
    <dd class="font-semibold cursor-default">{content}</dd>
</span>

<InformativePopUps />
