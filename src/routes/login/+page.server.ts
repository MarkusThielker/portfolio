import type { Actions, PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia"
import { NotificationType } from "$lib/notification"

export const load: PageServerLoad = async ({ locals, request }) => {
    const session = await locals.validate()
    if (session) throw redirect(302, "/")
}

export const actions: Actions = {
    default: async ({ request, locals }) => {

        const form = await request.formData()
        const username = form.get("username")
        const password = form.get("password")

        // check for empty values
        if (typeof username !== "string" || typeof password !== "string") {
            return { notification: { type: NotificationType.WARNING, message: "Please enter a username and password" } }
        }

        try {

            const key = await auth.useKey("username", username, password)
            const session = await auth.createSession(key.userId)
            locals.setSession(session)
            return { notification: { type: NotificationType.SUCCESS, message: "Logged in successfully" } }

        } catch {
            return { notification: { type: NotificationType.ERROR, message: "Something unexpected happened" } }
        }
    },
}
