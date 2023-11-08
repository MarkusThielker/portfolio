<script lang="ts">
    import { enhance } from "$app/forms";
    import Introduction from "$lib/components/Introduction.svelte";
    import Navigation from "$lib/components/Navigation.svelte";
    import PostPreview from "$lib/components/PostPreview.svelte";
    import PageTransition from "$lib/components/PageTransition.svelte";
    import { notifications } from "$lib/notification";
    import type { PageData } from "./$types";

    /** @type {import("./$types").PageData} */
    export let data: PageData;

    /** @type {import("./$types").ActionData} */
    export let form: HTMLFormElement;
    $: {
        if (form)
            notifications.show(
                form.notification.type,
                form.notification.message
            );
    }

    $: isAuthenticated = data.session;
</script>

<PageTransition>
    {#if isAuthenticated}
        <form
            method="POST"
            action="?/logout"
            class="flex justify-end"
            use:enhance
        >
            <button type="submit" class="inline-flex space-x-2 btn-primary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                </svg>
                <span class="pr-1">Logout</span>
            </button>
        </form>
    {/if}

    <Introduction />

    <Navigation />

    {#each data.posts as post}
        <PostPreview {post} />
    {/each}
</PageTransition>
