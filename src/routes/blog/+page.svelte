<script lang="ts">

    import {enhance} from "$app/forms"
    import PostPreview from "$lib/components/PostPreview.svelte"
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

    {#if isAuthenticated}

        <div class="fixed bottom-6 right-6 sm:bottom-12 sm:right-12">

            <form method="POST" action="?/create" use:enhance>
                <button type="submit" class="fab-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                </button>
            </form>

        </div>

    {/if}

    <h1>Blog</h1>

    {#if data.posts.length === 0}

        <h3>No posts were published yet</h3>

    {:else}

        {#each data.posts as post}
            <PostPreview {post}/>
        {/each}

    {/if}

</PageTransition>
