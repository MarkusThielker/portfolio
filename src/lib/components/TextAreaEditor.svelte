<script lang="ts">

    import {onMount} from "svelte";

    export let content = ""
    export let textType = "p"

    let textarea

    function getScrollHeight(elm) {
        const savedValue = elm.value
        elm.value = ""
        elm._baseScrollHeight = elm.scrollHeight + 100
        elm.value = savedValue
    }

    function onExpandableTextareaInput({target: elm}) {

        if (!elm.classList.contains("autoExpand") || !elm.nodeName == "TEXTAREA") return

        let minRows = elm.getAttribute("data-min-rows") | 0, rows
        !elm._baseScrollHeight && getScrollHeight(elm)

        elm.rows = minRows
        rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 24) + 5
        elm.rows = minRows + rows
    }

    onMount(() => {
        onExpandableTextareaInput({target: textarea})
    })

</script>

<textarea
        bind:this={textarea} bind:value={content} class="autoExpand resize-none w-full p-0 bg-transparent ring-0 focus:ring-0 border-0 placeholder:text-gray-400 {textType}" data-min-rows="3" on:input={onExpandableTextareaInput}
        rows="3"></textarea>