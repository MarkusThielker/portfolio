/** @type {import("tailwindcss").Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme("colors.white"),
                        h1: {
                            color: theme("colors.white"),
                        },
                        h2: {
                            color: theme("colors.neutral.100"),
                        },
                        h3: {
                            color: theme("colors.neutral.300"),
                        },
                        h4: {
                            color: theme("colors.neutral.500"),
                        },
                        p: {
                            color: theme("colors.white"),
                        },
                        a: {
                            color: theme("colors.white"),
                            "&:hover": {
                                color: theme("colors.neutral.100"),
                            },
                            background: theme("colors.orange.500"),
                            borderRadius: theme("borderRadius.lg"),
                            padding: theme("spacing.1"),
                            textDecoration: "none",
                        },
                        blockquote: {
                            color: theme("colors.white"),
                            borderColor: theme("colors.orange.500"),
                        },
                        figure: {
                            color: theme("colors.white"),
                        },
                        figcaption: {
                            color: theme("colors.white"),
                        },
                        strong: {
                            color: theme("colors.white"),
                        },
                        em: {
                            color: theme("colors.white"),
                        },
                        pre: {
                            background: theme("colors.neutral.800"),
                            borderRadius: theme("borderRadius.2xl"),
                        },
                        ol: {
                            color: theme("colors.white"),
                        },
                        ul: {
                            color: theme("colors.white"),
                        },
                        li: {
                            color: theme("colors.white"),
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
    ],
}
