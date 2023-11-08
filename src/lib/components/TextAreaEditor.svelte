<script lang="ts">
    import { onMount } from "svelte";

    export let content = "";
    export let textType = "p";

    let textarea: HTMLTextAreaElement;

    function resizeInput(element: EventTarget | null) {

        let elm = element as HTMLTextAreaElement;

        elm.style.height = "5px";
        elm.style.height = (elm.scrollHeight) + "px";
    }

    onMount(() => {
        resizeInput(textarea);
    });
</script>

<textarea
    bind:this={textarea}
    bind:value={content}
    on:input={(e) => resizeInput(e.target)}
    class="resize-none overflow-hidden unstyled-input {textType}"
/>
