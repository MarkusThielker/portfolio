import type {PageServerLoad} from "./$types"
import {prismaClient} from "$lib/prisma"
import type {Post} from "@prisma/client"
import {redirect} from "@sveltejs/kit"

/** @type {import("./$types").PageServerLoad} */
export const load = (async ({locals, params}) => {

    let post: Post | null = await prismaClient.post.findFirst({
        where: {slug: params.slug, published: true},
    })

    if (post === null) {
        return redirect(302, "/blog")
    }

    post = await prismaClient.post.update({
        where: {slug: post.slug},
        data: {
            views: post.views + 1,
        },
    })

    return {post: post}

}) satisfies PageServerLoad
