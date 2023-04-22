import type {Actions, PageServerLoad} from "./$types"
import {prismaClient} from "$lib/server/prisma"
import type {Post} from "@prisma/client"
import {redirect} from "@sveltejs/kit"
import {showdownConverter} from "$lib/showdown"
import {NotificationType} from "$lib/notification"

/** @type {import("./$types").PageServerLoad} */
export const load = (async ({locals, params}) => {

    const {session} = await locals.validateUser()

    let post: Post | null = await prismaClient.post
        .findFirst(session ?
            {where: {slug: params.slug, OR: [{published: true}, {published: false}]}} :
            {where: {slug: params.slug, OR: [{published: true}]}},
        )

    if (post === null) {
        throw redirect(302, "/blog")
    }

    post = await prismaClient.post.update({
        where: {slug: post.slug},
        data: {
            views: post.views + 1,
        },
    })
    post.content = showdownConverter.makeHtml(post.content)

    return {post: post, session: session}

}) satisfies PageServerLoad

export const actions: Actions = {
    publish: async ({request, locals}) => {

        const {session} = await locals.validateUser()

        if (!session) return {notification: {type: NotificationType.ERROR, message: "No permission to publish post"}}

        const url = request.url.replaceAll("?", "").split("/")
        const slug = url[url.length - 2]

        try {
            await prismaClient.post.update({
                where: {slug: slug},
                data: {
                    published: true,
                    publishedAt: new Date(),
                },
            })
            return {notification: {type: NotificationType.SUCCESS, message: "Post published successfully"}}

        } catch (e) {
            return {notification: {type: NotificationType.ERROR, message: "Something unexpected happened"}}
        }
    },
    unpublish: async ({request, locals}) => {

        const {session} = await locals.validateUser()

        if (!session) return {notification: {type: NotificationType.ERROR, message: "No permission to unpublish post"}}

        const url = request.url.replaceAll("?", "").split("/")
        const slug = url[url.length - 2]

        try {
            await prismaClient.post.update({
                where: {slug: slug},
                data: {
                    published: false,
                },
            })
            return {notification: {type: NotificationType.SUCCESS, message: "Post unpublished successfully"}}

        } catch (e) {
            return {notification: {type: NotificationType.ERROR, message: "Something unexpected happened"}}
        }
    },
    delete: async ({request, locals}) => {

        const {session} = await locals.validateUser()

        if (!session) return {notification: {type: NotificationType.ERROR, message: "No permission to delete post"}}

        const url = request.url.replaceAll("?", "").split("/")
        const slug = url[url.length - 2]

        try {
            await prismaClient.post.delete({where: {slug: slug}})
            return {notification: {type: NotificationType.SUCCESS, message: "Post deleted successfully"}}

        } catch (e) {
            return {notification: {type: NotificationType.ERROR, message: "Something unexpected happened"}}
        }
    },
}

