import type {PageServerLoad} from "./$types"
import {prismaClient} from "$lib/server/prisma"
import type {Post} from "@prisma/client"

/** @type {import("./$types").PageServerLoad} */
export const load = (async ({locals}) => {

    const {session} = await locals.validateUser()

    let posts: Post[] | null = await prismaClient.post.findMany(session ? undefined : {where: {published: true}})

    return {posts: posts}

}) satisfies PageServerLoad
