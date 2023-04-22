<script lang="ts">

    import {enhance} from "$app/forms"
    import PageTransition from "$lib/components/PageTransition.svelte"
    import {notifications} from "$lib/notification"

    /** @type {import("./$types").PageData} */
    export let data

    $: isAuthenticated = data.session

    /** @type {import("./$types").FormData} */
    export let form
    $: {
        if (form) notifications.show(form.notification.type, form.notification.message)
    }

</script>

<PageTransition>

    <div class="flex flex-col space-y-3">

        <nav class="flex px-4 py-2.5 rounded-2xl bg-stone-700/70 backdrop-blur">

            <form action="{data.post.published ? '?/unpublish' : '?/publish'}" method="POST" use:enhance>
                <button class="btn btn-primary" type="submit">
                    {data.post.published ? 'Unpublish' : 'Publish'}
                </button>
            </form>

        </nav>

    </div>

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
