<script lang="ts">

    import {Post} from "@prisma/client"

    export let post: Post

</script>

<a class="rounded-2xl p-6 bg-stone-300/70 dark:bg-stone-700/70 hover:bg-stone-300 hover:dark:bg-stone-700 duration-200"
   href="/blog/{post.slug}">

    <div class="flex flex-col space-y-4">

        <div>
            <div class="inline-flex items-center space-x-2">
                {#if post.isPinned}
                    <span class="material-icons-round">push_pin</span>
                {/if}
                <h3>{post.title}</h3>
            </div>
            <p style="max-lines: 3">{post.teaser}</p>
        </div>

        <div class="flex flex-row space-x-2">

            {#if !post.published}<p class="stats-badge bg-yellow-300/20">Draft</p>{/if}
            <p class="stats-badge">{post.views} views</p>

        </div>

    </div>

</a>
