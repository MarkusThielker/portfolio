<script lang="ts">

    import PageTransition from "$lib/components/PageTransition.svelte"

    /** @type {import("./$types").PageData} */
    export let data

</script>

<PageTransition>

    <div class="flex flex-col space-y-3">

        <h1>{data.post.title}</h1>

        <div class="flex flex-row space-x-2">

            {#if !data.post.published}<p class="stats-badge bg-yellow-300/20">Draft</p>{/if}
            <p class="stats-badge">{data.post.views} views</p>

        </div>

        <h3>{data.post.teaser}</h3>
        <article class="prose dark:prose-invert">
            {@html data.post.content}
        </article>

    </div>

</PageTransition>
