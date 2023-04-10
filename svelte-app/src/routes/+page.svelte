<script lang="ts">

    import Introduction from "$lib/components/Introduction.svelte"
    import Navigation from "$lib/components/Navigation.svelte"
    import PostPreview from "$lib/components/PostPreview.svelte"
    import PageTransition from "$lib/components/PageTransition.svelte"

    /** @type {import("./$types").PageData} */
    export let data

</script>

<PageTransition>

    <Introduction/>

    <Navigation/>

    {#each data.posts as post}
        <PostPreview post={post}/>
    {/each}

</PageTransition>
