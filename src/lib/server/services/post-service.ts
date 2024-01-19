import type { Actions } from "@sveltejs/kit";
import { prismaClient } from "../prisma";
import type { Post } from "@prisma/client"
import { NotificationType } from "$lib/notification";
import type { Session } from "lucia";

export const postService = {
    async getPost(slug: string, session: Session|null): Promise<Post | null> {
        return await prismaClient.post
            .findFirst(session ?
                { where: { slug: slug, OR: [{ published: true }, { published: false }] } } :
                { where: { slug: slug, OR: [{ published: true }] } },
            )
    },
    async getAllPosts(session: Session|null): Promise<Post[] | null> {
        return await prismaClient.post.findMany(session ? undefined : { where: { published: true } })
    },
    async createPost(): Promise<boolean> {

        const slug = "new-post-" + new Date().getTime()

        try {
            await prismaClient.post.create({
                data: {
                    slug: slug,
                    title: "New Post",
                    teaser: "Write a teaser here...",
                    content: "Start your post here...",
                    published: false,
                },
            })
            return true
        } catch (e) {
            return false
        }
    },
    async updatePost(
        slug: string,
        newSlug: string,
        title: string,
        teaser: string,
        content: string
    ): Promise<boolean> {
        try {
            await prismaClient.post.update({
                where: { slug: slug },
                data: {
                    slug: title.toLowerCase().replaceAll(" ", "-"),
                    title: title,
                    teaser: teaser,
                    content: content,
                },
            })
            return true
        } catch (e) {
            return false
        }
    },
    async deletePost(slug: string): Promise<boolean> {
        try {
            await prismaClient.post.delete({
                where: { slug: slug },
            })
            return true
        } catch (e) {
            return false
        }
    },
    async increaseViewCount(slug: string): Promise<boolean> {
        try {
            await prismaClient.post.update({
                where: { slug: slug },
                data: {
                    views: {
                        increment: 1,
                    },
                },
            })
            return true;
        } catch (e) {
            return false
        }
    },
    async publishPost(slug: string): Promise<boolean> {
        try {
            await prismaClient.post.update({
                where: { slug: slug },
                data: {
                    published: true,
                    publishedAt: new Date(),
                },
            })
            return true;
        } catch (e) {
            return false
        }
    },
    async unpublishPost(slug: string): Promise<boolean> {
        try {
            await prismaClient.post.update({
                where: { slug: slug },
                data: {
                    published: false,
                    publishedAt: null,
                },
            })
            return true;
        } catch (e) {
            return false
        }
    },
    async pinPost(slug: string): Promise<boolean> {
        try {
            await prismaClient.post.update({
                where: { slug: slug },
                data: {
                    isPinned: true,
                },
            })
            return true;
        } catch (e) {
            return false
        }
    },
    async unpinPost(slug: string): Promise<boolean> {
        try {
            await prismaClient.post.update({
                where: { slug: slug },
                data: {
                    isPinned: false,
                },
            })
            return true;
        } catch (e) {
            return false
        }
    },
}

export const postActions: Actions = {
    create: async ({ locals }) => {

        const session = await locals.validate()
        if (!session) return { notification: { type: NotificationType.ERROR, message: "No permission to create draft" } }

        return await postService.createPost()
            .then((success) => {
                if (!success) {
                    return { notification: { type: NotificationType.ERROR, message: "Failed to create draft" } }
                } else {
                    return { notification: { type: NotificationType.SUCCESS, message: "Draft created" } }
                }
            })
    },
    publish: async ({ request, locals }) => {

        const session = await locals.validate()
        if (!session) return { notification: { type: NotificationType.ERROR, message: "No permission to publish post" } }

        const formData = await request.formData()

        return await postService.publishPost(formData.get("slug") as string)
            .then((success) => {
                if (!success) {
                    return { notification: { type: NotificationType.ERROR, message: "Failed to publish post" } }
                } else {
                    return { notification: { type: NotificationType.SUCCESS, message: "Post published" } }
                }
            })
    },
    unpublish: async ({ request, locals }) => {

        const session = await locals.validate()
        if (!session) return { notification: { type: NotificationType.ERROR, message: "No permission to unpublish post" } }

        const formData = await request.formData()

        return await postService.unpublishPost(formData.get("slug") as string)
            .then((success) => {
                if (!success) {
                    return { notification: { type: NotificationType.ERROR, message: "Failed to unpublish post" } }
                } else {
                    return { notification: { type: NotificationType.SUCCESS, message: "Post unpublished" } }
                }
            })
    },
    delete: async ({ request, locals }) => {

        const session = await locals.validate()
        if (!session) return { notification: { type: NotificationType.ERROR, message: "No permission to delete post" } }

        const formData = await request.formData()

        return await postService.deletePost(formData.get("slug") as string)
            .then((success) => {
                if (!success) {
                    return { notification: { type: NotificationType.ERROR, message: "Failed to delete post" } }
                } else {
                    return {
                        redirect: "/blog",
                        notification: { type: NotificationType.SUCCESS, message: "Post deleted" }
                    }
                }
            })
    },
    save: async ({ request, locals }) => {

        const session = await locals.validate()
        if (!session) return { notification: { type: NotificationType.ERROR, message: "No permission to edit post" } }

        const formData = await request.formData()

        return await postService.updatePost(
            formData.get("slug") as string,
            formData.get("title") as string,
            formData.get("title") as string,
            formData.get("teaser") as string,
            formData.get("content") as string,
        ).then((success) => {
            if (!success) {
                return { notification: { type: NotificationType.ERROR, message: "Failed to save changes" } }
            } else {
                return {
                    redirect: `/blog/${formData.get("slug") as string}`,
                    notification: { type: NotificationType.SUCCESS, message: "Changes saved" }
                }
            }
        })
    },
    pin: async ({ request, locals }) => {

        const session = await locals.validate()
        if (!session) return { notification: { type: NotificationType.ERROR, message: "No permission to pin post" } }

        const formData = await request.formData()

        return await postService.pinPost(formData.get("slug") as string)
            .then((success) => {
                if (!success) {
                    return { notification: { type: NotificationType.ERROR, message: "Failed to pin post" } }
                } else {
                    return { notification: { type: NotificationType.SUCCESS, message: "Post pinned" } }
                }
            })
    },
    unpin: async ({ request, locals }) => {

        const session = await locals.validate()
        if (!session) return { notification: { type: NotificationType.ERROR, message: "No permission to unpin post" } }

        const formData = await request.formData()

        return await postService.unpinPost(formData.get("slug") as string)
            .then((success) => {
                if (!success) {
                    return { notification: { type: NotificationType.ERROR, message: "Failed to unpin post" } }
                } else {
                    return { notification: { type: NotificationType.SUCCESS, message: "Post unpinned" } }
                }
            })
    },
}
