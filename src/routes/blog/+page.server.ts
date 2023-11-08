import type { Actions, PageServerLoad } from "./$types"
import type { Post } from "@prisma/client"
import { postActions, postService } from "$lib/server/services/post-service"

export const load: PageServerLoad = (async ({ locals }) => {

    const { session } = await locals.validateUser()

    let posts: Post[] | null = await postService.getAllPosts(session)
    if (!posts) posts = []

    posts.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        return 0
    })

    return { posts: posts, session: session }

}) satisfies PageServerLoad

export const actions: Actions = postActions