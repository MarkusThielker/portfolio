<script lang="ts">

    import PostPreview from "$lib/components/PostPreview.svelte"
    import PageTransition from "$lib/components/PageTransition.svelte"

    /** @type {import("./$types").PageData} */
    export let data

</script>

<PageTransition>

    <p class="text-4xl font-semibold">Blog</p>

    {#each data.posts as post}
        <PostPreview {post}/>
    {/each}

</PageTransition>
