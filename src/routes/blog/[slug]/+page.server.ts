import type { Actions, PageServerLoad } from "./$types"
import type { Post } from "@prisma/client"
import { redirect } from "@sveltejs/kit"
import { showdownConverter } from "$lib/showdown"
import { postActions, postService } from "$lib/server/services/post-service"

export const load: PageServerLoad = (async ({ locals, params }) => {

    const session = await locals.validate()

    let post: Post | null = await postService.getPost(params.slug, session)

    if (post === null) {
        throw redirect(302, "/blog")
    }

    if (!session && post.published) {
        postService.increaseViewCount(post.slug)
    }
    const mdContent = showdownConverter.makeHtml(post.content)

    return { post: post, mdContent: mdContent, session: session }

}) satisfies PageServerLoad

export const actions: Actions = postActions
