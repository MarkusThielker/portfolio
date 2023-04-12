<script lang="ts">

    import PostPreview from "$lib/components/PostPreview.svelte"
    import PageTransition from "$lib/components/PageTransition.svelte"

    /** @type {import("./$types").PageData} */
    export let data

</script>

<PageTransition>

    <p class="text-4xl font-semibold">Blog</p>

    {#if data.posts.length === 0}

        <p class="text-xl">No posts were published yet</p>

    {:else}

        {#each data.posts as post}
            <PostPreview {post}/>
        {/each}

    {/if}

</PageTransition>
