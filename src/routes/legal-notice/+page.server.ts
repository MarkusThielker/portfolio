import { env } from "$env/dynamic/private"

/** @type {import("./$types").PageServerLoad} */
export async function load() {
    return {
        legalNotice: {
            name: env.LEGAL_NOTICE_NAME,
            street: env.LEGAL_NOTICE_STREET,
            zipCity: env.LEGAL_NOTICE_ZIP_CITY,
            country: env.LEGAL_NOTICE_COUNTRY,
            phone: env.LEGAL_NOTICE_PHONE,
            email: env.LEGAL_NOTICE_EMAIL,
        },
    }
}
