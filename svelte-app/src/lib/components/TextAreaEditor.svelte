<script>

    export let content = ""
    export let type = "p"

</script>

<textarea bind:value={content}
          class="w-full p-0 bg-transparent ring-0 focus:ring-0 border-0 placeholder:text-gray-400 {type}"></textarea>