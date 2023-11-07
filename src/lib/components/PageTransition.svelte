<script lang="ts">
    import {fade} from "svelte/transition"
</script>

<div
        class="flex flex-col space-y-8"
        in:fade="{{ duration: 70, delay: 90 }}"
        out:fade="{{ duration: 70 }}"
>
    <slot/>
</div>
