<script lang="ts">

    import PostPreview from "$lib/components/PostPreview.svelte"

    /** @type {import("./$types").PageData} */
    export let data

</script>


<p class="text-4xl font-semibold">Blog</p>

{#each data.posts as post}
    <PostPreview {post}/>
{/each}
