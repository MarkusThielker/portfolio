<script lang="ts">

    export let content = ""
    export let textType = "p"

</script>

<input 
    bind:value={content} 
    class="unstyled-input {textType}"
    type="text"/>
