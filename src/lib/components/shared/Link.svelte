<script lang="ts">
    export let href: string = "";
    export let styles: string = "";
</script>

<a class="bg-surface-500 text-secondary-700 {styles} hover:text-blue-600 font-bold"
   href="{href}">
    <slot/>
</a>