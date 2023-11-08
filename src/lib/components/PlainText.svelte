<script lang="ts">
    import PlainTextEditor from "$lib/components/PlainTextEditor.svelte";

    export let content: string;
    export let isEditable: boolean;
    export let textType: string | undefined = undefined;
</script>

{#if isEditable}
    <PlainTextEditor bind:content {textType} />
{:else}
    <div>
        {@html content}
    </div>
{/if}
