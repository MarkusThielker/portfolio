<script lang="ts">

    import {STATS_BADGE} from "$lib/constants"
    import PageTransition from "$lib/components/PageTransition.svelte"

    /** @type {import("./$types").PageData} */
    export let data

</script>

<PageTransition>

    <div class="flex flex-col space-y-3">

        <p class="text-4xl font-semibold">{data.post.title}</p>

        <div class="flex flex-row space-x-2">

            {#if !data.post.published}<p class="{STATS_BADGE} bg-yellow-300/20">Draft</p>{/if}
            <p class={STATS_BADGE}>{data.post.views} views</p>

        </div>

        <p class="text-lg">{data.post.teaser}</p>
        <article class="prose dark:prose-invert">
            {@html data.post.content}
        </article>

    </div>

</PageTransition>
