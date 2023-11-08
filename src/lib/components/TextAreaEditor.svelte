<script lang="ts">
    import { onMount } from "svelte";

    export let content = "";
    export let textType = "p";

    let textarea: HTMLTextAreaElement;
    let baseScrollHeight: number;

    function getScrollHeight(elm: HTMLTextAreaElement) {
        const savedValue = elm.value;
        elm.value = "";
        baseScrollHeight = elm.scrollHeight + 100;
        elm.value = savedValue;
    }

    function onExpandableTextareaInput(elm: HTMLTextAreaElement) {
        if (
            !elm.classList.contains("autoExpand") ||
            !(elm.nodeName == "TEXTAREA")
        )
            return;

        let minRows =
                parseInt(elm.getAttribute("data-min-rows") || "0", 10) | 0,
            rows;
        !baseScrollHeight && getScrollHeight(elm);

        elm.rows = minRows;
        rows = Math.ceil((elm.scrollHeight - baseScrollHeight) / 24) + 5;
        elm.rows = minRows + rows;
    }

    onMount(() => {
        onExpandableTextareaInput(textarea);
    });
</script>

<textarea
    bind:this={textarea}
    bind:value={content}
    class="autoExpand resize-none unstyled-input {textType}"
    data-min-rows="3"
    on:input={onExpandableTextareaInput}
    rows="3"
/>
