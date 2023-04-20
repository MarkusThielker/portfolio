import type {Actions, PageServerLoad} from "./$types"
import {prismaClient} from "$lib/server/prisma"
import type {Post} from "@prisma/client"
import {auth} from "$lib/server/lucia"
import {NotificationType} from "$lib/notification"

/** @type {import("./$types").PageServerLoad} */
export const load = (async ({locals}) => {

    const {session} = await locals.validateUser()

    const {user} = await locals.validateUser()
    let posts: Post[] | null
    if (session) {
        posts = await prismaClient.post.findMany()
    } else {
        posts = await prismaClient.post.findMany({
            where: {published: true},
        })
    }
    return {posts: posts, user: user}

}) satisfies PageServerLoad

export const actions: Actions = {
    logout: async ({request, locals}) => {

        const {session} = await locals.validateUser()
        if (session) {
            await auth.invalidateSession(session.sessionId)
            return {notification: {type: NotificationType.SUCCESS, message: "Logged out successfully"}}
        }
        return {notification: {type: NotificationType.ERROR, message: "Something unexpected happened"}}
    },
}
