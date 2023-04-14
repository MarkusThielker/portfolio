import type {PageServerLoad} from "./$types"
import {prismaClient} from "$lib/server/prisma"
import type {Post} from "@prisma/client"

/** @type {import("./$types").PageServerLoad} */
export const load = (async () => {

    let posts: Post[] = await prismaClient.post.findMany({where: {published: true}})
    return {posts: posts}

}) satisfies PageServerLoad
