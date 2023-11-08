<script lang="ts">
    const name = "Markus";
    const position = "Software Engineer at";
    const description =
        "Hey there and welcome to my developer portfolio where I plan to share " +
        "blog posts about things I learned and projects I worked on. While I am still working on " +
        "the site, you can already check out my GitHub or my LinkedIn profile.";
</script>

<div class="flex flex-col space-y-8">
    <div class="flex flex-row space-x-6">
        <div
            class="inline-flex items-center justify-center rounded-full border-4 border-orange-500/20"
        >
            <img
                alt="Portrait of Markus, a young man with short brown hair, black glasses and wearing a
                  hoodie, while sitting in a park "
                class="w-24 z-10 object-cover aspect-square rounded-full border-4 border-orange-500/80"
                src="/profile-image.jpg"
            />
            <span
                class="animate-ping absolute h-14 w-14 z-0 rounded-full bg-orange-400 opacity-50"
            />
        </div>

        <div class="flex flex-col h-full justify-center">
            <h2>{name}</h2>
            <h4 class="inline-flex text-gray-700 dark:text-gray-300">
                {position}
                <img
                    alt="Plain company logo of mercatis GmbH, a software company based in Ulm, Germany"
                    class="ml-3 h-6"
                    src="/mercatis.png"
                />
            </h4>
        </div>
    </div>

    <h5 class="text-gray-800 dark:text-gray-200">{description}</h5>
</div>
