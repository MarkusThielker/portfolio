<script lang="ts">
    import TextAreaEditor from "$lib/components/TextAreaEditor.svelte";

    export let content: string;
    export let isEditable: boolean;
    export let textType: string | undefined = undefined;
</script>

{#if isEditable}
    <TextAreaEditor bind:content {textType} />
{:else}
    <div>
        {@html content}
    </div>
{/if}
