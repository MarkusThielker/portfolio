<script lang="ts">
    import { enhance } from "$app/forms";
    import { fade } from "svelte/transition";
    import PageTransition from "$lib/components/PageTransition.svelte";
    import { notifications, NotificationType } from "$lib/notification";
    import PlainTextArea from "$lib/components/TextArea.svelte";
    import type { PageData } from "./$types";

    /** @type {import("./$types").PageData} */
    export let data: PageData;

    $: isAuthenticated = data.session;

    /** @type {import("./$types").FormData} */
    export let form: HTMLFormElement;
    $: {
        if (form)
            notifications.show(
                form.notification.type,
                form.notification.message
            );
    }

    $: {
        data = data;
        initOrReset();
    }

    let slug: string;
    let title: string;
    let teaser: string;
    let content: string;
    let mdContent: string;

    function initOrReset() {
        slug = data.post.slug;
        title = data.post.title;
        teaser = data.post.teaser;
        content = data.post.content;
        mdContent = data.mdContent;
        isEditable = false;
    }

    let deleteConfirmationVisible = false;

    let isEditable = false;
</script>

<svelte:head>
    <title>{data.post.title} - Markus Thielker</title>
    <meta property="description" content={data.post.teaser} />
</svelte:head>

<PageTransition>
    {#if isAuthenticated}
        <div class="flex flex-col space-y-3">
            <nav
                class="flex px-4 py-2.5 rounded-2xl bg-stone-700/70 backdrop-blur space-x-2"
            >
                <form
                    action={data.post.published ? "?/unpublish" : "?/publish"}
                    method="POST"
                    use:enhance
                >
                    <input type="hidden" name="slug" value={data.post.slug} />
                    <button
                        class="flex space-x-1 btn-primary h-8 items-center justify-center"
                        type="submit"
                    >
                        {#if data.post.published}
                            <span class="material-icons-round">visibility</span>
                        {:else}
                            <span class="material-icons-round">visibility_off</span>
                        {/if}
                        <span
                            >{data.post.published
                                ? "Unpublish"
                                : "Publish"}</span
                        >
                    </button>
                </form>

                {#if isEditable}
                    <button
                        class="flex btn-primary space-x-1 h-8 items-center justify-center"
                        type="button"
                        on:click={() => {
                            isEditable = false;
                            notifications.show(
                                NotificationType.SUCCESS,
                                "Changes discarded"
                            );
                            initOrReset();
                        }}
                    >
                        <span class="material-icons-round">close</span>
                        <span>Cancel</span>
                    </button>
                    <form method="POST" action="?/save" use:enhance>
                        <input
                            id="slug"
                            name="slug"
                            class="hidden"
                            bind:value={slug}
                        />
                        <input
                            id="title"
                            name="title"
                            class="hidden"
                            style="white-space: pre-wrap"
                            bind:value={title}
                        />
                        <input
                            id="teaser"
                            name="teaser"
                            class="hidden"
                            style="white-space: pre-wrap"
                            bind:value={teaser}
                        />
                        <textarea
                            id="content"
                            name="content"
                            class="hidden"
                            bind:value={content}
                        />
                        <button
                            class="flex btn-primary space-x-1 h-8 items-center justify-center"
                            type="submit"
                        >
                            <span class="material-icons-round">check</span>
                            <span>Save</span>
                        </button>
                    </form>
                {:else}
                    <button
                        class="flex btn-primary space-x-1 h-8 items-center justify-center"
                        type="button"
                        on:click={() => (isEditable = true)}
                    >
                        <span class="material-icons-round">edit</span>
                        <span>Edit</span>
                    </button>
                {/if}

                <form
                    action={data.post.isPinned ? "?/unpin" : "?/pin"}
                    method="POST"
                    use:enhance
                >
                    <input type="hidden" name="slug" value={data.post.slug} />
                    <button
                        class="flex space-x-1 btn-primary h-8 items-center justify-center"
                        type="submit"
                    >
                        {#if data.post.isPinned}
                            <span class="material-icons-round">push_pin</span>
                        {:else}
                            <span class="material-icons-outlined">push_pin</span
                            >
                        {/if}
                        <span>{data.post.isPinned ? "Unpin" : "Pin"}</span>
                    </button>
                </form>

                <button
                    class="flex btn-primary space-x-1 h-8 items-center justify-center"
                    type="button"
                    on:click={() => (deleteConfirmationVisible = true)}
                >
                    <span class="material-icons-round">delete</span>
                    <span>Delete</span>
                </button>
            </nav>
        </div>
    {/if}

    <div class="flex flex-col space-y-3">
        <h1>
            <PlainTextArea bind:content={title} {isEditable} textType="h1" />
        </h1>

        <div class="flex flex-row space-x-2">
            {#if !data.post.published}<p class="stats-badge bg-yellow-300/20">
                    Draft
                </p>{/if}
            <p class="stats-badge">{data.post.views} views</p>
        </div>

        <h3>
            <PlainTextArea bind:content={teaser} {isEditable} textType="h3" />
        </h3>

        {#if isEditable}
            <PlainTextArea {isEditable} bind:content />
        {:else}
            <div class="mdContent space-y-4">
                {@html mdContent}
            </div>
        {/if}
    </div>

    {#if deleteConfirmationVisible}
        <form action="?/delete" method="POST" use:enhance>
            <div class="relative z-30" transition:fade={{ duration: 70 }}>
                <div
                    class="fixed inset-0 bg-black bg-opacity-60 transition-opacity"
                />
                <div class="fixed inset-0 overflow-y-auto">
                    <div
                        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                    >
                        <div class="relative overflow-hidden card">
                            <div>
                                <div
                                    class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100"
                                >
                                    <svg
                                        class="h-6 w-6 text-red-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                        />
                                    </svg>
                                </div>
                                <div class="mt-3 text-center">
                                    <h3
                                        class="text-base font-semibold leading-6"
                                        id="modal-title"
                                    >
                                        Delete Post
                                    </h3>
                                    <div class="mt-2">
                                        <p
                                            class="text-sm text-gray-500 dark:text-gray-200"
                                        >
                                            Are you sure that you want to delete
                                            this post? This action is
                                            irreversible!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-6 grid grid-cols-2 gap-3">
                                <button type="submit" class="btn-text-primary"
                                    >Delete Post</button
                                >
                                <button
                                    type="button"
                                    class="btn-primary"
                                    on:click={() =>
                                        (deleteConfirmationVisible = false)}
                                    >Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    {/if}
</PageTransition>
