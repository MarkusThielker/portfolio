<script lang="ts">

    import TextAreaEditor from "$lib/components/TextAreaEditor.svelte"

    export let content
    export let isEditable
    export let textType

</script>

{#if isEditable}
    <TextAreaEditor bind:content {textType}/>
{:else}
    <div>
        {@html content}
    </div>
{/if}
