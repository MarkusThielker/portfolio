<script lang="ts">
    import { enhance } from "$app/forms";
    import PostPreview from "$lib/components/PostPreview.svelte";
    import PageTransition from "$lib/components/PageTransition.svelte";
    import { notifications } from "$lib/notification";
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
</script>


<svelte:head>
    <title>Blog - Markus Thielker</title>
    <meta property="description" content="The online portfolio and blog of Markus Thielker, a young full stack developer from Germany."/>
</svelte:head>


<PageTransition>
    {#if isAuthenticated}
        <div class="fixed bottom-6 right-6 sm:bottom-12 sm:right-12">
            <form method="POST" action="?/create" use:enhance>
                <button type="submit" class="fab-primary">
                    <span class="material-icons-round">add</span>
                </button>
            </form>
        </div>
    {/if}

    <h1>Blog</h1>

    {#if data.posts.length === 0}
        <h3>No posts were published yet</h3>
    {:else}
        {#each data.posts as post (post.slug)}
            <PostPreview {post} session={data.session}/>
        {/each}
    {/if}
</PageTransition>
