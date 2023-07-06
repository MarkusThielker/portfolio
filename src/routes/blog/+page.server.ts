import type {Actions, PageServerLoad} from "./$types"
import {prismaClient} from "$lib/server/prisma"
import type {Post} from "@prisma/client"
import {NotificationType} from "$lib/notification"

/** @type {import("./$types").PageServerLoad} */
export const load = (async ({locals}) => {

    const {session} = await locals.validateUser()

    let posts: Post[] | null = await prismaClient.post.findMany(session ? undefined : {where: {published: true}})

    return {posts: posts, session: session}

}) satisfies PageServerLoad

export const actions: Actions = {
    create: async ({request, locals}) => {

        const {session} = await locals.validateUser()

        if (!session) return {notification: {type: NotificationType.ERROR, message: "No permission to create draft"}}

        const slug = "new-post-" + new Date().getTime()
        try {
            await prismaClient.post.create({
                data: {
                    slug: slug,
                    title: "New Post",
                    content: "Start your post here...",
                    published: false,
                },
            })
            return {notification: {type: NotificationType.SUCCESS, message: "Draft created successfully"}}

        } catch (e) {
            return {notification: {type: NotificationType.ERROR, message: "Something unexpected happened"}}
        }
    },
}