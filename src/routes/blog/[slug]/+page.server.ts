import type { Actions, PageServerLoad } from "./$types"
import { prismaClient } from "$lib/server/prisma"
import type { Post } from "@prisma/client"
import { redirect } from "@sveltejs/kit"
import { showdownConverter } from "$lib/showdown"
import { NotificationType } from "$lib/notification"

/** @type {import("./$types").PageServerLoad} */
export const load = (async ({ locals, params }) => {

    const { session } = await locals.validateUser()

    let post: Post | null = await prismaClient.post
        .findFirst(session ?
            { where: { slug: params.slug, OR: [{ published: true }, { published: false }] } } :
            { where: { slug: params.slug, OR: [{ published: true }] } },
        )

    if (post === null) {
        throw redirect(302, "/blog")
    }

    if (!session && !post.published) {
        post = await prismaClient.post.update({
            where: { slug: post.slug },
            data: {
                views: post.views + 1,
            },
        })
    }
    const mdContent = showdownConverter.makeHtml(post.content)

    return { post: post, mdContent: mdContent, session: session }

}) satisfies PageServerLoad

export const actions: Actions = {
    publish: async ({ request, locals }) => {

        const { session } = await locals.validateUser()

        if (!session) return { notification: { type: NotificationType.ERROR, message: "No permission to publish post" } }

        const url = request.url.replaceAll("?", "").split("/")
        const slug = url[url.length - 2]

        try {
            await prismaClient.post.update({
                where: { slug: slug },
                data: {
                    published: true,
                    publishedAt: new Date(),
                },
            })
            return { notification: { type: NotificationType.SUCCESS, message: "Post published successfully" } }

        } catch (e) {
            return { notification: { type: NotificationType.ERROR, message: "Something unexpected happened" } }
        }
    },
    unpublish: async ({ request, locals }) => {

        const { session } = await locals.validateUser()

        if (!session) return { notification: { type: NotificationType.ERROR, message: "No permission to unpublish post" } }

        const url = request.url.replaceAll("?", "").split("/")
        const slug = url[url.length - 2]

        try {
            await prismaClient.post.update({
                where: { slug: slug },
                data: {
                    published: false,
                },
            })
            return { notification: { type: NotificationType.SUCCESS, message: "Post unpublished successfully" } }

        } catch (e) {
            return { notification: { type: NotificationType.ERROR, message: "Something unexpected happened" } }
        }
    },
    delete: async ({ request, locals }) => {

        const { session } = await locals.validateUser()

        if (!session) return { notification: { type: NotificationType.ERROR, message: "No permission to delete post" } }

        const url = request.url.replaceAll("?", "").split("/")
        const slug = url[url.length - 2]

        try {
            await prismaClient.post.delete({ where: { slug: slug } })
            return { notification: { type: NotificationType.SUCCESS, message: "Post deleted successfully" } }

        } catch (e) {
            return { notification: { type: NotificationType.ERROR, message: "Something unexpected happened" } }
        }
    },
    save: async ({ request, locals }) => {

        // console.log(await request.formData())

        const { session } = await locals.validateUser()

        if (!session) return { notification: { type: NotificationType.ERROR, message: "No permission to edit post" } }

        const url = request.url.replaceAll("?", "").split("/")
        const slug = url[url.length - 2]

        const formData = await request.formData()

        try {
            await prismaClient.post.update({
                where: { slug: slug },
                data: {
                    slug: formData.get("slug") as string,
                    title: formData.get("title") as string,
                    teaser: formData.get("teaser") as string,
                    content: formData.get("content") as string,
                },
            })
            return {
                redirect: `/blog/${formData.get("slug") as string}`,
                notification: { type: NotificationType.SUCCESS, message: "Changes saved successfully" },
            }

        } catch (e) {
            return { notification: { type: NotificationType.ERROR, message: "Something unexpected happened" } }
        }
    },
    pin: async ({ request, locals }) => {

        const { session } = await locals.validateUser()

        if (!session) return { notification: { type: NotificationType.ERROR, message: "No permission to pin post" } }

        const url = request.url.replaceAll("?", "").split("/")
        const slug = url[url.length - 2]

        try {
            await prismaClient.post.update({
                where: { slug: slug },
                data: {
                    isPinned: true,
                },
            })
            return { notification: { type: NotificationType.SUCCESS, message: "Post pinned successfully" } }

        } catch (e) {
            return { notification: { type: NotificationType.ERROR, message: "Something unexpected happened" } }
        }
    },
    unpin: async ({ request, locals }) => {

        const { session } = await locals.validateUser()

        if (!session) return { notification: { type: NotificationType.ERROR, message: "No permission to unpin post" } }

        const url = request.url.replaceAll("?", "").split("/")
        const slug = url[url.length - 2]

        try {
            await prismaClient.post.update({
                where: { slug: slug },
                data: {
                    isPinned: false,
                },
            })
            return { notification: { type: NotificationType.SUCCESS, message: "Post unpinned successfully" } }

        } catch (e) {
            return { notification: { type: NotificationType.ERROR, message: "Something unexpected happened" } }
        }
    },
}

