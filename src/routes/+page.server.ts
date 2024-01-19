import type { Actions, PageServerLoad } from "./$types"
import { prismaClient } from "$lib/server/prisma"
import type { Post } from "@prisma/client"
import { auth } from "$lib/server/lucia"
import { NotificationType } from "$lib/notification"
import { postActions } from "$lib/server/services/post-service"

/** @type {import("./$types").PageServerLoad} */
export const load = (async ({ locals }) => {

    const session = await locals.validate()

    let posts: Post[] | null = await prismaClient.post.findMany(session ? undefined : { where: { published: true } })

    posts.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        return 0
    })

    return { posts: posts, session: session }

}) satisfies PageServerLoad

export const actions: Actions = {
    ...postActions,
    logout: async ({ locals }) => {

        const session = await locals.validate()
        if (session) {
            await auth.invalidateSession(session.sessionId)
            locals.setSession(null)
            return { notification: { type: NotificationType.SUCCESS, message: "Logged out successfully" } }
        }
        return { notification: { type: NotificationType.ERROR, message: "Something unexpected happened" } }
    },
}
