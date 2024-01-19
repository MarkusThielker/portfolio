<script lang="ts">
    import { enhance } from "$app/forms";
    import type { Post } from "@prisma/client";

    export let post: Post;
    export let session: any;

    let deleteMode = false;
</script>

<div class="relative flex flex-col">
    {#if deleteMode}
        <form
            action="?/delete"
            method="POST"
            use:enhance
            class="            
            rounded-2xl
            absolute
            flex
            w-full h-full
            bg-red-900/50
            items-center
            justify-center
            space-x-8"
        >

            <input type="hidden" name="slug" value={post.slug} />

            <button
                class="flex space-x-1 btn-primary h-8 items-center justify-center"
                on:click={() => (deleteMode = false)}
                type="button"
            >
                <span class="material-icons-round">cancel</span>
                <span>Cancel</span>
            </button>

            <button
                class="flex space-x-1 btn-primary h-8 items-center justify-center"
                type="submit"
            >
                <span class="material-icons-round">delete</span>
                <span>Confirm Deletion</span>
            </button>
        </form>
    {/if}
    <a
        class="
            {session ? 'rounded-t-2xl' : 'rounded-2xl'}
            p-6
            bg-stone-300/70
            dark:bg-stone-700/70
            hover:bg-stone-300
            hover:dark:bg-stone-700
            duration-200"
        href="/blog/{post.slug}"
    >
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
                {#if !post.published}<p class="stats-badge bg-yellow-300/20">
                        Draft
                    </p>{/if}
                <p class="stats-badge">{post.views} views</p>
            </div>
        </div>
    </a>
    {#if session}
        <div
            class="flex flex-row space-x-4 rounded-b-2xl px-6 py-2 bg-stone-400/70 dark:bg-stone-800/70 duration-200"
        >
            <form
                action={post.isPinned ? "?/unpin" : "?/pin"}
                method="POST"
                use:enhance
            >
                <input type="hidden" name="slug" value={post.slug} />
                <button
                    class="flex space-x-1 btn-primary h-8 items-center justify-center"
                    type="submit"
                >
                    {#if post.isPinned}
                        <span class="material-icons-round">push_pin</span>
                    {:else}
                        <span class="material-icons-outlined">push_pin</span>
                    {/if}
                </button>
            </form>

            <form
                action={post.published ? "?/unpublish" : "?/publish"}
                method="POST"
                use:enhance
            >
                <input type="hidden" name="slug" value={post.slug} />
                <button
                    class="flex space-x-1 btn-primary h-8 items-center justify-center"
                    type="submit"
                >
                    {#if post.published}
                        <span class="material-icons-round">visibility</span>
                    {:else}
                        <span class="material-icons-round">visibility_off</span>
                    {/if}
                </button>
            </form>

            <button
                class="flex space-x-1 btn-primary h-8 items-center justify-center"
                on:click={() => (deleteMode = true)}
                type="submit"
            >
                <span class="material-icons-round">delete</span>
            </button>
        </div>
    {/if}
</div>
