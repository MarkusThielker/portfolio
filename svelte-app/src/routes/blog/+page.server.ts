import type {PageServerLoad} from "./$types"
import {prismaClient} from "$lib/server/prisma"
import type {Post} from "@prisma/client"

/** @type {import("./$types").PageServerLoad} */
export const load = (async ({locals}) => {

    const {session} = await locals.validateUser()

    let posts: Post[] | null
    if (session) {
        posts = await prismaClient.post.findMany()
    } else {
        posts = await prismaClient.post.findMany({
            where: {published: true},
        })
    }
    return {posts: posts}

}) satisfies PageServerLoad
