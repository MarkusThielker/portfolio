<script>

    import PlainTextEditor from "$lib/components/PlainTextEditor.svelte"

    export let content
    export let isEditable
    export let textType

</script>

{#if isEditable}
    <PlainTextEditor bind:content {textType}/>
{:else}
    <div>
        {@html content}
    </div>
{/if}
