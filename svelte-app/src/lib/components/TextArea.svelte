<script>

    import TextAreaEditor from "$lib/components/TextAreaEditor.svelte"

    export let content
    export let isEditable
    export let type

</script>

{#if isEditable}
    <TextAreaEditor bind:content {type}/>
{:else}
    <div>
        {@html content}
    </div>
{/if}
