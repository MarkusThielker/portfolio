import type {PageServerLoad} from "./$types"
import {auth} from "$lib/server/lucia"
import {redirect} from "@sveltejs/kit"

export const load: PageServerLoad = async ({locals, request}) => {
    const session = await locals.validate()
    if (session) {
        await auth.invalidateSession(session.sessionId)
    }
    throw redirect(302, "/")
}
