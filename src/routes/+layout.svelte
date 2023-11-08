<script lang="ts">
    import { fade } from "svelte/transition";
    import "$lib/styles/app.css";
    import { page } from "$app/stores";
    import Navigation from "$lib/components/Navigation.svelte";
    import { notifications } from "$lib/notification";
    import { version } from "$app/environment";

    let scrollY = 0;

    $: showNavigation = scrollY > 500 || $page.url.pathname !== "/";
</script>

<div
    class="h-full min-h-screen w-full text-black dark:text-white bg-neutral-50 dark:bg-neutral-900"
>
    {#if showNavigation}
        <div
            class="fixed top-6 z-10 w-full grid grid-cols-[1fr,min(640px,100%),1fr] px-4"
        >
            <div
                class="col-start-2"
                in:fade={{
                    duration: 70,
                    delay: $page.url.pathname !== "/" ? 90 : 0,
                }}
                out:fade={{ duration: 70 }}
            >
                <Navigation isMinimized={false} />
            </div>
        </div>
    {/if}

    <div
        class="fixed z-20 flex flex-col-reverse items-bottom justify-end bottom-6 left-6"
    >
        {#each $notifications as notification}
            <div
                class="flex flex-row alert {notification.getStyle()}"
                in:fade={{ duration: 100 }}
                out:fade={{ duration: 100 }}
            >
                <p class="font-bold mr-1">{notification.type}</p>
                {notification.message}
            </div>
        {/each}
    </div>

    <div
        class="relative min-h-screen grid grid-cols-[1fr,min(640px,100%),1fr] gap-y-8 px-4 pt-36 font-sans xl:grid-cols-[1fr,minmax(auto,240px),min(640px,100%),minmax(auto,240px),1fr] xl:gap-x-9 xl:px-0 [&>*]:col-start-2 xl:[&>*]:col-start-3"
    >
        <slot />
    </div>

    <!-- footer -->
    <div class="mt-16 h-16 grid grid-cols-[1fr,min(640px,100%),1fr]">
        <div
            class="flex flex-col col-start-2"
            in:fade={{ duration: 70, delay: 90 }}
            out:fade={{ duration: 70 }}
        >
            <hr class="pb-4 w-full" />
            <div class="flex flex-row px-4">
                <div class="flex w-full justify-start space-x-6">
                    2023 &copy; Markus Thielker
                </div>
                <div class="flex w-full justify-end space-x-8">
                    <a
                        href="https://github.com/MarkusThielker/portfolio/releases"
                        >Version {version}</a
                    >
                    <a href="/legal-notice">Legal Notice</a>
                </div>
            </div>
        </div>
    </div>
</div>

<svelte:window bind:scrollY />
