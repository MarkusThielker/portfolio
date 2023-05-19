<script lang="ts">

    import {enhance} from "$app/forms"
    import {fade} from "svelte/transition"
    import PageTransition from "$lib/components/PageTransition.svelte"
    import {notifications, NotificationType} from "$lib/notification"
    import PlainText from "$lib/components/PlainText.svelte"
    import PlainTextArea from "$lib/components/TextArea.svelte"

    /** @type {import("./$types").PageData} */
    export let data

    $: isAuthenticated = data.session

    /** @type {import("./$types").FormData} */
    export let form
    $: {
        if (form) notifications.show(form.notification.type, form.notification.message)
    }

    $: {
        data = data
        initOrReset()
    }

    let slug, title, teaser, content, mdContent: string

    function initOrReset() {
        slug = data.post.slug
        title = data.post.title
        teaser = data.post.teaser
        content = data.post.content
        mdContent = data.mdContent
        isEditable = false
    }

    let deleteConfirmationVisible = false

    let isEditable = false

</script>

<PageTransition>

    {#if isAuthenticated}
        <div class="flex flex-col space-y-3">

            <nav class="flex px-4 py-2.5 rounded-2xl bg-stone-700/70 backdrop-blur space-x-2">

                <form action="{data.post.published ? '?/unpublish' : '?/publish'}" method="POST" use:enhance>
                    <button class="flex space-x-1 btn-primary h-8 items-center justify-center" type="submit">
                        {#if data.post.published}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                            </svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                        {/if}
                        <span>{data.post.published ? 'Unpublish' : 'Publish'}</span>
                    </button>
                </form>

                {#if isEditable}
                    <button class="flex btn-primary space-x-1 h-8 items-center justify-center" type="button"
                            on:click={() => {
                        isEditable = false
                        notifications.show(NotificationType.SUCCESS, "Changes discarded")
                        initOrReset()
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                        <span>Cancel</span>
                    </button>
                    <form method="POST" action="?/save" use:enhance>
                        <input id="slug" name="slug" class="hidden" bind:value={slug}>
                        <input id="title" name="title" class="hidden" style="white-space: pre-wrap" bind:value={title}>
                        <input id="teaser" name="teaser" class="hidden" style="white-space: pre-wrap"
                               bind:value={teaser}>
                        <textarea id="content" name="content" class="hidden" bind:value={content}></textarea>
                        <button class="flex btn-primary space-x-1 h-8 items-center justify-center" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                            </svg>
                            <span>Save</span>
                        </button>
                    </form>
                {:else}
                    <button class="flex btn-primary space-x-1 h-8 items-center justify-center" type="button"
                            on:click={() => isEditable = true}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                        </svg>
                        <span>Edit</span>
                    </button>
                {/if}

                <button class="flex btn-primary space-x-1 h-8 items-center justify-center" type="button"
                        on:click={() => deleteConfirmationVisible = true}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                    </svg>
                    <span>Delete</span>
                </button>

            </nav>

        </div>
    {/if}

    <div class="flex flex-col space-y-3">


        <h1>
            <PlainText bind:content={title} {isEditable} textType="h1"/>
        </h1>

        <div class="flex flex-row space-x-2">

            {#if !data.post.published}<p class="stats-badge bg-yellow-300/20">Draft</p>{/if}
            <p class="stats-badge">{data.post.views} views</p>

        </div>

        <h3>
            <PlainText bind:content={teaser} {isEditable} textType="h3"/>
        </h3>

        {#if isEditable}
            <PlainTextArea {isEditable} bind:content={content}/>
        {:else}
            {@html mdContent}
        {/if}

    </div>

    {#if deleteConfirmationVisible}

        <form action="?/delete" method="POST" use:enhance>

            <div class="relative z-30" transition:fade={{duration: 70}}>
                <div class="fixed inset-0 bg-black bg-opacity-60 transition-opacity"></div>
                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div class="relative overflow-hidden card">
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
                            <div class="mt-6 grid grid-cols-2 gap-3">
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
