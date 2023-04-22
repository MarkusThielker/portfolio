<script lang="ts">

    import {enhance} from "$app/forms"
    import {fade} from "svelte/transition"
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

    let deleteConfirmationVisible = true

</script>

<PageTransition>

    {#if isAuthenticated}
        <div class="flex flex-col space-y-3">

            <nav class="flex px-4 py-2.5 rounded-2xl bg-stone-700/70 backdrop-blur space-x-4">

                <form action="{data.post.published ? '?/unpublish' : '?/publish'}" method="POST" use:enhance>
                    <button class="btn btn-primary" type="submit">
                        {data.post.published ? 'Unpublish' : 'Publish'}
                    </button>
                </form>

                <button class="btn btn-primary" type="button" on:click={() => deleteConfirmationVisible = true}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                    </svg>
                </button>

            </nav>

        </div>
    {/if}

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

    {#if deleteConfirmationVisible}

        <form action="?/delete" method="POST" use:enhance>

            <div class="relative z-30" transition:fade={{duration: 70}}>
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div class="relative overflow-hidden card bg-white dark:bg-black/20">
                            <div>
                                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                    <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                         stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                                    </svg>
                                </div>
                                <div class="mt-3 text-center">
                                    <h3 class="text-base font-semibold leading-6" id="modal-title">Delete
                                        Post</h3>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500 dark:text-gray-200">Are you sure that you want
                                            to delete this post?
                                            This action is irreversible!</p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 mt-6 grid grid-cols-2 gap-3">
                                <button type="submit" class="btn-text-primary">Delete Post</button>
                                <button type="button" class="btn-primary"
                                        on:click={() => deleteConfirmationVisible = false}>Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </form>

    {/if}

</PageTransition>
