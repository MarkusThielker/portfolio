<script lang="ts">

    import {Post} from "@prisma/client"
    import {STATS_BADGE} from "$lib/constants"

    export let post: Post

</script>

<a class="rounded-2xl p-6 bg-stone-700/70 hover:bg-stone-700 duration-200" href="/blog/{post.slug}">

    <div class="flex flex-col space-y-4">

        <div>
            <h1 class="text-xl font-semibold">{post.title}</h1>
            <p style="max-lines: 3">{post.teaser}</p>
        </div>

        <div class="flex flex-row space-x-2">

            {#if !post.published}<p class="{STATS_BADGE} bg-yellow-300/20">Draft</p>{/if}
            <p class={STATS_BADGE}>{post.views} views</p>

        </div>

    </div>

</a>
