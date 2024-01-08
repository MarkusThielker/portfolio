import { lucia } from "lucia"
import { sveltekit } from "lucia/middleware"
import { prisma } from "@lucia-auth/adapter-prisma"
import { building, dev } from "$app/environment"
import { env } from "$env/dynamic/private"
import { prismaClient } from "./prisma"

export const auth = lucia({
    adapter: prisma(prismaClient, {
        user: "user",
        key: "key",
        session: "session"
    }),
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    getUserAttributes: (userData) => {
        return {
            username: userData.username
        }
    },
})

export type Auth = typeof auth;

if (!building) {

    console.log("Checking for admin account")
    const adminUser = await prismaClient.user.findFirst({ where: { username: env.LUCIA_ADMIN_USERNAME } })
    if (!adminUser) {

        console.log("No admin user found")

        const username = env.LUCIA_ADMIN_USERNAME ?? ""
        const password = env.LUCIA_ADMIN_PASSWORD ?? ""

        // check for empty values
        if (username.length > 0 && password.length > 0) {

            console.log("Creating admin user with credentials from .env file")

            try {

                await auth.createUser({
                    key: {
                        providerId: "username",
                        providerUserId: username,
                        password,
                    },
                    attributes: {
                        username: username,
                    },
                })

                console.log("Admin user created")

            } catch {
                console.log("Admin user could not be created")
            }

        } else {
            console.log("No admin credentials set in .env file! Skipping admin user creation")
        }

    } else {
        console.log("Admin user already exists")
    }
}

