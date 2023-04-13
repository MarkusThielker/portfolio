<script lang="ts">

    import PostPreview from "$lib/components/PostPreview.svelte"
    import PageTransition from "$lib/components/PageTransition.svelte"

    /** @type {import("./$types").PageData} */
    export let data

</script>

<PageTransition>

    <h1>Blog</h1>

    {#if data.posts.length === 0}

        <h3>No posts were published yet</h3>

    {:else}

        {#each data.posts as post}
            <PostPreview {post}/>
        {/each}

    {/if}

</PageTransition>
