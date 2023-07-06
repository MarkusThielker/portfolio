<script>

    export let content = ""
    export let textType

</script>

<input bind:value={content} class="w-full p-0 bg-transparent ring-0 focus:ring-0 border-0 placeholder:text-gray-400 {textType}"
       type="text"/>